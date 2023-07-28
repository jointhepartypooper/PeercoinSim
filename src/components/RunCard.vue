<script lang="ts" setup>
import { type PropType } from "vue";
import { OhVueIcon } from "oh-vue-icons";
import FileSaver from "file-saver";
import { type IMetaRun } from "../models/IRun";

const emit = defineEmits<{
  (e: "remove-card", id: string): void;
  (e: "toggle-card", id: string): void;
  (e: "move-left-card", id: string): void;
  (e: "move-right-card", id: string): void;
}>();

const props = defineProps({
  metaRun: {
    type: Object as PropType<IMetaRun>,
    required: true,
  },
});
 
function onShowToggle() {
  console.log("onShow request");
}

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
    @click.stop="emit('toggle-card', metaRun.runId)"     
    class="card"
    :class="{ 'card-selected': metaRun.selected }"
  >
    <div>
      <OhVueIcon
        name="co-arrow-thick-left"
        class="me-1 pointer"
        @click.stop="emit('move-left-card', metaRun.runId)"
        data-bs-toggle="tooltip"
        title="Move to left"
      />
      <OhVueIcon
        name="co-chart-line"
        class="me-1 pointer"
        @click.stop="onShowToggle"
        data-bs-toggle="tooltip"
        title="Toggle chart"
      />
      <OhVueIcon
        name="co-save"
        class="me-1 pointer"
        @click.stop="onSave"
        data-bs-toggle="tooltip"
        title="Download run"
      />
      <OhVueIcon
        name="bi-trash3"
        class="me-1 pointer"
        @click.stop="emit('remove-card', metaRun.runId)"
        data-bs-toggle="tooltip"
        title="Remove run"
      />
      <OhVueIcon
        name="co-arrow-thick-right"
        class="me-1 pointer"
        @click.stop="emit('move-right-card', metaRun.runId)"
        data-bs-toggle="tooltip"
        title="Move to left"
      />
    </div>
    <div class="card-body">
      <p
        class="card-title fs-6"
        :style="{ 'background-color': metaRun.run.colorCode }"
      >
        {{ metaRun.run.name }}
      </p>

      <p class="card-text">Status: todo</p>
 
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
</style>
