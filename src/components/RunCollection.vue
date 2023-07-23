<script setup lang="ts">
import { computed, ref, type PropType } from "vue";
import VerticalExpand from "../components/VerticalExpand.vue";
import RunCard from "../components/RunCard.vue";
import FileReader from "../components/FileReader.vue";

import VueNumberInput from "../components/VueNumberInput.vue"

const items = ref<string[]>([
  "diff: 17.4, static: 1.34",
  "diff: 18.4, static: 1.34",
  "diff: 19.4, static: 1.34",
]);
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

function onFileLoad(jsonString: string) {
  console.log(jsonString);
}
</script>

<template>
  <div class="text-bg-light">
    <div class="row pt-2">
      <div class="col-12 text-end px-4">
        <div class="btn-group" role="group" aria-label="Manage runs">
          <button type="button" class="btn btn-outline-success">
            Add new run
          </button>
        </div>
      </div>
    </div>

    <div class="px-2 mt-2 pb-3">
      <div class="row row-cols-2 row-cols-md-6 g-4">
        <div class="col" v-for="(item, index) in items" :key="index">
          <RunCard :run-name="item" :run-selected="index == 1"></RunCard>
        </div>
      </div>
    </div>

    <VerticalExpand>
      <div v-if="1 == 1" class="mt-3 px-3">
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
            <VueNumberInput v-model="somevalue" :min="1" :max="140" :step="10.3" :controls="true"
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
              value="#563d7c"
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
