<template>
    <div class="group h-full w-full">
        <svg ref="svg" :width="width" class="h-full w-full">
            <g class="translate-x-1/2 translate-y-1/4" ref="clusterChart"></g>
        </svg>
        <div class="absolute bottom-0 left-0 w-full">
            <ul class="flex flex-col items-center">
                <li
                    v-for="(key, value) in data"
                    class="cursor-pointer"
                    :data-language="value"
                    @mouseenter="mouseEnter(value)"
                    @mouseleave="mouseLeave(value)"
                    :style="`color: ${colorsByLanguage[value as keyof typeof colorsByLanguage]}`">
                    {{ value }}: {{ key }} bytes
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" setup>
import * as d3 from 'd3';
import { colorsByLanguage } from '~/constants/languages';
import type { RepoLanguages } from '~/types/Repo';

const { data, width, height } = defineProps<{
    data: RepoLanguages;
    width: number;
    height: number;
    translate: string;
}>();

const mouseEnter = (lang: string) => {
    const allCircles = svg.value?.querySelectorAll<SVGCircleElement>('circle');
    allCircles?.forEach((circle) => {
        circle.style.fillOpacity = '0.4';
    });
    const circle = svg.value?.querySelector<SVGCircleElement>(`.${lang.toLowerCase()}`);
    if (circle) {
        circle.style.fillOpacity = '1';
    }
};

const mouseLeave = (lang: string) => {
    const allCircles = svg.value?.querySelectorAll<SVGCircleElement>('circle');
    allCircles?.forEach((circle) => {
        circle.style.fillOpacity = '1';
    });
};

const clusterChart = ref<SVGGElement | null>(null);
const svg = ref<SVGSVGElement | null>(null);
const xCenter = [-10, 0, 10, 20, 30, 40, 50, 60];

const data_ready = Object.entries(data) as any;

const calculateRelativeSize = (d: any) => {
    const sum = data_ready.reduce((acc: number, curr: any) => acc + curr[1], 0);
    const sizes = data_ready.map((item: any) => (item[1] * 100) / sum);
    const minSize = Math.min(...sizes);
    const maxSize = Math.max(...sizes);

    const scale = d3.scaleLinear().domain([minSize, maxSize]).range([8, 55]);

    return scale((d[1] * 100) / sum);
};

const radius = Math.min(width, height) / 2;

onMounted(async () => {
    await nextTick();
    const root = d3
        .select(clusterChart.value)
        .selectAll('circle')
        .data(data_ready)
        .join('circle')
        .attr('r', (d) => calculateRelativeSize(d))
        .attr('class', (d: any) => d[0].toLowerCase())
        .attr('fill', (d: any, i) => colorsByLanguage[d[0] as keyof typeof colorsByLanguage]);

    const ticked = () => {
        root.attr('cx', (d: any) => {
            return d.x;
        }).attr('cy', (d: any) => d.y);
    };

    const simulation = d3
        .forceSimulation(data_ready)
        .alphaTarget(0.3) // stay hot
        .velocityDecay(0.8) // low friction
        .force('x', d3.forceX().strength(0.04))
        .force('y', d3.forceY().strength(0.04))
        .force(
            'collide',
            d3
                .forceCollide(50)
                .radius((d: any) => 50)
                .iterations(data_ready.length)
        )
        .force(
            'charge',
            d3.forceManyBody().strength((d, i) => (i ? 0 : (-width * 2) / 3))
        )
        .on('tick', ticked);

    ticked();
    simulation.restart();
});
</script>
