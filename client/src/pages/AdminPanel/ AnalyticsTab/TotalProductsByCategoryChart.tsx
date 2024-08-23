import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {TotalProductsByCategory} from "../../../DataModel/Objects/Analytics";
import {RawText} from "../../../components/RawText/RawText";

interface Props {
    data: TotalProductsByCategory[];
}

const TotalProductsByCategoryChart: React.FC<Props> = ({ data }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!data?.length) return;

        const svg = d3.select(svgRef.current);
        const width = 500;
        const height = 300;
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };

        svg.selectAll('*').remove(); // Clear previous content

        const x = d3.scaleBand()
            .domain(data.map(d => d.category))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.totalProducts) || 0])
            .nice()
            .range([height - margin.bottom, margin.top]);

        svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));

        svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));

        svg.append('g')
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', d => x(d.category) || 0)
            .attr('y', d => y(d.totalProducts))
            .attr('height', d => y(0) - y(d.totalProducts))
            .attr('width', x.bandwidth())
            .attr('fill', 'steelblue');
    }, [data]);

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <RawText text="Total Products by Category" fontSize={28} fontWeight={700}/>
            <svg ref={svgRef} width={500} height={300}></svg>
        </div>
    );
};

export default TotalProductsByCategoryChart;
