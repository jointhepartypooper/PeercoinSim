<template>
  <div class="input-group custom-file-button">
    <label class="input-group-text" for="inputGroupFile"
      > <OhVueIcon name="px-briefcase-upload" /></label
    >
    <input
      type="file"
      class="form-control form-control-sm"
      id="inputGroupFile"
      aria-describedby="inputGroupFileAddon04"
      aria-label="Upload"
      ref="file"
      @change="loadTextFromFile"
    />

    <button
      class="btn btn-outline-secondary"
      type="button"
      id="inputGroupFileAddon04"
      @click="readFile"
    >
      <OhVueIcon name="fc-process" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from "vue";
import { OhVueIcon } from "oh-vue-icons";
const emit = defineEmits(["text-loaded"]);

const fileObject = ref<File | null>(null);
const file = ref<any>(null);
const fileName = computed<string>(() =>
  !!fileObject.value && !!fileObject.value.name ? fileObject.value.name : ""
);
const hasJsonChosen = computed<boolean>(() => {
  return fileName.value.endsWith(".json");
});
function loadTextFromFile(ev: any): void {
  if (!ev.target || !ev.target.files) return;
  fileObject.value = file.value.files[0];
}

function readFile() {
  if (!hasJsonChosen.value) {
    return;
  }
  const reader = new FileReader();

  reader.onload = (e) => {
    if (!!e.target) emit("text-loaded", e.target.result);
  };
  reader.readAsText(fileObject!.value!);
}
</script>

<style lang="scss">
.custom-file-button {
  input[type="file"] {
    margin-left: -2px !important;

    &::-webkit-file-upload-button {
      display: none;
    }
    &::file-selector-button {
      display: none;
    }
  }

  &:hover {
    label {
      background-color: #dde0e3;
      cursor: pointer;
    }
  }
}
</style>
