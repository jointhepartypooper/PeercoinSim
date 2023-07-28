<script setup lang="ts">
import { computed, ref, type PropType } from "vue";
import { type IRun, type IMetaRun } from "../models/IRun";
import VueNumberInput from "../components/VueNumberInput.vue";
import FileReader from "../components/FileReader.vue";
import { useToast } from "vue-toastification";
const toast = useToast();
const emit = defineEmits<{
  (e: "update-card", id: IMetaRun): void;
}>();
const props = defineProps({
  metaRun: {
    type: Object as PropType<IMetaRun>,
    required: true,
  },
});

function onProperyChanged(field: string, newvalue: any) {
  const copy = JSON.parse(JSON.stringify(props.metaRun));
  copy.run[field] = newvalue;
  emit("update-card", copy);
}
// Validate this value with a custom type guard (extend to your needs)
function isRunType(o: any): o is IRun {
  return (
    "name" in o &&
    "posDiff" in o &&
    "staticReward" in o &&
    "percentageReward" in o &&
    "minDays" in o &&
    "rampDays" in o &&
    "sampleSize" in o &&
    "maxDays" in o &&
    "colorCode" in o
  );
}

function onFileLoad(jsonString: string) {
  if (!jsonString) return;

  const parsed = JSON.parse(jsonString);

  if (isRunType(parsed)) {
    const copy = JSON.parse(JSON.stringify(props.metaRun));
    copy.run = parsed;
    emit("update-card", copy);
  } else {
    toast.error("This file aint right", {
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
}
</script>

<template>
  <div class="settings">Run settings</div>
  <div class="row my-2">
    <div class="col-3">
      <label for="frmIpName" class="form-label">Name</label>
    </div>
    <div class="col-3">
      <input
        id="frmIpName"
        required
        class="form-control form-control-sm"
        :class="{ 'is-invalid': !metaRun.run.name }"
        type="text"
        placeholder="name of run"
        aria-label=".form-control-sm example"
        :value="metaRun.run.name"
        @input="(event)=>onProperyChanged('name', (event.target as HTMLInputElement).value)"
      />
    </div>
    <div class="col-3">
      <label for="frmIpDiff" class="form-label">Pos difficulty</label>
    </div>
    <div class="col-3">
      <VueNumberInput
        id="frmIpDiff"
        :modelValue="metaRun.run.posDiff"
        @update:modelValue="(newValue) => onProperyChanged('posDiff', newValue)"
        :min="0.1"
        :max="150"
        :step="0.1"
        :controls="false"
        :required="true"
        :inputclass="
          !!metaRun.run.posDiff
            ? 'form-control form-control-sm'
            : 'form-control form-control-sm is-invalid'
        "
      />
    </div>
  </div>

  <div class="row">
    <div class="col-3">
      <label for="frmIpStaticReward" class="form-label">Static reward</label>
    </div>
    <div class="col-3">
      <VueNumberInput
        id="frmIpStaticReward"
        :modelValue="metaRun.run.staticReward"
        @update:modelValue="
          (newValue) => onProperyChanged('staticReward', newValue)
        "
        :min="0"
        :max="10"
        :step="0.01"
        :controls="false"
        :required="true"
        :inputclass="
          !!metaRun.run.staticReward
            ? 'form-control form-control-sm'
            : 'form-control form-control-sm is-invalid'
        "
      />
    </div>
    <div class="col-3">
      <label for="frmIpfractionReward" class="form-label"
        >Fraction reward tot coins</label
      >
    </div>
    <div class="col-3">
      <VueNumberInput
        id="frmIpfractionReward"
        :modelValue="metaRun.run.percentageReward"
        @update:modelValue="
          (newValue) => onProperyChanged('percentageReward', newValue)
        "
        :min="0"
        :max="1"
        :step="0.001"
        :controls="false"
        :required="true"
        :inputclass="
          metaRun.run.percentageReward !== undefined &&
          metaRun.run.percentageReward >= 0
            ? 'form-control form-control-sm'
            : 'form-control form-control-sm is-invalid'
        "
      />
    </div>
  </div>

  <div class="row">
    <div class="col-3">
      <label for="frmIpmindays" class="form-label">Incubation period</label>
    </div>
    <div class="col-3">
      <VueNumberInput
        id="frmIpmindays"
        :modelValue="metaRun.run.minDays"
        @update:modelValue="(newValue) => onProperyChanged('minDays', newValue)"
        :min="0"
        :max="100"
        :step="1"
        :controls="false"
        :required="true"
        :inputclass="
          !!metaRun.run.minDays
            ? 'form-control form-control-sm'
            : 'form-control form-control-sm is-invalid'
        "
      />
    </div>
    <div class="col-3">
      <label for="frmIprampDays" class="form-label">Ramp up period</label>
    </div>
    <div class="col-3">
      <VueNumberInput
        id="frmIprampDays"
        :modelValue="metaRun.run.rampDays"
        @update:modelValue="
          (newValue) => onProperyChanged('rampDays', newValue)
        "
        :min="0"
        :max="100"
        :step="1"
        :controls="false"
        :required="true"
        :inputclass="
          metaRun.run.rampDays !== undefined && metaRun.run.rampDays >= 0
            ? 'form-control form-control-sm'
            : 'form-control form-control-sm is-invalid'
        "
      />
    </div>
  </div>

  <div class="row">
    <div class="col-3">
      <label for="frmIpsampleSize" class="form-label">Sample size</label>
    </div>
    <div class="col-3">
      <VueNumberInput
        id="frmIpsampleSize"
        :modelValue="metaRun.run.sampleSize"
        @update:modelValue="
          (newValue) => onProperyChanged('sampleSize', newValue)
        "
        :min="0"
        :max="1000"
        :step="1"
        :controls="false"
        :required="true"
        :inputclass="
          !!metaRun.run.minDays
            ? 'form-control form-control-sm'
            : 'form-control form-control-sm is-invalid'
        "
      />
    </div>
    <div class="col-3">
      <label for="frmIpmaxDays" class="form-label">Max days to simulate</label>
    </div>
    <div class="col-3">
      <VueNumberInput
        id="frmIpmaxDays"
        :modelValue="metaRun.run.maxDays"
        @update:modelValue="(newValue) => onProperyChanged('maxDays', newValue)"
        :min="0"
        :max="10000"
        :step="1"
        :controls="false"
        :required="true"
        :inputclass="
          !!metaRun.run.maxDays
            ? 'form-control form-control-sm'
            : 'form-control form-control-sm is-invalid'
        "
      />
    </div>
  </div>

  <div class="row">
    <div class="col-3">
      <label for="exampleColorInput" class="form-label">Color picker</label>
    </div>
    <div class="col-3">
      <input
        type="color"
        class="form-control form-control-sm form-control-color"
        id="exampleColorInput"
        :value="metaRun.run.colorCode"
        @input="(event)=>onProperyChanged('colorCode', (event.target as HTMLInputElement).value)"
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
    <label for="validationTextarea" class="form-label">Notes</label>
    <textarea
      class="form-control form-control-sm"
      id="validationTextarea"
      placeholder="optional notes of the run"
      :value="metaRun.run.notes"
      @input="(event)=>onProperyChanged('notes', (event.target as HTMLInputElement).value)"
    ></textarea>
    <div class="invalid-feedback">not used</div>
  </div>

  <div class="mb-3">
    <button class="btn btn-success btn-lg" type="button">run it</button>
  </div>
</template>

<style scoped>
.settings {
  background-color: #3cb054;
  color: #f3f5ee;
  border-top-left-radius: 8px 8px;
  border-top-right-radius: 8px 8px;
}
</style>
