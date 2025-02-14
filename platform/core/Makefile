.DEFAULT_GOAL := all

build_type := $(if $(filter $(MODE), release),release,debug)
cargo_build_flag := $(if $(filter $(build_type), release), --release)
target := target/$(build_type)

# Flatbuffers
flatbuffers_version := v2.0.0
flatbuffers_repo := https://github.com/google/flatbuffers
flatbuffers_releases := $(flatbuffers_repo)/releases/download/$(flatbuffers_version)
flatbuffers := flatbuffers_shared/flatbuffers_$(flatbuffers_version)
flatc_dir := flatbuffers_shared/flatc_$(flatbuffers_version)
flatc := $(flatc_dir)/flatc
flatc_archive := $(flatc_dir)/flatc.zip
flatbuffer_models_dir := flatbuffers_shared/flatbuffer_models
flatbuffer_models := $(shell find $(flatbuffer_models_dir) -name '*.fbs')

# Rust
rust_flatbuffers_dir := src/flatbuffers_generated
rust_flatbuffer_models := $(patsubst $(flatbuffer_models_dir)/%, $(rust_flatbuffers_dir)/%, $(flatbuffer_models:.fbs=.rs))
rust_flatbuffers_generated_lib := $(rust_flatbuffers_dir)/mod.rs

# iOS export
export_dir_ios := export/ios
swift_core := PolyPodCoreSwift
swift_core_framework := $(swift_core)/PolyPodCore.xcframework
ios_archs := aarch64-apple-ios aarch64-apple-ios-sim x86_64-apple-ios
ios_targets := iPhone simulator
swift_flatbuffers_dir := PolyPodCoreSwift/Sources/PolyPodCoreSwift/FlatbuffersGenerated
swift_flatbuffer_models := $(patsubst $(flatbuffer_models_dir)/%, $(swift_flatbuffers_dir)/%, $(flatbuffer_models:.fbs=.swift))

# Android export
tools_dir := tools
android_core := PolyPodCoreAndroid/core/src/main/
android_version := 24
# Rust still uses old-ish r22 version of NDK.
# For reference https://github.com/rust-lang/rust/pull/85806
ndk_version := r22b
google_repo := https://dl.google.com/android/repository
ndk_lib := android-ndk-$(ndk_version)
ndk=$(tools_dir)/NDK_$(ndk_version)
ndk_archive = $(tools_dir)/NDK.zip
export NDK_HOME=$(ndk)/$(ndk_lib)
java_flatbuffers_package := com/google/flatbuffers
java_flatbuffers_lib_source := $(flatbuffers)/java/$(java_flatbuffers_package)
android_flatbuffers_lib := $(android_core)/java/$(java_flatbuffers_package)
kotlin_flatbuffer_models_dir := $(android_core)/java/coop/polypoly/core/FlatbuffersGenerated
kotlin_flatbuffer_models := $(patsubst $(flatbuffer_models_dir)/%, $(kotlin_flatbuffer_models_dir)/%, $(flatbuffer_models:.fbs=.kt))
android_triples := aarch64-linux-android armv7-linux-androideabi x86_64-linux-android i686-linux-android
android_binaries := $(patsubst %, target/%, $(android_triples))
android_architectures := arm64-v8a armeabi-v7a x86_64 x86
jni_libs_copy_path := $(android_core)/jniLibs
android_core_libraries := $(patsubst %, $(jni_libs_copy_path)/%, $(android_architectures))

ifeq ($(OS),Windows_NT)
	flatc_download_url = $(flatbuffers_releases)/Windows.flatc.binary.zip
	flatc := $(flatc_dir)/flatc.exe
	ndk_download_url = $(google_repo)/$(ndk_lib)-windows-x86_64.zip
	# Need on Windows, to allow interpreting escaping characters
	os_echo := echo -e
else
	flatc := $(flatc_dir)/flatc
	os_echo := echo
	ifeq ($(shell uname -s),Darwin)
		flatc_download_url = $(flatbuffers_releases)/Mac.flatc.binary.zip
		ndk_download_url = $(google_repo)/$(ndk_lib)-darwin-x86_64.zip
		macos := true
	endif
	ifeq ($(shell uname -s),Linux)
		flatc_download_url = $(flatbuffers_releases)/Linux.flatc.binary.clang++-9.zip
		ndk_download_url = $(google_repo)/$(ndk_lib)-linux-x86_64.zip
	endif
endif

# ============ Flatbuffers ============ #

$(flatbuffers):
	git clone --branch $(flatbuffers_version) $(flatbuffers_repo) $(flatbuffers)

$(flatc):
	mkdir -p $(flatc_dir)
	curl -L $(flatc_download_url) -o $(flatc_archive)
	unzip -d $(flatc_dir) $(flatc_archive)
	rm $(flatc_archive)
	chmod +x $(flatc)

# ============  Rust core ============ #

$(rust_flatbuffers_dir)/%.rs: $(flatbuffer_models_dir)/%.fbs
	./$(flatc) --rust -o $(rust_flatbuffers_dir) --filename-suffix "" --include-prefix flatbuffers_generated $^

