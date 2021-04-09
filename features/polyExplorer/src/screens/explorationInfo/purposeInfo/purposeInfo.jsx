import React from "react";

import i18n from "../../../i18n.js";
import ExplorationInfoScreen from "../../../components/explorationInfoScreen/explorationInfoScreen.jsx";
import Infographic from "../../../components/infographic/infographic.jsx";

const PurposeInfo = ({ onClose }) => {
    return (
        <ExplorationInfoScreen
            className="purpose-info"
            headline={i18n.t("explorationPurposeInfoScreen:headline")}
            onClose={onClose}
        >
            <p>{i18n.t("explorationPurposeInfoScreen:text.1")}</p>
            <Infographic
                type="purpose"
                texts={{
                    bold1: i18n.t("infographic:purpose.bold1"),
                    bold2: i18n.t("infographic:purpose.bold2"),
                    text1: i18n.t("infographic:category.text1"),
                    text2: i18n.t("infographic:category.text2"),
                }}
            />
            <div
                dangerouslySetInnerHTML={{
                    __html: i18n.t("explorationPurposeInfoScreen:text.2"),
                }}
            />
        </ExplorationInfoScreen>
    );
};

export default PurposeInfo;
