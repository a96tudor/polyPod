//
//  FeatureListView.swift
//  PolyPod
//
//  Created by Felix Dahlke on 13.04.21.
//

import SwiftUI

struct FeatureListView: View {
    var features: [Feature]
    var openFeatureAction: (Feature) -> Void = { _ in }
    var openInfoAction: () -> Void = {}
    var openSettingsAction: () -> Void = {}

    var body: some View {
        VStack(spacing: 0) {
            HStack {
                Button(action: openInfoAction) {
                    Image("NavIconInfoDark")
                }

                Spacer()

                Image("NavIconPolyPodLogo")

                Spacer()

                Button(action: openSettingsAction) {
                    Image("NavIconSettingsDark")
                }
            }
            .padding(.horizontal, 8)
            .frame(maxWidth: .infinity, maxHeight: 42, alignment: .center)
            .background(Color.PolyPod.lightBackground)

            Divider()

            List() {
                Section(header: Text("Features:")) {
                    ForEach(features, id: \.name) { feature in
                        Button(feature.name) {
                            openFeatureAction(feature)
                        }
                    }
                }
            }
        }
    }
}

struct FeatureListView_Previews: PreviewProvider {
    static var previews: some View {
        FeatureListView(features: [
            createStubFeature(name: "Feature one"),
            createStubFeature(name: "Feature two")
        ])
    }
}
