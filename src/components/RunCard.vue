<script lang="ts" setup>
import { type PropType } from "vue";
import { OhVueIcon } from "oh-vue-icons";
import CircleProgress from "../components/CircleProgress.vue";
import FileSaver from "file-saver";
import { type IMetaRun } from "../models/IRun";
 
const emit = defineEmits<{
  (e: "remove-card", id: string): void;
  (e: "toggle-card", id: string, newValue:boolean): void;
  (e: "toggle-chart", id: string, newValue:boolean): void;
  (e: "move-left-card", id: string): void;
  (e: "move-right-card", id: string): void;
}>();

const props = defineProps({
  metaRun: {
    type: Object as PropType<IMetaRun>,
    required: true,
  },
});

function onSave() {
  const obj = props.metaRun.run;
  const myJSON = JSON.stringify(obj, null, 2);
  // Note: Ie and Edge don't support the new File constructor,
  // so it's better to construct blobs and use saveAs(blob, filename)
  const file = new File(
    [myJSON],
    (props.metaRun.run.name.replace(/[/\\?%*:|"<>]/g, "-") ?? "myRun") +
      ".json",
    {
      type: "text/plain;charset=utf-8",
    }
  );
  FileSaver.saveAs(file);
}
</script>

<template>
  <div
    class="card"
    :class="{ 'card-selected': metaRun.selected }"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    :title="metaRun.run.name ?? 'no name'"
  >
    <div>
      <OhVueIcon
        name="co-arrow-thick-left"
        class="me-1 pointer"
        @click.stop.prevent="emit('move-left-card', metaRun.runId)
        "
        data-bs-toggle="tooltip"
        title="Move to left"
      />
      <OhVueIcon
        name="co-chart-line"
        class="me-1 pointer"
        :class="{ 'chart-selected': !!metaRun.showChart }"
        @click.stop.prevent="emit('toggle-chart', metaRun.runId, !metaRun.showChart)"
        data-bs-toggle="tooltip"
        title="Toggle chart"
      />
      <OhVueIcon
        name="co-save"
        class="me-1 pointer"
        @click.stop.prevent="onSave"
        data-bs-toggle="tooltip"
        title="Download run"
      />
      <OhVueIcon
        name="bi-trash3"
        class="me-1 pointer"
        @click.stop.prevent="emit('remove-card', metaRun.runId)"
        data-bs-toggle="tooltip"
        title="Remove run"
      />
      <OhVueIcon
        name="co-arrow-thick-right"
        class="me-1 pointer"
        @click.stop.prevent="emit('move-right-card', metaRun.runId)"
        data-bs-toggle="tooltip"
        title="Move to left"
      />
    </div>
    <div
      class="card-body"
      @click.stop.prevent="emit('toggle-card', metaRun.runId, !metaRun.selected)"    >
      <p
        class="card-title fs-6 rounded"
        :style="{ 'background-color': metaRun.run.colorCode }"
      >
        {{ metaRun.run.name }}
      </p>
      <div class="d-flex justify-content-center flex-nowrap">
        <div class="mx-2 p-2"></div>
        <div class="mx-2 p-2">
          <circle-progress
            front-color="#3cb054"
            :value="metaRun.run.status ?? 0"
          />
        </div>
        <div class="mx-2 p-2"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-selected {
  border-color: #3cb054;
  box-shadow: 0px 0px 10px 2px #3cb054;
}
.pointer:hover {
  cursor: pointer;
}
.chart-selected {
  box-shadow: 0px 0px 1px 1px #3cb054;
}
</style>
