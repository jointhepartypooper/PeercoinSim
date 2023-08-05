import { type IModelSimulator } from "../components/IModelSimulator";
import { RewardSecuritySimulator } from "../components/RewardSecuritySimulator";
import { type IRun } from "@/models/IRun";

export class RewardSimulatorFactory {
  //todo provide params
  static createSimulator(settings: IRun): IModelSimulator {
    return new RewardSecuritySimulator(settings);
  }
}
