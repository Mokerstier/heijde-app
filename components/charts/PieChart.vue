<template>
    <div ref="pieChart" class="flex justify-center"></div>
</template>
<script lang="ts" setup>
import * as d3 from 'd3';
import type { RepoLanguages } from '~/types/Repo';

const { data } = defineProps<{
    data: RepoLanguages;
}>();

const pieChart = ref<SVGSVGElement | null>(null);

onMounted(() => {
    if (pieChart.value === null) return;

    const width = 200;
    const height = 200;
    const lineLegendHeight = 30;
    const marginBottom = lineLegendHeight;

    // set the dimensions and margins of the graph
    const graphWidth = width;
    const graphHeight = height - marginBottom;

    const radius = Math.min(graphHeight, graphWidth) / 2;
    const color = d3
        .scaleOrdinal()
        .domain(['TypeScript', 'JavaScript', 'EJS', 'HTML', 'SCSS', 'Sass', 'Vue', 'CSS'])
        .range([
            '#3178c6',
            '#EFD91C',
            '#bf225a',
            '#e34c26',
            '#c6538c',
            '#c6538c',
            '#54D389',
            '#563d7c',
        ]);

    const svg = d3
        .select(pieChart.value)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const pie = d3.pie().value((d: any) => d[1]);

    const arc = d3
        .arc()
        .innerRadius(30) // This is the size of the donut hole
        .outerRadius(radius * 1 - 20);

    svg.selectAll('allSlices')
        .data(pie(Object.entries(data) as any))
        .enter()
        .append('path')
        .attr('d', arc as any)
        .attr('fill', (d: any): string => color(d.data[0]) as string)
        .attr('stroke', 'white')
        .style('stroke-this.width', '1px')
        .style('opacity', 1);
});
</script>
