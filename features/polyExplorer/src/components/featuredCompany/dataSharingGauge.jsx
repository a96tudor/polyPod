import React from "react";
import "./dataSharingGauge.css";

const DataSharingGauge = ({
    sharingType,
    count,
    max,
    average,
    showLegend = false,
}) => {
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
                    {average}
                </div>
            </div>
            <div className="data-sharing-gauge-max-label">{max}</div>
            {showLegend && (
                <div className="data-sharing-gauge-legend">
                    <span>
                        <img src="images/question-circle.svg"></img>
                        Amount of entries:
                    </span>
                    <span>average</span>
                    <span>total</span>
                </div>
            )}
        </div>
    );
};

export default DataSharingGauge;
