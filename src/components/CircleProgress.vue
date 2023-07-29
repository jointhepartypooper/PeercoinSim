<script setup lang="ts">
import { computed, ref, type PropType } from "vue";

const props = defineProps({
  value: {
    type: Number,
    default: 0,
    //   validator(value) {
    //     return value >= 0 && value <= 100 ? true : false;
    //   }
  },
  frontColor: {
    type: String,
    default: "#ff7e29",
  },
  frontWidth: { type: Number, default: 8 },
  backColor: {
    type: String,
    default: "#f5dfd0",
  },
  backWidth: { type: Number, default: 8 },
  rounded: { type: Boolean, default: true },
  textColor: { type: String, default: "#737373" },
  innerColor: { type: String, default: "none" },
  size: {
    type: String,
    default: "small",
    //   validator(value) {
    //     return ["small", "medium", "large"].includes(value);
    //   }
  },
});
const calcValue = computed<number>(() => {
  return 283 - (283 * props.value) / 100;
});
</script>

<template>
  <div :class="['progress', size]">
    <svg
      :stroke-width="backWidth"
      class="progress__back"
      viewBox="0 0 100 100"
      :stroke="backColor"
      :fill="innerColor"
    >
      <circle cx="50" cy="50" r="45"></circle>
    </svg>
    <svg
      :stroke-linecap="rounded ? 'round' : ''"
      :stroke-width="frontWidth"
      :stroke-dashoffset="calcValue"
      :stroke="frontColor"
      class="progress__front"
      viewBox="0 0 100 100"
    >
      <circle cx="50" cy="50" r="45"></circle>
    </svg>
    <span :style="[{ color: textColor }]" class="progress__value"
      >{{ value }}%</span
    >
  </div>
</template>

<style lang="scss" scoped>
.small{
  width: 3rem;
  height: 3rem;
  font-size: 0.71rem;
}

.medium{
  width: 7rem;
  height: 7rem;
  font-size: 1.6rem;
}

.large{
  width: 9rem;
  height: 9rem;
  font-size: 1.8rem;
}
.progress {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  svg {
    height: inherit;
    width: inherit;
  }

  .progress__back {
    position: absolute;
    top: 0;
    left: 0;
  }

  .progress__front {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(-90deg);

    circle {
      fill: none;
      stroke-dasharray: 283;
    }
  }

  .progress__value {
    position: relative;
    font-size: inherit;
    pointer-events: none;
    z-index: 2;
  }
}
</style>
