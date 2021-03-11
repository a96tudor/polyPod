import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import i18n from "../../i18n.js";

/*
    Component to visualize data in a non-ordered bubble-diagram
    Takes in width and height of the output svg as well as
    data object: [{dataType, value},{},..]
*/

const DataTypeBubbleCategory = ({
    data,
    width,
    height,
    category,
    defaultColor,
    highlightedType,
}) => {
    const bubbleRef = useRef(null);
    const edgePadding = 5;

    const clearSvg = () => {
        d3.select(bubbleRef.current).selectAll("svg").remove();
    };

    const makeHierarchy = () => {
        return d3.hierarchy({ children: data }).sum((d) => d.value);
    };

    const pack = () => {
        return d3
            .pack()
            .size([width - edgePadding, height - edgePadding])
            .padding(3);
    };

    const createBubbleContainer = () => {
        return d3
            .select(bubbleRef.current)
            .append("svg")
            .attr("viewBox", `0 0 ${width} ${height}`);
    };

    // d3 svg bubble-diagram drawing function
    const drawDataBubbles = (bubbleContainer) => {
        let hierarchicalData = makeHierarchy(data);
        let packLayout = pack();

        const root = packLayout(hierarchicalData);

        const leaf = bubbleContainer
            .selectAll("g")
            .data(root.leaves())
            .enter()
            .append("g")
            .attr("transform", (d) => `translate(${d.x + 1},${d.y + 1})`);

        leaf.append("circle")
            .attr("r", (d) => d.r)
            .attr("fill-opacity", (d) =>
                d.data.Polypoly_Parent_Category == category ? 1 : 0.2
            )
            .attr("fill", defaultColor)
            .style("vertical-align", "center")
            .each(function (d) {
                if (d.data["dpv:Category"] === highlightedType) {
                    const diagram = d3.select(this.parentNode.parentNode);
                    const height = bubbleContainer._groups[0][0].scrollHeight;
                    //x+1 because it seemed a little of otherwise
                    diagram
                        .append("line")
                        .style("stroke", "#F7FAFC")
                        .style("stroke-width", 1)
                        .attr("x1", d.x + 1)
                        .attr(
                            "y1",
                            d.y > height / 2 ? d.y - d.r - 3 : d.y + d.r + 3
                        )
                        .attr("x2", d.x + 1)
                        .attr(
                            "y2",
                            d.y > height / 2 ? d.y - d.r - 12 : d.y + d.r + 12
                        );

                    diagram
                        .append("text")
                        .attr("x", d.x + 1)
                        .attr(
                            "y",
                            d.y > height / 2 ? d.y - d.r - 20 : d.y + d.r + 20
                        )
                        .attr("text-anchor", "middle")
                        .style("font-size", "14px")
                        .style("fill", "#F7FAFC")
                        .text(
                            d.data[
                                i18n.t("dataTypeBubble:category.translation")
                            ]
                        );
                }
            });

        //This is just so the size of the graph is equal to the other dataBubble-Graphs
        leaf.append("text")
            .text((d) => {
                return d.value.toString();
            })
            .attr("text-anchor", "middle")
            .attr("y", ".3em")
            .style("fill", "transparent")
            .style("font-size", (d) => {
                return (8 + d.value / 60).toString() + "px";
            })
            .style("font-weight", "500");

        leaf.select();
    };

    useEffect(() => {
        clearSvg();
        drawDataBubbles(createBubbleContainer());
    });

    return <div className="bubble-chart" ref={bubbleRef}></div>;
};

export default DataTypeBubbleCategory;
