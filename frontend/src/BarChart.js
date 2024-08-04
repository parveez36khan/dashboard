// src/BarChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    console.log('Data:', data); // Log the data to verify
    const width = 928;
    const height = 500;
    const marginTop = 30;
    const marginRight = 0;
    const marginBottom = 30;
    const marginLeft = 40;

    // Clear previous content
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto;');

    // Declare the x (horizontal position) scale.
    const x = d3.scaleBand()
      .domain(data.map(d => d.topic))
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)])
      .range([height - marginBottom, marginTop]);

    // Add a rect for each bar.
    svg.append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', d => x(d.topic))
      .attr('y', d => y(d.intensity))
      .attr('height', d => y(0) - y(d.intensity))
      .attr('width', x.bandwidth());

    // Add the x-axis and label.
    svg.append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add the y-axis and label, and remove the domain line.
    svg.append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select('.domain').remove())
      .call(g => g.append('text')
        .attr('x', -marginLeft)
        .attr('y', 10)
        .attr('fill', 'currentColor')
        .attr('text-anchor', 'start')
        .text('↑ Intensity'));

  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default BarChart;
