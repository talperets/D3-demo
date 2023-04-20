import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain(data.map((d) => d.category));
    y.domain([0, d3.max(data, (d) => d.value)]);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(y));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},${height + margin.top})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

      svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.category) + margin.left)
      .attr("y", d => y(d.value) + margin.top)
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", "steelblue");    
      
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

const generateDummyData = () => {
  const categories = [
    "Category A",
    "Category B",
    "Category C",
    "Category D",
    "Category E",
    "Category A",
    "Category C",
    "Category D",
    "Category E"
  ];
  const data = [];

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const value = Math.floor(Math.random() * 100);
    data.push({ category, value });
  }

  return data;
};

const App = () => {
  const data = generateDummyData();

  return (
    <div className="App">
      <h1>Dummy Data Bar Chart</h1>
      <BarChart data={data} />
    </div>
  );
};

export default App;
