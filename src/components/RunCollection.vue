<script setup lang="ts">
import { computed, ref, type PropType } from "vue";
import VerticalExpand from "../components/VerticalExpand.vue";
import RunCard from "../components/RunCard.vue";
import FileReader from "../components/FileReader.vue";
import { type IRun, type IMetaRun } from "../models/IRun";
import VueNumberInput from "../components/VueNumberInput.vue";

const emit = defineEmits<{
  (e: "add-run"): void;
  (e: "remove-card", id: string): void;
  (e: "toggle-card", id: string): void;
  (e: "update-card", id: IMetaRun): void;
}>();
const props = defineProps({
  // runName: {
  //   type: String,
  //   required: true,
  // },
  // runSelected: {
  //   type: Boolean,
  //   default: false,
  // },
  metaRuns: {
    type: Array as PropType<Array<IMetaRun>>,
    required: true,
  },
});
const currentCard = computed<IMetaRun | undefined>(() => {
  return props.metaRuns.find((c) => c.selected);
});

const somevalue = ref<number>(100);
// function onUpdate(newValue:number, oldValue:number) {
//     console.log(newValue, oldValue);
//   },
//   onChange(event) {
//     console.log(event);
//   },
//   onInput(event) {
//     console.log(event);
//   },
function onAddRun() {
  emit("add-run");
}
function onRemoveRun(id: string) {
  emit("remove-card", id);
}
function onToggleCard(id: string) {
  emit("toggle-card", id);
}
function onFileLoad(jsonString: string) {
  console.log(jsonString);
}
function onColorChanged(event: any) {
  const target = event.target as HTMLInputElement;
  let hhh = target.value;
  const copy = JSON.parse(JSON.stringify(currentCard.value)); // as typeof IMetaRun;
  (copy as IMetaRun).run.colorCode = target.value;
  emit("update-card", copy);
}
</script>

<template>
  <div class="text-bg-light">
    <div class="row pt-2">
      <div class="col-12 text-end px-4">
        <div class="btn-group" role="group" aria-label="Manage runs">
          <button
            type="button"
            @click="onAddRun"
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
            @remove-card="onRemoveRun"
            @toggle-card="onToggleCard"
          ></RunCard>
        </div>
      </div>
    </div>

    <VerticalExpand>
      <div v-if="!!currentCard" class="mt-3 px-3">
        <div class="settings">Run settings</div>
        <div class="row my-2">
          <div class="col-3">Name</div>
          <div class="col-3">
            <input
              class="form-control form-control-sm"
              type="text"
              placeholder="name of run"
              aria-label=".form-control-sm example"
            />
          </div>
          <div class="col-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Pos difficulty56</label
            >
          </div>
          <div class="col-3">
            <VueNumberInput
              v-model="somevalue"
              :min="1"
              :max="140"
              :step="10.3"
              :controls="true"
              inputclass="form-control form-control-sm"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-3">Name</div>
          <div class="col-3">
            <input
              class="form-control form-control-sm"
              type="text"
              placeholder="name of run"
              aria-label=".form-control-sm example"
            />
          </div>
          <div class="col-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Pos difficulty</label
            >
          </div>
          <div class="col-3">
            <input
              type="email"
              class="form-control form-control-sm"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              v-model.number="somevalue"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-3">
            <label for="exampleColorInput" class="form-label"
              >Color picker</label
            >
          </div>
          <div class="col-3">
            <input
              type="color"
              class="form-control form-control-sm form-control-color"
              id="exampleColorInput"
              :value="currentCard.run.colorCode"
              @input="onColorChanged"
              title="color in chart"
            />
          </div>
          <div class="col-3">
            <label for="formFileSmtodo" class="form-label">Load export</label>
          </div>
          <div class="col-3">
            <FileReader id="formFileSmtodo" @text-loaded="onFileLoad" />
          </div>
        </div>

        <div class="mb-3">
          <label for="validationTextarea" class="form-label">Textarea</label>
          <textarea
            class="form-control form-control-sm is-invalid"
            id="validationTextarea"
            placeholder="Required example textarea"
            required
          ></textarea>
          <div class="invalid-feedback">
            Please enter a message in the textarea.
          </div>
        </div>

        <div class="mb-3">
          <button class="btn btn-success btn-lg" type="button">run it</button>
        </div>
      </div>
    </VerticalExpand>
  </div>
</template>

<style scoped>
/* .tab-run-collection{
  class="text-bg-light p-3"
} */
.card-selected {
  border-color: #3cb054;
  box-shadow: 0px 0px 10px 2px #3cb054;
}
.settings {
  background-color: #3cb054;
  color: #f3f5ee;
  border-top-left-radius: 8px 8px;
  border-top-right-radius: 8px 8px;
}
</style>
