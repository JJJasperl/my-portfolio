// src/components/TimeVisualization/TimeVisualization.jsx
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./TimeVisualization.css";

const TimeVisualization = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    // Clear any existing chart
    d3.select(chartRef.current).selectAll("*").remove();
    
    // Set up dimensions
    const width = 500;
    const height = 300;
    
    // Create scales
    const yScale = d3.scaleLinear()
      .domain([0, 10])
      .range([height, 0]);
    
    const xScale = d3.scaleLinear()
      .domain([-1, 27])
      .range([0, width]);
    
    // Create axes
    const yAxis = d3.axisLeft(yScale)
      .tickSizeOuter(1)
      .tickSizeInner(7)
      .tickValues([2, 4, 6, 8])
      .tickFormat(d => 10 * d + "%");
    
    const xAxis = d3.axisBottom(xScale)
      .tickSizeOuter(1)
      .tickSizeInner(7)
      .tickValues([0, 5, 10, 15, 20, 25]);
    
    // Data for the stacked area chart
    const data = [
      {
        Study: 0,
        Music: 0,
        Game: 0,
        "Social or Family": 10,
        Coding: 0,
        index: -1
      },
      {
        Study: 0,
        Music: 0,
        Game: 0,
        "Social or Family": 10,
        Coding: 0,
        index: 0
      },
      {
        Study: 6,
        Music: 0,
        Game: 0,
        "Social or Family": 4,
        Coding: 0,
        index: 6
      },
      {
        Study: 4,
        Music: 0,
        Game: 3,
        "Social or Family": 3,
        Coding: 0,
        index: 9
      },
      {
        Study: 3,
        Music: 0,
        Game: 2,
        "Social or Family": 2,
        Coding: 3,
        index: 18
      },
      {
        Study: 2,
        Music: 1,
        Game: 2,
        "Social or Family": 2,
        Coding: 3,
        index: 23
      },
      {
        Study: 2,
        Music: 1,
        Game: 2,
        "Social or Family": 2,
        Coding: 3,
        index: 25
      },
      {
        Study: 3,
        Music: 0,
        Game: 1,
        "Social or Family": 2,
        Coding: 4,
        index: 27
      }
    ];
    
    // Stack generator
    const stack = d3.stack()
      .keys(["Study", "Music", "Game", "Coding", "Social or Family"])
      .order(d3.stackOrderNone);
    
    const series = stack(data);
    
    // Area generator
    const area = d3.area()
      .x(d => xScale(d.data.index))
      .y0(d => yScale(d[0]))
      .y1(d => yScale(d[1]))
      .curve(d3.curveBasis);
    
    // Create SVG
    const svg = d3.select(chartRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("preserveAspectRatio", "xMidYMid meet");
    
    // Create group for areas
    const areaGroup = svg.append("g");
    
    // Add axes
    svg.append("g")
      .attr("transform", "translate(-1,0)")
      .call(yAxis)
      .attr("font-size", "12px")
      .attr("font-family", "sans-serif");
    
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .attr("font-size", "12px")
      .attr("font-family", "sans-serif");
    
    // Add x-axis label
    svg.append("text")
      .attr("transform", `translate(${width / 2},${height - 10})`)
      .style("text-anchor", "middle")
      .attr("fill", "#334155")
      .attr("font-family", "sans-serif")
      .attr("font-size", "14px")
      .text("Age");
    
    // Colors for each area
    const colors = ["#bfdbfe", "#bae6fd", "#a5f3fc", "#99f6e4", "#a7f3d0"];
    
    // Add areas
    areaGroup.selectAll("path")
      .data(series)
      .join("path")
      .attr("d", area)
      .attr("fill", (d, i) => colors[i])
      .attr("opacity", "1")
      .attr("stroke", "white")
      .attr("stroke-width", "0")
      .on("mouseover", (event, d) => {
        d3.select(event.target)
          .transition()
          .duration(500)
          .attr("stroke-width", "5");
      })
      .on("mouseout", (event, d) => {
        d3.select(event.target)
          .transition()
          .duration(500)
          .attr("stroke-width", "0");
      });
    
    // Add labels
    areaGroup.selectAll("text")
      .data(series)
      .enter()
      .append("text")
      .attr("class", "area-label")
      .text(d => d.key)
      .attr("fill", "#334155")
      .attr("font-weight", 300)
      .attr("font-family", "sans-serif")
      .attr("font-size", "14px")
      .attr("pointer-events", "none")
      .attr("transform", d => {
        switch (d.key) {
          case "Study":
            return "translate(110,240) scale(1.5)";
          case "Music":
            return "translate(410,232) scale(1.3)";
          case "Game":
            return "translate(195,150) scale(1.5)";
          case "Social or Family":
            return "translate(63,65) scale(1.5)";
          case "Coding":
            return "translate(340,110) scale(1.5)";
          default:
            return "translate(50,50) scale(1)";
        }
      });
  }, []);

  return (
    <div className="time-visualization-container">
      <h2>Time</h2>
      <p>This is how I spend my time. My biggest hobby is learning, as I am curious about almost everything.</p>
      <div className="chart-container">
        <svg ref={chartRef}></svg>
      </div>
    </div>
  );
};

export default TimeVisualization;