import React, { useState, useRef, useEffect } from 'react';
import './RadarChart.css';

const RadarChart = ({ data }) => {
  const [activeGenre, setActiveGenre] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tooltipSize, setTooltipSize] = useState({ width: 100, height: 60 });
  const svgRef = useRef(null);
  
  // Calculate the maximum count to normalize values
  const maxCount = Math.max(...data.map(item => item.count));
  
  // Calculate center point and radius
  const centerX = 100;
  const centerY = 100;
  const radius = 130;
  const viewBoxSize = 250;
  
  // Label distance - reduced to bring labels closer to chart
  const labelDistance = 15; // Reduced from 20 to 10
  
  // Calculate tooltip width based on active genre
  useEffect(() => {
    if (activeGenre) {
      // Estimate width based on genre length
      const estimatedWidth = Math.max(100, activeGenre.length * 10 + 50);
      setTooltipSize({ width: estimatedWidth, height: 60 });
    }
  }, [activeGenre]);
  
  // Function to convert polar to cartesian coordinates
  const polarToCartesian = (angle, distance) => {
    const radians = (angle - 90) * (Math.PI / 180);
    return {
      x: centerX + (distance * Math.cos(radians)),
      y: centerY + (distance * Math.sin(radians))
    };
  };
  
  // Generate points for the polygon
  const generatePolygonPoints = () => {
    const points = data.map((item, index) => {
      const angle = (360 / data.length) * index;
      const normalizedDistance = (item.count / maxCount) * radius;
      const point = polarToCartesian(angle, normalizedDistance);
      return `${point.x},${point.y}`;
    });
    
    return points.join(' ');
  };
  
  // Generate coordinates for category labels
  const generateLabelCoordinates = () => {
    return data.map((item, index) => {
      const angle = (360 / data.length) * index;
      const point = polarToCartesian(angle, radius + labelDistance);
      return { x: point.x, y: point.y, angle, item };
    });
  };
  
  // Handle mouse movement - direct update for immediate tooltip response
  const handleMouseMove = (e) => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const x = ((e.clientX - svgRect.left) / svgRect.width) * viewBoxSize;
      const y = ((e.clientY - svgRect.top) / svgRect.height) * viewBoxSize;
      
      // Update mouse position immediately for responsive tooltip
      setMousePosition({ x, y });
    }
  };
  
  // Handle hover events
  const handleMouseLeave = () => {
    setActiveGenre(null);
  };
  
  const handleMouseEnter = (genre) => {
    setActiveGenre(genre);
  };
  
  const labelCoordinates = generateLabelCoordinates();
  
  // Get tooltip position from mouse coordinates
  const getTooltipPosition = () => {
    if (!activeGenre) return null;
    
    const genreData = data.find(item => item.genres === activeGenre);
    
    // Use CURRENT mouse position for tooltip (not smoothed)
    // Position with small offsets to avoid cursor overlap
    const offsetX = 15; 
    const offsetY = 15;
    
    return {
      x: mousePosition.x + offsetX,
      y: mousePosition.y + offsetY,
      width: tooltipSize.width,
      height: tooltipSize.height,
      genre: activeGenre,
      count: genreData.count
    };
  };
  
  const tooltipInfo = getTooltipPosition();
  
  // Attach mouse move event to svg
  useEffect(() => {
    const svgElement = svgRef.current;
    
    if (svgElement) {
      svgElement.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (svgElement) {
        svgElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  return (
    <svg 
      className="radar-chart" 
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} 
      ref={svgRef}
    >
      {/* Transparent background to ensure full interaction area */}
      <rect x="0" y="0" width={viewBoxSize} height={viewBoxSize} fill="transparent" />
      
      {/* Chart group - centered in the larger viewBox */}
      <g transform={`translate(${(viewBoxSize - 200) / 2}, ${(viewBoxSize - 200) / 2})`}>
        {/* Circular background to contain the chart */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius + 1}
          className="chart-background"
        />
      
        {/* Base circles */}
        {[0.25, 0.5, 0.75, 1].map((ratio, index) => (
          <circle 
            key={index} 
            cx={centerX} 
            cy={centerY} 
            r={radius * ratio} 
            className="radar-circle" 
          />
        ))}
        
        {/* Radial lines - confined within the circle */}
        {labelCoordinates.map((coord, index) => {
          // Calculate endpoint at the circle edge
          const angle = (360 / data.length) * index;
          const endpoint = polarToCartesian(angle, radius);
          
          return (
            <line 
              key={index}
              x1={centerX}
              y1={centerY}
              x2={endpoint.x}
              y2={endpoint.y}
              className="radar-line"
            />
          );
        })}
        
        {/* Category hover areas */}
        {data.map((item, index) => {
          const angle = (360 / data.length) * index;
          const startAngle = angle - (180 / data.length);
          const endAngle = angle + (180 / data.length);
          
          // Create wedge shape for hover detection
          const outerRadius = radius + 30; // Extend beyond labels
          
          const outerStartPoint = polarToCartesian(startAngle, outerRadius);
          const outerEndPoint = polarToCartesian(endAngle, outerRadius);
          
          // Create a path for the sector
          const largeArcFlag = (endAngle - startAngle) > 180 ? 1 : 0;
          
          const path = [
            `M ${centerX},${centerY}`,
            `L ${outerStartPoint.x},${outerStartPoint.y}`,
            `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndPoint.x},${outerEndPoint.y}`,
            `Z`
          ].join(' ');
          
          return (
            <path
              key={`sector-${index}`}
              d={path}
              className="sector-hover-area"
              onMouseEnter={() => handleMouseEnter(item.genres)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
        
        {/* Data polygon */}
        <polygon 
          points={generatePolygonPoints()} 
          className="data-polygon"
        />
        
        {/* Data points */}
        {data.map((item, index) => {
          const angle = (360 / data.length) * index;
          const normalizedDistance = (item.count / maxCount) * radius;
          const point = polarToCartesian(angle, normalizedDistance);
          
          return (
            <circle 
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              className={`data-point ${activeGenre === item.genres ? 'active' : ''}`}
            />
          );
        })}
        
        {/* Category labels - closer to chart edge */}
        {labelCoordinates.map((coord, index) => {
          const angle = coord.angle % 360;
          
          // Carefully positioned text anchors for better alignment
          let textAnchor;
          if (angle === 0) textAnchor = "middle";
          else if (angle === 90) textAnchor = "start";
          else if (angle === 180) textAnchor = "middle";
          else if (angle === 270) textAnchor = "end";
          else if (angle > 0 && angle < 90) textAnchor = "start";
          else if (angle > 90 && angle < 180) textAnchor = "start";
          else if (angle > 180 && angle < 270) textAnchor = "end";
          else textAnchor = "end";
          
          // Fine-tune positions to align with data points
          let dy = 0;
          if (angle === 0) dy = -5;
          if (angle === 180) dy = 15;
          
          return (
            <text 
              key={index}
              x={coord.x}
              y={coord.y + dy}
              dominantBaseline="middle"
              textAnchor={textAnchor}
              className={`category-label ${activeGenre === coord.item.genres ? 'active' : ''}`}
            >
              {coord.item.genres}
            </text>
          );
        })}
      </g>
      
      {/* Tooltip - directly following mouse position */}
      {tooltipInfo && (
        <g className="tooltip-group">
          <rect 
            x={tooltipInfo.x}
            y={tooltipInfo.y}
            width={tooltipInfo.width}
            height={tooltipInfo.height}
            rx="5"
            className="tooltip-bg"
          />
          <rect
            x={tooltipInfo.x + 10}
            y={tooltipInfo.y + 10}
            width="12"
            height="12"
            className="tooltip-color-indicator"
          />
          <text 
            x={tooltipInfo.x + 30}
            y={tooltipInfo.y + 20}
            className="tooltip-title"
          >
            {tooltipInfo.genre}
          </text>
          <text 
            x={tooltipInfo.x + 30}
            y={tooltipInfo.y + 40}
            className="tooltip-count"
          >
            count {tooltipInfo.count}
          </text>
        </g>
      )}
    </svg>
  );
};

export default RadarChart;