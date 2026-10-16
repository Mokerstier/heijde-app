<template>
    <TresPerspectiveCamera :position="[0, 0, cameraZ]" :fov="45" />
    <TresAmbientLight :intensity="0.6" />
    <TresDirectionalLight :position="[3, 4, 5]" :intensity="2.5" />
    <TresPointLight :position="[-3, -2, 2]" color="#a78bfa" :intensity="25" />

    <TresGroup ref="group">
        <!-- The W logo, extruded from the outline SVG (y is flipped: SVG y points down). -->
        <TresMesh :geometry="logo" :position="[0, 0, 0]" :scale="[logoScale, -logoScale, logoScale]">
            <TresMeshStandardMaterial
                color="#3d7bff"
                :roughness="0.3"
                :metalness="0.25"
                emissive="#1c3d99"
                :emissive-intensity="0.35" />
        </TresMesh>

        <!-- Lego brick (2x4) -->
        <Levioso :speed="calm ? 0 : 2" :float-factor="1.5" :rotation-factor="1.2">
            <TresGroup :position="[1.85, 1.1, 0.5]" :rotation="[0.5, 0.6, 0.2]" :scale="0.36">
                <TresMesh>
                    <TresBoxGeometry :args="[3.2, 0.96, 1.6]" />
                    <TresMeshStandardMaterial color="#ffd400" :roughness="0.3" />
                </TresMesh>
                <TresMesh
                    v-for="stud in studs"
                    :key="stud.join()"
                    :position="[stud[0], 0.545, stud[1]]">
                    <TresCylinderGeometry :args="[0.24, 0.24, 0.17, 24]" />
                    <TresMeshStandardMaterial color="#ffd400" :roughness="0.3" />
                </TresMesh>
            </TresGroup>
        </Levioso>

        <!-- Graffiti spray can -->
        <Levioso :speed="calm ? 0 : 1.6" :float-factor="2" :rotation-factor="1.6">
            <TresGroup :position="[-2.2, -1, 0.2]" :rotation="[0.2, 0, -0.5]" :scale="0.9">
                <TresMesh>
                    <TresCylinderGeometry :args="[0.3, 0.3, 1.1, 32]" />
                    <TresMeshStandardMaterial color="#a78bfa" :roughness="0.25" :metalness="0.3" />
                </TresMesh>
                <TresMesh :position="[0, -0.05, 0]">
                    <TresCylinderGeometry :args="[0.31, 0.31, 0.4, 32]" />
                    <TresMeshStandardMaterial color="#f4f2ff" :roughness="0.5" />
                </TresMesh>
                <TresMesh :position="[0, 0.64, 0]">
                    <TresCylinderGeometry :args="[0.15, 0.3, 0.18, 32]" />
                    <TresMeshStandardMaterial color="#c9c9d6" :roughness="0.2" :metalness="0.8" />
                </TresMesh>
                <TresMesh :position="[0, 0.86, 0]">
                    <TresCylinderGeometry :args="[0.16, 0.16, 0.26, 24]" />
                    <TresMeshStandardMaterial color="#1a1633" :roughness="0.4" />
                </TresMesh>
                <TresMesh :position="[0.1, 0.9, 0.09]" :rotation="[Math.PI / 2, 0, -0.7]">
                    <TresCylinderGeometry :args="[0.045, 0.045, 0.2, 16]" />
                    <TresMeshStandardMaterial color="#f4f2ff" :roughness="0.4" />
                </TresMesh>
            </TresGroup>
        </Levioso>

        <!-- Skateboard: bent deck with kicktails, griptape, trucks and wheels -->
        <Levioso :speed="calm ? 0 : 2.4" :float-factor="1">
            <TresGroup :position="[1.8, -0.7, 0.6]" :rotation="[0.4, -0.4, 0.7]" :scale="0.6">
                <TresMesh :geometry="deck">
                    <TresMeshStandardMaterial color="#3d7bff" :roughness="0.35" />
                </TresMesh>
                <TresMesh :geometry="griptape" :position="[0, 0.05, 0]">
                    <TresMeshStandardMaterial color="#14112b" :roughness="0.95" />
                </TresMesh>
                <!-- Blue skull on the griptape; the group spins it to face along the deck. -->
                <TresGroup :position="[0, 0.059, 0]" :rotation="[0, -Math.PI / 2, 0]">
                    <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
                        <TresPlaneGeometry :args="[0.68, 0.68]" />
                        <TresMeshStandardMaterial
                            :map="skullTexture"
                            transparent
                            :roughness="0.6"
                            emissive="#ffffff"
                            :emissive-map="skullTexture"
                            :emissive-intensity="1" />
                    </TresMesh>
                </TresGroup>
                <TresMesh v-for="x in [-0.8, 0.8]" :key="'plate' + x" :position="[x, -0.07, 0]">
                    <TresBoxGeometry :args="[0.3, 0.04, 0.22]" />
                    <TresMeshStandardMaterial color="#c9c9d6" :roughness="0.3" :metalness="0.8" />
                </TresMesh>
                <TresMesh v-for="x in [-0.8, 0.8]" :key="'hanger' + x" :position="[x, -0.15, 0]">
                    <TresBoxGeometry :args="[0.14, 0.09, 0.5]" />
                    <TresMeshStandardMaterial color="#c9c9d6" :roughness="0.3" :metalness="0.8" />
                </TresMesh>
                <TresMesh
                    v-for="x in [-0.8, 0.8]"
                    :key="'axle' + x"
                    :position="[x, -0.2, 0]"
                    :rotation="[Math.PI / 2, 0, 0]">
                    <TresCylinderGeometry :args="[0.03, 0.03, 0.82, 12]" />
                    <TresMeshStandardMaterial color="#c9c9d6" :roughness="0.3" :metalness="0.8" />
                </TresMesh>
                <TresMesh
                    v-for="wheel in wheels"
                    :key="wheel.join()"
                    :position="[wheel[0], -0.2, wheel[1]]"
                    :rotation="[Math.PI / 2, 0, 0]">
                    <TresCylinderGeometry :args="[0.15, 0.15, 0.17, 28]" />
                    <TresMeshStandardMaterial color="#f4f2ff" :roughness="0.45" />
                </TresMesh>
            </TresGroup>
        </Levioso>
    </TresGroup>
