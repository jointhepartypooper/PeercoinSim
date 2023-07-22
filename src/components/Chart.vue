<script setup lang="ts">
import { computed, ref, type PropType } from "vue";
import { GChart } from "vue-google-charts";
const chartData = ref([
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
]);
const linearOptions = {
  title: "Optimum output",
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
    title:'UTXO size',
    minValue: 0,
  },
  vAxis: {
    title:"% Rewards / year",
    //ticks: [-1000, -500, 0, 500, 1000],
    minValue: 0,
  },
  explorer: {
    actions: ["dragToZoom", "rightClickToReset"],
    maxZoomOut : 4.0,
    zoomDelta: 0.10,
    axis: "horizontal",
    //keepInBounds: true,
    maxZoomIn : 0.005,
  },
  animation: {
    duration: 1.5,
    startup: false,
    easing: "linear",
  },
};
// const dayStamp = computed<string>(() => {
//   return "" + daystamp.value;
// });
const chartOptions = ref({
  chart: {
    title: "title chart",
    subtitle: "curve to find max reward ",
  },
});
</script>
<template>
<div class="row mt-4">
<div class="col">

  <GChart type="LineChart" :data="chartData" :options="linearOptions" />
</div>
</div>

</template>
