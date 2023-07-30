<script setup lang="ts">
import { computed, ref, type PropType } from "vue";
import { GChart } from "vue-google-charts";
import { type IMetaRun } from "../models/IRun";

const props = defineProps({
  metaRuns: {
    type: Array as PropType<Array<IMetaRun>>,
    required: true,
  },
});

const title = ref<string>("Optimum output");
const xaxis = ref<string>("UTXO size");
const yaxisLeft = ref<string>("% Rewards / year");
const yaxisRight = ref<string>("Mints / Coin / Year");

const usedColors = computed<string[]>(() => {
  const colors = [] as string[];
  props.metaRuns.forEach((run) => {
    if (!!run.run.results) {
      if (run.run.results?.length === 2) {
        colors.push(run.run.colorCode);
      } else if (run.run.results?.length === 3) {
        colors.push(run.run.colorCode);
        colors.push(run.run.colorCode);
      }
    }
  });

  return colors;
});

const usedSeries = computed(() => {
  const sets = [...props.metaRuns];
  const count = sets.length;
  const seriesobj = {} as any;
  let counter = 0;
  for (let index = 0; index < count; index++) {
    const metaRun = sets[index];
    if (!!metaRun.run.results) {
      if (metaRun.run.results?.length === 2) {
        seriesobj[counter++] = { targetAxisIndex: 0 };
      } else if (metaRun.run.results?.length === 3) {
        seriesobj[counter++] = { targetAxisIndex: 0 };
        seriesobj[counter++] = {
          targetAxisIndex: 1,
          lineDashStyle: [14, 2, 2, 7],
        };
      }
    }
  }

  return seriesobj;
});
const usedLineHeaders = computed<string[]>(() => {
  const header = [] as string[];
  header.push("xvalues");
  props.metaRuns.forEach((run) => {
    if (!!run.run.results) {
      if (run.run.results?.length === 2) {
        header.push(run.run.name + " (l)");
      } else if (run.run.results?.length === 3) {
        header.push(run.run.name + " (l)");
        header.push(run.run.name + " (r)");
      }
    }
  });

  return header;
});

const dataset = computed<number[][]>(() => {
  const arrayData = [] as number[][];

  const sets = [...props.metaRuns];
  const setcount = sets.length;

  const allx = sets.map((s) => s.run.results![0]).flat();
  const uniqueX = allx.filter((item, pos) => {
    return allx.indexOf(item) == pos;
  });
  //loop all x value:
  for (let indexX = 0; indexX < uniqueX.length; indexX++) {
    const curX = uniqueX[indexX];

    //get all y values for curX:
    const xys = [] as any[];
    xys.push(curX);

    for (let indexY = 0; indexY < setcount; indexY++) {
      const metarun = sets[indexY];
      const yindex = metarun.run.results![0].indexOf(curX);
      if (metarun.run.results?.length === 2) {
        xys.push(yindex > -1 ? metarun.run.results[1][yindex] : null);
      } else if (metarun.run.results?.length === 3) {
        xys.push(yindex > -1 ? metarun.run.results[1][yindex] : null);
        xys.push(yindex > -1 ? metarun.run.results[2][yindex] : null);
      }
    }
    if (xys.length > 1) arrayData.push(xys);
  }

  return arrayData;
});

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
  return [usedLineHeaders.value, ...dataset.value];
});

const linearOptions = computed(() => {
  return {
    title: title.value,
    interpolateNulls: true,
    pointSize: 1,
    // width: 1155,
    height: 800,
    curveType: "function",
    colors: usedColors.value,
    lineWidth: 1,
    hAxis: {
      gridlines: {
        count: -1,
      },
      scaleType: "log",
      title: xaxis.value,
    },
    vAxes: {
      0: {
        title: yaxisLeft.value,
      },
      1: {
        title: yaxisRight.value,
      },
    },
    series: usedSeries.value,
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
    },
  };
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
  <div class="container mb-4">
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

    <div class="row my-4">
      <div class="col-3">Y-axis 1</div>
      <div class="col-3">
        <input
          required
          class="form-control form-control-sm"
          v-model="yaxisLeft"
          type="text"
          placeholder="name of run"
          aria-label=".form-control-sm example"
        />
      </div>
      <div class="col-3">Y-axis 2</div>
      <div class="col-3">
        <input
          required
          class="form-control form-control-sm"
          v-model="yaxisRight"
          type="text"
          placeholder="name of run"
          aria-label=".form-control-sm example"
        />
      </div>
    </div>
  </div>
</template>
