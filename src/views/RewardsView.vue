<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";
import RunCollection from "../components/RunCollection.vue";
import Chart from "../components/Chart.vue";
import { type IMetaRun } from "../models/IRun";
import { RandomColor } from "../RandomColor";

onMounted(() => {
  addRun();
});

const metaRuns = ref<IMetaRun[]>([]);

const orderedMetaRuns = computed<IMetaRun[]>(() => {
  return metaRuns.value.sort((a, b) => (a.sequence > b.sequence ? 1 : -1));
});

const chartedMetaRuns = computed<IMetaRun[]>(() => {
  return orderedMetaRuns.value.filter(
    (a) =>
      !!a.showChart &&
      !!a.run.status &&
      a.run.status >= 100 &&
      !!a.run.results &&
      (a.run.results.length == 2 || a.run.results.length == 3) &&
      a.run.results[0].length > 0 &&
      a.run.results[0].length === a.run.results[1].length &&
      (a.run.results.length == 2 ||
        a.run.results[2].length === a.run.results[1].length)
  );
});

function addRun() {
  const count = metaRuns.value.length;
  metaRuns.value.push({
    runId: uuidv4(),
    run: {
      colorCode: RandomColor.create(),
      name: "run " + (count + 1),
      posDiff: 20,
      staticReward: 1.34,
      relativeReward: 0.03,
      minDays: 30,
      rampDays: 60,
      blockIntervalSeconds: 10 * 60,
      geometric: false,
      maxDays: 730,
      coinSupply: 28500000,
      status: 0,
    },
    sequence: count,
    selected: count === 0,
    showChart: false,
  } as IMetaRun);
}

function removeRun(id: string) {
  metaRuns.value = metaRuns.value.filter((r) => r.runId !== id);
}

function moveLeftRun(id: string) {
  let run = metaRuns.value.find((r) => r.runId === id);
  if (!!run) {
    let runnext = metaRuns.value.find((r) => r.sequence === run!.sequence - 1);
    if (!!runnext) {
      const tmp = runnext.sequence;
      runnext.sequence = run.sequence;
      run.sequence = tmp;
    }
  }
}

function moveRightRun(id: string) {
  let run = metaRuns.value.find((r) => r.runId === id);
  if (!!run) {
    let runnext = metaRuns.value.find((r) => r.sequence === run!.sequence + 1);
    if (!!runnext) {
      const tmp = runnext.sequence;
      runnext.sequence = run.sequence;
      run.sequence = tmp;
    }
  }
}

function toggleSelected(id: string, newval: boolean) {
  let run = metaRuns.value.find((r) => r.runId === id);
  if (!!run) {
    if (newval) {
      let others = metaRuns.value.filter((r) => r.runId !== id);
      others.forEach((c) => (c.selected = false));
    }
    run.selected = newval;
  }
}

function toggleChartSelected(id: string, newval: boolean) {
  debugger;
  let run = metaRuns.value.find((r) => r.runId === id);
  if (!!run) {
    run.showChart = newval;
  }
}

function updateStatus(id: string, newstatus: number) {
  let run = metaRuns.value.find((r) => r.runId === id);
  if (!!run) {
    run.run.status = newstatus;
  }
}

function updateCard(newCard: IMetaRun) {
  let card = metaRuns.value.find((x) => x.runId === newCard.runId);
  if (!!card) {
    card.run.name = newCard.run.name;
    card.run.colorCode = newCard.run.colorCode;
    card.run.posDiff = newCard.run.posDiff;
    card.run.notes = newCard.run.notes;
    card.run.staticReward = newCard.run.staticReward;
    card.run.relativeReward = newCard.run.relativeReward;
    card.run.minDays = newCard.run.minDays;
    card.run.rampDays = newCard.run.rampDays;
    card.run.blockIntervalSeconds = newCard.run.blockIntervalSeconds;
    card.run.maxDays = newCard.run.maxDays;
    card.run.coinSupply = newCard.run.coinSupply;
    card.run.status = newCard.run.status ?? 0;
    card.run.results = newCard.run.results;
  }
}
</script>

<template>
  <div class="tab-content text-bg-light">
    <RunCollection
      :metaRuns="orderedMetaRuns"
      @add-run="addRun"
      @remove-card="removeRun"
      @toggle-card="toggleSelected"
      @toggle-chart="toggleChartSelected"
      @update-card="updateCard"
      @move-left-card="moveLeftRun"
      @move-right-card="moveRightRun"
      @update-status="updateStatus"
    />

    <Chart
      v-if="!!chartedMetaRuns && chartedMetaRuns.length > 0"
      :meta-runs="chartedMetaRuns"
    />
  </div>
</template>
<style lang="scss">
.tab-content {
  min-height: 450px;
}
</style>