$(rust_flatbuffers_generated_lib): $(rust_flatbuffer_models)
	@$(os_echo) $(foreach model, $^, \
		"pub mod $(basename $(notdir $(model))); \n") > $(rust_flatbuffers_generated_lib)

$(target): $(flatc) $(flatbuffers) $(rust_flatbuffers_generated_lib)
# Check rustup is installed
ifeq (,$(shell which rustup))
	$(error "Rust not installed, check https://www.rust-lang.org/tools/install to install rust on your system")
endif
	cargo build $(cargo_build_flag)

# ============  Swift framework ============ #

$(swift_flatbuffers_dir)/%.swift: $(flatbuffer_models_dir)/%.fbs
	./$(flatc) --swift -o $(swift_flatbuffers_dir) --filename-suffix "" $^

$(swift_core_framework): $(target) $(swift_flatbuffer_models)
# Ensure correct OS is used
ifeq ($(macos),)
	@$(os_echo) "xcframework can only be built on macOS"
	exit 1
endif

	# Workspace setup
	rm -rf $(export_dir_ios)
	mkdir -p $(export_dir_ios)/iPhone
	mkdir -p $(export_dir_ios)/simulator

	# Build library for all architectures
	$(foreach arch, $(ios_archs),  $(call build_for_architecture,$(arch));)

	# Copy libaries to export
	cp target/aarch64-apple-ios/$(build_type)/libpolypod_core.a $(export_dir_ios)/iPhone/libpolypod_core.a
	lipo -create \
		target/x86_64-apple-ios/$(build_type)/libpolypod_core.a \
		target/aarch64-apple-ios-sim/$(build_type)/libpolypod_core.a \
		-output $(export_dir_ios)/simulator/libpolypod_core.a

	# Generated module map and C header
	cargo install cbindgen
	cbindgen --config cbindgen.toml -o $(export_dir_ios)/headers/polypod-core.h
	@$(os_echo) "module PolyPodCore { header \"polypod-core.h\" export * }" >> $(export_dir_ios)/headers/module.modulemap

	# Package xcframework
	rm -rf $(swift_core_framework)
	xcodebuild -create-xcframework \
	    $(foreach target, $(ios_targets), \
			-library $(export_dir_ios)/$(target)/libpolypod_core.a \
			-headers $(export_dir_ios)/headers) \
		-output $(swift_core_framework)

define build_for_architecture
	rustup target add $(1)
	cargo build \
		$(cargo_build_flag) \
		--lib --target $(1)
endef

# ============ Android lib ============ #

$(ndk):
	mkdir -p $(ndk)
	curl -L $(ndk_download_url) -o $(ndk_archive)
	unzip -q -d $(ndk) $(ndk_archive)
	rm $(ndk_archive)

$(android_flatbuffers_lib): $(flatbuffers)
	mkdir -p $(android_flatbuffers_lib)
	cp -a $(java_flatbuffers_lib_source)/. $(android_flatbuffers_lib)

$(kotlin_flatbuffer_models_dir)/%.kt: $(flatbuffer_models_dir)/%.fbs
	./$(flatc) --kotlin -o $(kotlin_flatbuffer_models_dir) --filename-suffix "" $^

$(android_binaries): $(target) $(ndk) $(kotlin_flatbuffer_models) $(android_flatbuffers_lib)
	cargo install cargo-ndk
	rustup target add $(android_triples)

	$(foreach triple, $(android_triples), \
		cargo ndk --platform $(android_version) --target $(triple) build $(cargo_build_flag); \
	)

$(android_core_libraries): $(android_binaries)
	$(call pairmap, copy_android_arch, $(android_triples), $(android_architectures))

define copy_android_arch
   mkdir -p $(jni_libs_copy_path)/$2
   cp target/$1/$(build_type)/libpolypod_core.so \
	  $(jni_libs_copy_path)/$2/libpolypod_core.so;
endef

# ============ Main targets ============ #

.PHONY: rust_core
rust_core: $(target)

.PHONY: android_bindings
android_bindings: $(android_core_libraries)

.PHONY: ios_bindings
ios_bindings: $(swift_core_framework)

.PHONY: all
all: $(android_core_libraries) $(if $(macos),$(swift_core_framework),$(target))

.PHONY: clean
clean:
	$(RM) -r flatbuffers_shared/flat{c_$(flatbuffers_version),buffers_$(flatbuffers_version)}
	$(RM) -r src/flatbuffers_generated
	$(RM) -r target
	$(RM) -r export
	$(RM) -r $(swift_core_framework)
	$(RM) -r $(swift_core)/{.swiftpm,FlatbuffersGenerated}
	$(RM) -r $(android_flatbuffers_lib)
	$(RM) -r $(android_core_libraries)
	$(RM) -r $(kotlin_flatbuffer_models_dir)

# ============  Utils ============ #

# A way to zip two lists, ref: https://riptutorial.com/makefile/example/23643/zipping-lists
list-rem = $(wordlist 2,$(words $1),$1)
pairmap = $(and $(strip $2),$(strip $3),$(call \
    $1,$(firstword $2),$(firstword $3)) $(call \
    pairmap,$1,$(call list-rem,$2),$(call list-rem,$3)))
