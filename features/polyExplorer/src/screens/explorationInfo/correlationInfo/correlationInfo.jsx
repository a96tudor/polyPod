import React from "react";

import Screen from "../../../components/screen/screen.jsx";

const CorrelationInfo = ({ onClose }) => {
    return (
        <Screen className="correlation-info" light={true}>
            <button onClick={() => onClose()}>back</button>
        </Screen>
    );
};

export default CorrelationInfo;
