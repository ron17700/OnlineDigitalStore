import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {OrderSalesOverTime} from "../../../DataModel/Objects/Analytics";
import {RawText} from "../../../components/RawText/RawText";

interface Props {
    data: OrderSalesOverTime[];
}

const OrderSalesOverTimeChart: React.FC<Props> = ({ data }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!data?.length) return;

        const svg = d3.select(svgRef.current);
        const width = 600;
        const height = 300;
        const margin = { top: 20, right: 30, bottom: 40, left: 50 };

        svg.selectAll('*').remove();

        const x = d3.scaleTime()
            .domain(d3.extent(data, d => new Date(d.date)) as [Date, Date])
            .range([margin.left, width - margin.right]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.totalRevenue) || 0])
            .nice()
            .range([height - margin.bottom, margin.top]);

        const line = d3.line<OrderSalesOverTime>()
            .x(d => x(new Date(d.date)))
            .y(d => y(d.totalRevenue))
            .curve(d3.curveMonotoneX);

        svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));  // Time formatting for the x axis

        svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));

        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 2)
            .attr('d', line);

    }, [data]);

    return (
        <div style={{textAlign: 'center', margin: '20px'}}>
            <RawText text="Order Sales Over Time" fontSize={28} fontWeight={700}/>
            <svg ref={svgRef} width={600} height={300}></svg>
        </div>
    );
};

export default OrderSalesOverTimeChart;
