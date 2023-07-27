<script lang="ts" setup>
import { computed, ref, type PropType } from "vue";
import { OhVueIcon } from "oh-vue-icons";
import { useToast } from "vue-toastification";
import FileSaver from "file-saver";
import { v4 as uuid } from "uuid";
import { type IRun, type IMetaRun } from "../models/IRun";
 
const emit = defineEmits(["remove-card", "toggle-card"]);
const toast = useToast();
const props = defineProps({
  metaRun: {
    type: Object as PropType<IMetaRun>,
    required: true,
  },
  // runSelected: {
  //   type: Boolean,
  //   default: false,
  // },
  //   sourceElementsArray: {
  //     type: Array as PropType<Array<someinterface>>,
  //     required: true,
  //   },
});

const selectedShow = ref<boolean>(false);

function onLeft() {
  console.log("onLeft request");
}
function onRun() {
  console.log("onRun request");
}
function onShowToggle() {
  console.log("onShow request");
}
function onSave() {
  console.log("save request");
  let myUUID = uuid();
  const obj = { runId: myUUID, name: "John", age: 30, city: "New York" };
  const myJSON = JSON.stringify(obj);
  // Note: Ie and Edge don't support the new File constructor,
  // so it's better to construct blobs and use saveAs(blob, filename)
  var file = new File([myJSON], "hello world.json", {
    type: "text/plain;charset=utf-8",
  });
  FileSaver.saveAs(file);
}

function onToggleCard() {
  emit("toggle-card", props.metaRun.runId);
}

function onRemove() {
  emit("remove-card", props.metaRun.runId);
}
function onRight() {
  console.log("onRight request");
  toast.success("moved to the right", {
    // position: "bottom-right",
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
  });
}
</script>

<template>
  <div
    @click="onToggleCard"
    class="card"
    :class="{ 'card-selected': metaRun.selected }"
  >
    <div>
      <OhVueIcon
        name="co-arrow-thick-left"
        class="me-1 pointer"
        @click.stop="onLeft"
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
        @click.stop="onRemove"
        data-bs-toggle="tooltip"
        title="Remove run"
      />
      <OhVueIcon
        name="co-arrow-thick-right"
        class="me-1 pointer"
        @click.stop="onRight"
        data-bs-toggle="tooltip"
        title="Move to left"
      />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ metaRun.run.name }}</h5>
      <p class="card-text">Status: running</p>
      <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
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
