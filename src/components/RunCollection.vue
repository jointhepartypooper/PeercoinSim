<script setup lang="ts">
import { computed, type PropType } from "vue";
import VerticalExpand from "../components/VerticalExpand.vue";
import RunCard from "../components/RunCard.vue";
import { type IMetaRun } from "../models/IRun";
import CardSettings from "../components/CardSettings.vue";

const emit = defineEmits<{
  (e: "add-run"): void;
  (e: "remove-card", id: string): void;
  (e: "toggle-card", id: string): void;
  (e: "toggle-chart", id: string): void;
  (e: "move-left-card", id: string): void;
  (e: "move-right-card", id: string): void;
  (e: "update-card", card: IMetaRun): void;
  (e: "update-status", id: string, progress: number): void;
}>();

const props = defineProps({
  metaRuns: {
    type: Array as PropType<Array<IMetaRun>>,
    required: true,
  },
});

const currentCard = computed<IMetaRun | undefined>(() => {
  return props.metaRuns.find((c) => c.selected);
});
</script>

<template>
  <div class="text-bg-light">
    <div class="row pt-2">
      <div class="col-12 text-end px-4">
        <div class="btn-group" role="group" aria-label="Manage runs">
          <button
            type="button"
            @click="emit('add-run')"
            class="btn btn-outline-success"
          >
            Add new run
          </button>
        </div>
      </div>
    </div>

    <div class="px-2 mt-2 pb-3">
      <div class="row row-cols-2 row-cols-md-6 g-4">
        <div class="col" v-for="item in metaRuns" :key="item.runId">
          <RunCard
            :meta-run="item"            
            @remove-card="emit('remove-card', item.runId)"
            @toggle-card="emit('toggle-card', item.runId)"
            @toggle-chart="emit('toggle-chart', item.runId)"
            @move-left-card="emit('move-left-card', item.runId)"
            @move-right-card="emit('move-right-card', item.runId)"
          ></RunCard>
        </div>
      </div>
    </div>

    <VerticalExpand>
      <div v-if="!!currentCard" class="mt-3 px-3">
        <CardSettings
          :meta-run="currentCard"
          @update-card="(card) => emit('update-card', card)"
        />
      </div>
    </VerticalExpand>
  </div>
</template>

<style scoped>
.card-selected {
  border-color: #3cb054;
  box-shadow: 0px 0px 10px 2px #3cb054;
}
</style>
