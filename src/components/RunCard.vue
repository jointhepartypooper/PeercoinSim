<script lang="ts" setup>
import { computed, ref, type PropType } from "vue";
import { OhVueIcon } from "oh-vue-icons";
import { useToast } from "vue-toastification";

const toast = useToast();
const props = defineProps({
  runName: {
    type: String,
    required: true,
  },
  runSelected: {
    type: Boolean,
    default: false,
  },
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
}
function onRemove() {
  console.log("remove request");
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
  <div class="card" :class="{ 'card-selected': runSelected }">
    <div>
      <OhVueIcon
        name="co-arrow-thick-left"
        class="me-1 pointer"
        @click="onLeft"
      />
      <OhVueIcon
        name="co-chart-line"
        class="me-1 pointer"
        @click="onShowToggle"
      />
      <OhVueIcon name="co-save" class="me-1 pointer" @click="onSave" />
      <OhVueIcon name="bi-trash3" class="me-1 pointer" @click="onRemove" />
      <OhVueIcon
        name="co-arrow-thick-right"
        class="me-1 pointer"
        @click="onRight"
      />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ runName }}</h5>
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
