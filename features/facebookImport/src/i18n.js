import { determineLanguage, I18n } from "@polypoly-eu/silly-i18n";

import commonEn from "./locales/en/common.json";
import importEn from "./locales/en/import.json";
import overviewEn from "./locales/en/overview.json";
import dataStructureMiniStoryEn from "./locales/en/miniStories/dataStructure.json";
import exploreEn from "./locales/en/explore.json";
import activitiesMiniStoryEn from "./locales/en/miniStories/activities.json";
import messagesMiniStoryEn from "./locales/en/miniStories/messages.json";
import offFacebookEventsMiniStoryEn from "./locales/en/miniStories/offFacebookEvents.json";
import advertisingValueMiniStoryEn from "./locales/en/miniStories/advertisingValue.json";
import reportEn from "./locales/en/report.json";
import errorPopupEn from "./locales/en/errorPopup.json";
import activitiesInfoScreenEn from "./locales/en/infoScreens/activitiesInfoScreen.json";
import dataStructureInfoScreenEn from "./locales/en/infoScreens/dataStructureInfoScreen.json";
import messagesInfoScreenEn from "./locales/en/infoScreens/messagesInfoScreen.json";

import commonDe from "./locales/de/common.json";
import importDe from "./locales/de/import.json";
import overviewDe from "./locales/de/overview.json";
import dataStructureMiniStoryDe from "./locales/de/miniStories/dataStructure.json";
import exploreDe from "./locales/de/explore.json";
import activitiesMiniStoryDe from "./locales/de/miniStories/activities.json";
import messagesMiniStoryDe from "./locales/de/miniStories/messages.json";
import offFacebookEventsMiniStoryDe from "./locales/de/miniStories/offFacebookEvents.json";
import advertisingValueMiniStoryDe from "./locales/de/miniStories/advertisingValue.json";
import reportDe from "./locales/de/report.json";
import errorPopupDe from "./locales/de/errorPopup.json";
import activitiesInfoScreenDe from "./locales/de/infoScreens/activitiesInfoScreen.json";
import dataStructureInfoScreenDe from "./locales/de/infoScreens/dataStructureInfoScreen.json";
import messagesInfoScreenDe from "./locales/de/infoScreens/messagesInfoScreen.json";

export default new I18n(determineLanguage(), {
    en: {
        common: commonEn,
        import: importEn,
        overview: overviewEn,
        dataStructureMiniStory: dataStructureMiniStoryEn,
        explore: exploreEn,
        activitiesMiniStory: activitiesMiniStoryEn,
        messagesMiniStory: messagesMiniStoryEn,
        offFacebookEventsMiniStory: offFacebookEventsMiniStoryEn,
        advertisingValueMiniStory: advertisingValueMiniStoryEn,
        report: reportEn,
        errorPopup: errorPopupEn,
        activitiesInfoScreen: activitiesInfoScreenEn,
        dataStructureInfoScreen: dataStructureInfoScreenEn,
        messagesInfoScreen: messagesInfoScreenEn,
    },
    de: {
        common: commonDe,
        import: importDe,
        overview: overviewDe,
        dataStructureMiniStory: dataStructureMiniStoryDe,
        explore: exploreDe,
        activitiesMiniStory: activitiesMiniStoryDe,
        messagesMiniStory: messagesMiniStoryDe,
        offFacebookEventsMiniStory: offFacebookEventsMiniStoryDe,
        advertisingValueMiniStory: advertisingValueMiniStoryDe,
        report: reportDe,
        errorPopup: errorPopupDe,
        activitiesInfoScreen: activitiesInfoScreenDe,
        dataStructureInfoScreen: dataStructureInfoScreenDe,
        messagesInfoScreen: messagesInfoScreenDe,
    },
});
