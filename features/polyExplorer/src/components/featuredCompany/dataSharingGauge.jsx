import React from "react";

import i18n from "../../i18n.js";

import "./dataSharingGauge.css";

const DataSharingGauge = ({ sharingType, count, max, average }) => {
    const countPercentage = (count / max) * 100;
    const averagePercentage = (average / max) * 100;
    return (
        <div className="data-sharing-gauge" data-sharing-type={sharingType}>
            <div className="data-sharing-gauge-outline"></div>
            <div
                className={
                    "data-sharing-gauge-fill" +
                    (countPercentage <= 98 ? " partial" : "")
                }
                style={{ width: `${countPercentage}%` }}
            ></div>
            <div
                className={
                    "data-sharing-gauge-average-marker " +
                    (averagePercentage > countPercentage ? "light" : "dark")
                }
                style={{ width: `${averagePercentage}%` }}
            >
                <div className="data-sharing-gauge-average-label">
                    {i18n.t("featuredCompany:label.gauge.average", {
                        value: average,
                    })}
                </div>
            </div>
            <div className="data-sharing-gauge-max-label">
                {i18n.t("featuredCompany:label.gauge.total", { value: max })}
            </div>
        </div>
    );
};

export default DataSharingGauge;
