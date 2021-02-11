import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

/*
    Component to visualize data in a non-ordered bubble-diagram
    Takes in width and height of the output svg as well as
    data object: [{dataType, value},{},..]
*/

const DataTypeBubbles = ({ data, width, height, bubbleColor }) => {
    const bubbleRef = useRef(null);
    const edgePadding = 5;

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
            .attr("height", height)
            .attr("width", width)
            .style("border", "thin black solid");
    };

    // d3 svg bubble-diagram drawing function
    const drawDataBubbles = (bubbleContainer) => {
        const hierarchicalData = makeHierarchy(data);
        const packLayout = pack();

        const root = packLayout(hierarchicalData);

        const leaf = bubbleContainer
            .selectAll("g")
            .data(root.leaves())
            .enter()
            .append("g")
            .attr("transform", (d) => `translate(${d.x + 1},${d.y + 1})`);

        leaf.append("circle")
            .attr("r", (d) => d.r)
            .attr("fill-opacity", 0.7)
            .attr("fill", bubbleColor)
            .style("vertical-align", "center");

        leaf.append("text")
            .text((d) => {
                return d.value.toString();
            })
            .attr("text-anchor", "middle")
            .attr("y", ".3em")
            .style("fill", "white")
            .style("font-size", (d) => {
                return (14 + d.value).toString() + "px";
            });
    };

    useEffect(() => {
        drawDataBubbles(createBubbleContainer());
    });

    return (
        <div>
            <div ref={bubbleRef}></div>
        </div>
    );
};

export default DataTypeBubbles;
