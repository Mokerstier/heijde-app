<template>
    <div ref="pieChart"></div>
</template>
<script lang="ts" setup>
import * as d3 from 'd3';
import type { RepoLanguages } from '~/server/api/github';

const { data } = defineProps<{
    data: RepoLanguages[];
}>();

const pieChart = ref<SVGSVGElement | null>(null);

onMounted(() => {
    console.log('mounted');
    if (pieChart.value === null) return;

    const width = 800;
    const height = 500;
    var lineLegendHeight = 30;
    var nbLinesInLegend = Math.floor((data.keys.length - 1) / data.legendItemsPerLine) + 1;
    var marginBottom = lineLegendHeight * nbLinesInLegend;

    // set the dimensions and margins of the graph
    var graphWidth = width;
    var graphHeight = height - marginBottom;

    var radius = Math.min(graphHeight, graphWidth) / 2;
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select(pieChart.value).append('svg').append('g');

    const pie = d3
        .pie()
        .sort(null)
        .value((d: any) => d.value);

    var arc = d3
        .arc()
        .innerRadius(radius * 0) // This is the size of the donut hole
        .outerRadius(radius * 1);

    svg.selectAll('allSlices')
        .data(data)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
            return color(i);
        })
        .attr('stroke', 'white')
        .style('stroke-this.width', '1px')
        .style('opacity', 1);
});
</script>