</template>
<script lang="ts" setup>
import { Levioso } from '@tresjs/cientos';
import { useLoop } from '@tresjs/core';
import {
    BoxGeometry,
    type BufferAttribute,
    CanvasTexture,
    type Group,
    SRGBColorSpace,
} from 'three';
import { createLogoGeometry, LOGO_SVG_WIDTH } from '~/utils/logoGeometry';

const props = defineProps<{
    /** Mutable scroll state (progress through the hero, 0..1), read each frame. */
    state: { progress: number };
    /** Pause the render loop, e.g. while the canvas is off screen. */
    paused: boolean;
    /** Reduced motion: no wobble, floating or pointer follow. */
    calm: boolean;
}>();

const group = shallowRef<Group>();

// Narrow screens: pull the camera back so the lego, spray can and skateboard are not cut off.
const cameraZ = window.innerWidth < 640 ? 7.8 : 6;

// The logo as a thick bevelled extrusion; the SVG is ~626 units wide, scaled to ~3 scene units.
const logo = createLogoGeometry(170);
const logoScale = 3.0 / LOGO_SVG_WIDTH;

// 2x4 lego stud grid and the four skateboard wheels, as [x, z] pairs.
const studs = [-1.2, -0.4, 0.4, 1.2].flatMap((x) => [-0.4, 0.4].map((z) => [x, z]));
const wheels = [-0.8, 0.8].flatMap((x) => [-0.4, 0.4].map((z) => [x, z]));

// Skateboard deck: a finely segmented box, bent up at both ends (kicktails) and
// narrowed to rounded ends in plan view.
const buildDeck = (length: number, width: number, thickness: number) => {
    const geometry = new BoxGeometry(length, thickness, width, 96, 1, 1);
    const position = geometry.attributes.position as BufferAttribute;
    const half = length / 2;
    const kickStart = half - 0.5;
    const roundStart = half - width / 2;

    for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const ax = Math.abs(x);
        if (ax > kickStart) {
            const k = (ax - kickStart) / (half - kickStart);
            position.setY(i, position.getY(i) + k * k * 0.26);
        }
        if (ax > roundStart) {
            const t = Math.min(1, (ax - roundStart) / (half - roundStart));
            position.setZ(i, position.getZ(i) * Math.sqrt(1 - t * t * 0.96));
        }
    }
    geometry.computeVertexNormals();
    return geometry;
};
// Blue skull painted to a canvas; the cut-outs stay transparent so the griptape shows.
const skullTexture = (() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#5b95ff';
    ctx.beginPath();
    ctx.ellipse(256, 205, 160, 150, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(176, 290, 160, 130, 34);
    ctx.fill();

    // Eye sockets, nose and teeth are cut out again.
    ctx.globalCompositeOperation = 'destination-out';
    for (const x of [196, 316]) {
        ctx.beginPath();
        ctx.ellipse(x, 225, 46, 54, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.beginPath();
    ctx.moveTo(256, 275);
    ctx.lineTo(232, 325);
    ctx.lineTo(280, 325);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
    for (const x of [216, 256, 296]) {
        ctx.beginPath();
        ctx.moveTo(x, 370);
        ctx.lineTo(x, 412);
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(196, 370);
    ctx.lineTo(316, 370);
    ctx.stroke();

    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    return texture;
})();

const deck = buildDeck(2.7, 0.72, 0.1);
const griptape = buildDeck(2.64, 0.68, 0.012);
const pointer = { x: 0, y: 0 };

const onPointerMove = (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
};

onMounted(() => window.addEventListener('pointermove', onPointerMove, { passive: true }));
onBeforeUnmount(() => window.removeEventListener('pointermove', onPointerMove));

const { onBeforeRender, start, stop } = useLoop();

watch(
    () => props.paused,
    (paused) => (paused ? stop() : start())
);

onBeforeRender(({ delta }) => {
    const g = group.value;
    if (!g) return;

    // Frame-rate independent easing towards the target pose.
    const ease = 1 - Math.pow(0.002, delta);
    const follow = props.calm ? 0 : 1;
    const targetRotY = pointer.x * 0.5 * follow + props.state.progress * Math.PI;
    const targetRotX = pointer.y * 0.35 * follow;
    const targetY = props.state.progress * 1.5;
    const targetScale = 1 - props.state.progress * 0.35;

    g.rotation.y += (targetRotY - g.rotation.y) * ease;
    g.rotation.x += (targetRotX - g.rotation.x) * ease;
    g.position.y += (targetY - g.position.y) * ease;
    g.scale.setScalar(g.scale.x + (targetScale - g.scale.x) * ease);
});
</script>
