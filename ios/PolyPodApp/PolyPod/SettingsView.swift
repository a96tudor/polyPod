//
//  SettingsView.swift
//  PolyPod
//
//  Created by Felix Dahlke on 21.04.21.
//  Copyright © 2021 polypoly. All rights reserved.
//

import SwiftUI

struct SettingsView: View {
    var closeAction: () -> Void = {}

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            ZStack {
                Button(action: closeAction) {
                    Image("NavIconBackDark")
                }.frame(maxWidth: .infinity, alignment: .leading)

                Text("Settings")
                    .foregroundColor(Color.PolyPod.darkForeground)
                    .font(.custom("Jost-Medium", size: 16))
                    .kerning(-0.16)
                    .frame(maxWidth: .infinity, alignment: .center)
            }
            .padding(.horizontal, 8)
            .frame(maxHeight: 42, alignment: .center)
            .background(Color.PolyPod.lightBackground)

            Divider()

            List() {
                Section(header: SettingsHeader("settings_about_section")) {
                    SettingsButton(label: "settings_version", action: {})
                }
                .listRowInsets(EdgeInsets(top: 0, leading: 0, bottom: 0, trailing: 0))

                Section(header: SettingsHeader("settings_legal_section")) {
                    SettingsButton(label: "settings_imprint_title", action: {})
                    SettingsButton(label: "settings_privacy_policy_title", action: {})
                    SettingsButton(label: "settings_terms_of_use_title", action: {})
                }
                .listRowInsets(EdgeInsets(top: 0, leading: 0, bottom: 0, trailing: 0))
            }
        }
    }
}

struct SettingsView_Previews: PreviewProvider {
    static var previews: some View {
        SettingsView()
    }
}

private struct SettingsHeader: View {
    private let text: LocalizedStringKey

    init(_ text: LocalizedStringKey) {
        self.text = text
    }

    var body: some View {
        Text(text)
            .foregroundColor(Color(red: 0.243, green: 0.286, blue: 0.357))
            .font(.custom("Jost-Medium", size: 12))
            .kerning(-0.12)
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
            .padding(.leading, 32)
            .background(Color.PolyPod.semiLightBackground)
    }
}

private struct SettingsButton: View {
    let label: LocalizedStringKey
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(label)
                .foregroundColor(Color.PolyPod.darkForeground)
                .font(.custom("Jost-Regular", size: 18))
                .kerning(-0.18)
        }.padding(.leading, 32)
    }
}
