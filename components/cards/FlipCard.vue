<template>
    <div :style="`height: ${height}px`" class="flip-card group">
        <div class="flip-card-inner group-hover:rotate-y-180 h-full">
            <div class="flip-card-front">
                <slot name="front" />
            </div>
            <div class="flip-card-back h-full">
                <slot name="back" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const { height } = defineProps<{
    height: number;
}>();
</script>
<style scoped lang="scss">
.flip-card {
    background-color: transparent;
    width: 100%;
    height: 100%;
    perspective: 1000px;
}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.flip-card-back {
    color: white;
    transform: rotateY(180deg);
}
</style>
