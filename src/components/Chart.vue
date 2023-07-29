<script setup lang="ts">
import { computed, ref, type PropType } from "vue";
import { GChart } from "vue-google-charts";

const title = ref<string>("Optimum output");
const xaxis = ref<string>("UTXO size");
// const chartDatwa = ref<any[]>([
//   ["output", "Sales", "name3"],

//   [0.1, 0.1, 3.23],
//   [1, 1, 3.23],
//   [6, 8, 3.23],
//   [7, 13, 3.23],
//   [8, 21, 3.23],
//   [9, 34, 3.23],
//   [10, 55, 3.23],
//   [11, 89, 3.23],
//   [12, 144, 3.23],
//   [13, 233, 3.23],
//   [14, 377, 3.23],
//   [15, 610, 3.23],
//   [16, 987, 3.23],
//   [26, 987, 3.23],
//   [56, 987, 3.23],
//   [66, 987, 3.23],
//   [76, 987, 3.23],
//   [126, 987, 3.23],
// ]);
const chartData = computed(() => {
  return [
    ["output", "Sales", "name3"],

    [0.1, 0.1, 3.23],
    [1, 1, 3.23],
    [6, 8, 3.23],
    [7, 13, 3.23],
    [8, 21, 3.23],
    [9, 34, 3.23],
    [10, 55, 3.23],
    [11, 89, 3.23],
    [12, 144, 3.23],
    [13, 233, 3.23],
    [14, 377, 3.23],
    [15, 610, 3.23],
    [16, 987, 3.23],
    [26, 987, 3.23],
    [56, 987, 3.23],
    [66, 987, 3.23],
    [76, 987, 3.23],
    [126, 987, 3.23],
  ];
});
const linearOptions = computed(() => {

  return {
  title: title.value,
  //legend: "none",
  pointSize: 1,
  // width: 1155,
  height: 600,
  curveType: "function",
  colors: ["#a52714", "#0000ff", "#ff0000", "#00ff00"],
  hAxis: {
    gridlines: {
      count: -1,
    },
    scaleType: "log",
    title: xaxis.value,
    minValue: 0,
  },
  vAxis: {
    title: "% Rewards / year",
    //ticks: [-1000, -500, 0, 500, 1000],
    minValue: 0,
  },
  explorer: {
    actions: ["dragToZoom", "rightClickToReset"],
    maxZoomOut: 4.0,
    zoomDelta: 0.1,
    axis: "horizontal",
    maxZoomIn: 0.005,
  },
  animation: {
    duration: 1.5,
    startup: false,
    easing: "linear",
  }
  }
});
 
// const dayStamp = computed<string>(() => {
//   return "" + daystamp.value;
// });
// const chartOptions = ref({
//   chart: {
//     title: "title chart",
//     subtitle: "curve to find max reward ",
//   },
// });
</script>

<template>
  <div class="row mt-4">
    <div class="col">
      <GChart type="LineChart" :data="chartData" :options="linearOptions" />
    </div>
  </div>

  <div class="row my-4">
    <div class="col-3">Title</div>
    <div class="col-3">
      <input
        required
        class="form-control form-control-sm"
        v-model="title"
        type="text"
        placeholder="name of run"
        aria-label=".form-control-sm example"
      />
    </div>
    <div class="col-3">X-axis</div>
    <div class="col-3">
      <input
        required
        class="form-control form-control-sm"
        v-model="xaxis"
        type="text"
        placeholder="name of run"
        aria-label=".form-control-sm example"
      />
    </div>
  </div>
</template>
