import React, { useContext } from "react";
import { ImporterContext } from "../../context/importer-context.jsx";

import "./report.css";

const ReportCard = ({ analysis }) => {
    return (
        <div className="report-card">
            <h1>{analysis.title}</h1>
            <div className="list">{analysis.render()}</div>
        </div>
    );
};

const ReportView = () => {
    const { fileAnalysis } = useContext(ImporterContext);
    const unrecognizedData = fileAnalysis.unrecognizedData;

    //Todo
    const handleSendReport = () => {
        console.log("ToDo");
    };

    function renderReportAnalyses() {
        if (!unrecognizedData) {
            return "";
        }
        return (
            <div>
                {unrecognizedData.reportAnalyses.map((analysis, index) => (
                    <ReportCard analysis={analysis} key={index} />
                ))}
            </div>
        );
    }

    return (
        <div className="report-view">
            <h1 className="report-view-title">Unrecognized data report</h1>
            {renderReportAnalyses()}
            <div className="button-area">
                <button className="send" onClick={handleSendReport}>Send report</button>
            </div>
        </div>
    );
};

export default ReportView;
