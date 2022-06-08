import React from "react";

import i18n from "!silly-i18n";
import { SingleDataStory } from "./singleDataStory.jsx";
import analysisKeys from "../../model/analyses/analysisKeys.js";
import {
    MessagesOverTimeStorySummary,
    MessagesOverTimeStoryDetails,
} from "../../components/messagesOverTimeStory/messagesOverTimeStory.jsx";

class MessagesOverTimeMinistory extends SingleDataStory {
    constructor(props) {
        super(props, analysisKeys.messagesOverTime);
    }

    get title() {
        return i18n.t("activitiesOverTime:title");
    }

    _renderSummary() {
        return (
            <MessagesOverTimeStorySummary
                messagesOverTime={this.analysisData}
            />
        )
    }

    _renderDetails() {
        return (
            <MessagesOverTimeStoryDetails
                messagesOverTime={this.analysisData}
            />
        );
    }
}

export default MessagesOverTimeMinistory;
