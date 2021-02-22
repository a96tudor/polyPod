import React, { useState } from "react";
import CompanyShortInfo from "../../companyShortInfo/companyShortInfo.jsx";
import CompanyRevenueChart from "./companyRevenueChart/companyRevenueChart.jsx";
import "./companyInfoScreen.css";

const CompanyInfo = ({ company }) => {
    const [openTab, setOpenTab] = useState("location");
    const availableTabs = ["location", "structure", "revenue"];

    const handleJurisdictionInfo = () => {
        console.log("Nothing is done here yet!");
    };

    const locationTooltip = (
        <div className="location-tooltip">
            <button onClick={() => handleJurisdictionInfo()}>
                <img src="./images/question-circle.svg" />
            </button>
            <p>Jurisdictions</p>
            <div className="circle EU-GDPR"></div>
            <p>EU-GDPR</p>
            <div className="circle Russia"></div>
            <p>Russia</p>
            <div className="circle Five-Eyes"></div>
            <p>Five-Eyes</p>
            <div className="circle China"></div>
            <p>China</p>
            <div className="circle Others"></div>
            <p>Undisclosed</p>
        </div>
    );

    //get this from somewhere else
    const tabTranslation = {
        location: "Location",
        structure: "Structure",
        revenue: "Revenue",
    };
    const tabContent = {
        location: (
            <div>
                <div className={`location-block ${company.jurisdiction}`}>
                    <img src="./images/location-pin.svg" alt="location-pin" />
                    <p className={`location-text`}>
                        {company.location.city}, {company.location.countryCode},{" "}
                        {company.jurisdiction}
                    </p>
                </div>
                {locationTooltip}
            </div>
        ),
        structure: 0,
        revenue: 0,
    };
    const featuredTabContent = {
        location: (
            <div>
                <div className={"location-block"}></div>
                {locationTooltip}
            </div>
        ),
        structure: 0,
        revenue: <CompanyRevenueChart company={company}></CompanyRevenueChart>,
    };

    const handleOpenTabChange = (tab) => {
        setOpenTab(tab);
    };

    return (
        <div className="explorer-container">
            <CompanyShortInfo company={company} />
            <div className="tab-button-container">
                {availableTabs.map((tab, index) => (
                    <button
                        key={index}
                        className={
                            openTab === tab ? "tab-button active" : "tab-button"
                        }
                        onClick={() => handleOpenTabChange(tab)}
                    >
                        {tabTranslation[tab]}
                    </button>
                ))}
            </div>
            <div className="tab-content-container">
                {company.featured
                    ? featuredTabContent[openTab]
                    : tabContent[openTab]}
            </div>
            <div className="company-info-text-container">
                <p className="company-info-text">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
            </div>
        </div>
    );
};

export default CompanyInfo;
