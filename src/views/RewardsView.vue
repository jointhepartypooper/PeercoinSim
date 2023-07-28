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

function addRun() {
  const count = metaRuns.value.length;
  metaRuns.value.push({
    runId: uuidv4(),
    run: {
      colorCode: RandomColor.create(),
      name: "run " + (count + 1),
      posDiff: 20,
      staticReward: 1.34,
      percentageReward: 0.03,
      minDays: 30,
      rampDays: 60,
      sampleSize: 100,
      geometric: false,
      maxDays: 730,
    },
    sequence: count,
    selected: count === 0,
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

function toggleSelected(id: string) {
  let run = metaRuns.value.find((r) => r.runId === id);
  if (!!run) {
    const curVal = run.selected;
    if (!curVal) {
      let others = metaRuns.value.filter((r) => r.runId !== id);
      others.forEach((c) => (c.selected = false));
    }
    run.selected = !run.selected;
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
    card.run.percentageReward = newCard.run.percentageReward;
    card.run.minDays = newCard.run.minDays;
    card.run.rampDays = newCard.run.rampDays;
    card.run.sampleSize = newCard.run.sampleSize;
    card.run.maxDays = newCard.run.maxDays;
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
      @update-card="updateCard"
      @move-left-card="moveLeftRun"
      @move-right-card="moveRightRun"
    />

    <Chart />
  </div>
</template>
<style lang="scss">
.tab-content {
  min-height: 450px;
}
</style>
