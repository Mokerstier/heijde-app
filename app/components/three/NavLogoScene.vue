<template>
    <TresPerspectiveCamera :position="[0, 0, 5]" :fov="35" />
    <TresAmbientLight :intensity="0.9" />
    <TresDirectionalLight :position="[2, 3, 4]" :intensity="3" />
    <TresPointLight :position="[-3, -1, 2]" color="#a78bfa" :intensity="18" />
    <TresMesh
        ref="mesh"
        :geometry="logo"
        :rotation="[0.15, 0.5, 0]"
        :scale="[scale, -scale, scale]">
        <TresMeshStandardMaterial
            color="#3d7bff"
            :roughness="0.3"
            :metalness="0.25"
            emissive="#1c3d99"
            :emissive-intensity="0.35" />
    </TresMesh>
</template>
<script lang="ts" setup>
import { useLoop } from '@tresjs/core';
import type { Mesh } from 'three';
import { createLogoGeometry, LOGO_SVG_WIDTH } from '~/utils/logoGeometry';

const logo = createLogoGeometry(120);
const scale = 2.3 / LOGO_SVG_WIDTH;

const mesh = shallowRef<Mesh>();
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const { onBeforeRender } = useLoop();
onBeforeRender(({ delta }) => {
    // One slow turn every ~14s; reduced motion keeps it at a fixed three-quarter angle.
    if (mesh.value && !reducedMotion) mesh.value.rotation.y += delta * 0.45;
});
</script>
