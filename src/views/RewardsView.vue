<script setup lang="ts">
import { computed, ref, type PropType } from "vue";
import { v4 as uuidv4 } from "uuid";
import RunCollection from "../components/RunCollection.vue";
import Chart from "../components/Chart.vue";
import { type IRun, type IMetaRun } from "../models/IRun";
import { RandomColor } from "../RandomColor";
// const props = defineProps({
//   runName: {
//     type: String,
//     required: true,
//   },
//   runSelected: {
//     type: Boolean,
//     default: false,
//   },
//   //   sourceElementsArray: {
//   //     type: Array as PropType<Array<someinterface>>,
//   //     required: true,
//   //   },
// });
const metaRuns = ref<IMetaRun[]>([]);

const currentCard = computed<IMetaRun | undefined>(() => {
  return metaRuns.value.find((c) => c.selected);
});

function addRun() {
  metaRuns.value.push({
    runId: uuidv4(),
    run: {
      colorCode: RandomColor.create(),
      name: "",
    },
  } as IMetaRun);
}

function removeRun(id: string) {
  metaRuns.value = metaRuns.value.filter((r) => r.runId !== id);
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

function switchCard(newCard: IMetaRun) { 
  let card = metaRuns.value.find((x) => x.runId === newCard.runId);
  if (!!card) {
    card.run.colorCode = newCard.run.colorCode;
  }
}
</script>

<template>
  <div class="tab-content text-bg-light">
    <RunCollection
      :metaRuns="metaRuns"
      @add-run="addRun"
      @remove-card="removeRun"
      @toggle-card="toggleSelected"
      @update-card="switchCard"
    />

    <Chart />
  </div>
</template>
<style lang="scss">
.tab-content {
  min-height: 450px;
}
</style>
