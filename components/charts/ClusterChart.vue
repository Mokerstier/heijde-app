<template>
    <div>
        <svg :width="width" :height="height">
            <g :transform="translate" ref="clusterChart"></g>
        </svg>
    </div>
</template>
<script lang="ts" setup>
import * as d3 from 'd3';
import type { RepoLanguages } from '~/types/Repo';

const { data } = defineProps<{
    data: RepoLanguages;
}>();

const clusterChart = ref<SVGSVGElement | null>(null);
const xCenter = [0, 25, 50, 75, 100, 125, 150, 175];
const width = 450;
const height = 350;
const translate = `translate(${width / 2}, ${height / 2})`;

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

onMounted(() => {
    const root = d3
        .select(clusterChart.value)
        .selectAll('circle')
        .data(Object.entries(data) as any)
        .join('circle')
        .attr('r', 10)
        .attr('fill', (d: any): string => {
            return color(d[0]) as string;
        });

    const ticked = () => {
        root.attr('cx', (d) => {
            console.log(d);
            return d.x;
        }).attr('cy', (d) => d.y);
    };

    const simulation = d3
        .forceSimulation(Object.entries(data))
        .force('charge', d3.forceManyBody().strength(5))
        .force(
            'x',
            d3.forceX().x((d, i) => {
                console.log(d);
                console.log(xCenter[i]);
                return xCenter[i];
            })
        )
        .force('collision', d3.forceCollide().radius(11))
        .on('tick', ticked)
        .stop();

    ticked();
    simulation.restart();
});
</script>
