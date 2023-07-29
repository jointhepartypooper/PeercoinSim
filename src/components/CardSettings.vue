<script setup lang="ts">
import { computed, nextTick, ref, type PropType } from "vue";
import { type IRun, type IMetaRun } from "../models/IRun";
import VueNumberInput from "../components/VueNumberInput.vue";
import FileReader from "../components/FileReader.vue";
import CheckboxToggle from "../components/CheckboxToggle.vue";
import { type IModelSimulator } from "../components/IModelSimulator";
import { RewardSimulator } from "../components/RewardSimulator";
import { useToast } from "vue-toastification";
const toast = useToast();
const emit = defineEmits<{
  (e: "update-card", card: IMetaRun): void;
  (e: "toggle-chart", id: string, newValue: boolean): void;
}>();
const props = defineProps({
  metaRun: {
    type: Object as PropType<IMetaRun>,
    required: true,
  },
});
const isrunning = ref<boolean>(false);
const readyForAction = computed<boolean>(() => {
  return (
    !isrunning.value &&
    (!props.metaRun.run.status || props.metaRun.run.status < 100)
  );
});

function doRun(): void {
  if (isrunning.value) return;
  isrunning.value = true;

  try {
    let startTime = Date.now() - 3000;
    const updateProgress = (progress: number) => {
      let endTime = Date.now();

      if (endTime - startTime > 2000) {
        startTime = Date.now();
        onProperyChanged([{ field: "status", newvalue: progress }]);
      }
    };
    updateProgress(0);

    nextTick(() => {
      const sim = new RewardSimulator(props.metaRun.run) as IModelSimulator;

      const results = sim.getXYResults(updateProgress);

      if (results.length === 3) {
        const rewardForSizes = results[1];
        const mintsForSizes = results[2];
        const maxMint = Math.max(...mintsForSizes);
        const optimalUTXOSize = results[0][argMax(rewardForSizes)];

        const blockLoss =
          -1.0 * (1 - mintsForSizes[argMax(rewardForSizes)] / maxMint) * 100;
        onProperyChanged([
          { field: "status", newvalue: 100 },
          { field: "results", newvalue: results },
          { field: "optimalUTXOSize", newvalue: optimalUTXOSize },
          { field: "blocksLostAtOptimum", newvalue: blockLoss },
        ]);
      }
      isrunning.value = false;
    });
  } catch (error) {}
}

function argMax(arr: number[]): number {
  return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

function onProperyChanged(items: { field: string; newvalue: any }[]) {
  const copy = JSON.parse(JSON.stringify(props.metaRun));
  items.forEach((element) => {
    copy.run[element.field] = element.newvalue;
  });

  emit("update-card", copy);
}
// Validate this value with a custom type guard (extend to your needs)
function isRunType(o: any): o is IRun {
  return (
    "name" in o &&
    "posDiff" in o &&
    "staticReward" in o &&
    "relativeReward" in o &&
    "minDays" in o &&
    "rampDays" in o &&
    "blockIntervalSeconds" in o &&
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
        @update:modelValue="(newValue:string) => onProperyChanged([{field:'name', newvalue: newValue}])"
      />
    </div>
    <div class="col-3">
      <label for="frmIpDiff" class="form-label">Pos difficulty</label>
    </div>
    <div class="col-3">
      <VueNumberInput
        id="frmIpDiff"
        :disabled="!readyForAction"
        :modelValue="metaRun.run.posDiff"
        @update:modelValue="
          (newValue) =>
            onProperyChanged([{ field: 'posDiff', newvalue: newValue }])
        "
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
        :disabled="!readyForAction"
        :modelValue="metaRun.run.staticReward"
        @update:modelValue="
          (newValue) =>
            onProperyChanged([{ field: 'staticReward', newvalue: newValue }])
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
        >Fraction reward</label
      >
    </div>
    <div class="col-3">
      <VueNumberInput
        id="frmIpfractionReward"
        :disabled="!readyForAction"
        :modelValue="metaRun.run.relativeReward"
        @update:modelValue="
          (newValue) =>
            onProperyChanged([{ field: 'relativeReward', newvalue: newValue }])
        "
        :min="0"
        :max="1"
        :step="0.001"
        :controls="false"
        :required="true"
        :inputclass="
          metaRun.run.relativeReward !== undefined &&
          metaRun.run.relativeReward >= 0
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
        :disabled="!readyForAction"
        :modelValue="metaRun.run.minDays"
        @update:modelValue="
          (newValue) =>
            onProperyChanged([{ field: 'minDays', newvalue: newValue }])
        "
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
        :disabled="!readyForAction"
        :modelValue="metaRun.run.rampDays"
        @update:modelValue="
          (newValue) =>
            onProperyChanged([{ field: 'rampDays', newvalue: newValue }])
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
      <label for="frmIpsampleSize" class="form-label">Block target</label>
    </div>
    <div class="col-3">
      <VueNumberInput
        :disabled="true"
        id="frmIpsampleSize"
        :modelValue="metaRun.run.blockIntervalSeconds"
        @update:modelValue="
          (newValue) =>
            onProperyChanged([
              { field: 'blockIntervalSeconds', newvalue: newValue },
            ])
        "
        :min="0"
        :max="10000"
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
        :disabled="!readyForAction"
        :modelValue="metaRun.run.maxDays"
        @update:modelValue="
          (newValue) =>
            onProperyChanged([{ field: 'maxDays', newvalue: newValue }])
        "
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
      <label for="frmIpcoinSupply" class="form-label">Coins supply</label>
    </div>
    <div class="col-3">
      <VueNumberInput
        :disabled="true"
        id="frmIpcoinSupply"
        :modelValue="metaRun.run.coinSupply"
        @update:modelValue="
          (newValue) =>
            onProperyChanged([{ field: 'coinSupply', newvalue: newValue }])
        "
        :min="10000"
        :max="100000000"
        :step="1000"
        :controls="false"
        :required="true"
        :inputclass="
          !!metaRun.run.coinSupply
            ? 'form-control form-control-sm'
            : 'form-control form-control-sm is-invalid'
        "
      />
    </div>
    <div class="col-3">Show in chart</div>
    <div class="col-3">
      <CheckboxToggle
        :modelValue="metaRun.showChart"
        :show-labels="false"
        label-checked="Show in chart"
        label-unchecked=""
        @update:model-value="
          emit('toggle-chart', metaRun.runId, !metaRun.showChart)
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
        @input="(event)=>onProperyChanged([{field:'colorCode', newvalue: (event.target as HTMLInputElement).value}])"
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
      @input="(event)=>onProperyChanged([{field:'notes', newvalue:(event.target as HTMLInputElement).value}])"
    ></textarea>
    <div class="invalid-feedback">not used</div>
  </div>

  <div class="row my-2">
    <div class="col-3">Blocks lost at optimum</div>
    <div class="col-3">
      {{ metaRun.run.blocksLostAtOptimum }}
    </div>
    <div class="col-3">Optimal UTXO Size</div>
    <div class="col-3">
      {{ metaRun.run.optimalUTXOSize }}
    </div>
  </div>

  <div class="mb-3">
    <button
      class="btn btn-success btn-lg"
      :disabled="!readyForAction"
      type="button"
      @click="doRun"
    >
      Run
    </button>
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
