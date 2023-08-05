import { RewardSimulator } from "./RewardSimulator";
import { type IRun } from "@/models/IRun";

export class RewardSecuritySimulator extends RewardSimulator {
  constructor(settings: IRun) {
    super(settings);

    const securityWeights = [...Array(this.RAMP_UP).keys()].map(
      (x) => (x + 0.5) / this.RAMP_UP
    );
    const maxWeight = new Array(this.MAX_DAYS - this.RAMP_UP).fill(1);
    const rampWeights = [...securityWeights, ...maxWeight];
    const chances = 2 ** 32;
    this.probSecs = rampWeights.map((x) => (x * 1.0) / chances);
  }

  public generateDailyProbs(outputSize: number, diff: number): number[] {
    // Here, we can easily absorb the arbitrary "60" constant into the arbitrary overall value of difficulty.
    // If we want to do this with supply, we target the concept of 'outValue' as being a fundamentally supply-dependent variable
    // If we want to do this with blocktime, we should address the difficulty directly as a security parameter.

    const adj = (outputSize * 60.0) / diff;
    // Independent probabilities
    const failDayProbs = this.probSecs.map((x) => (1 - x * adj) ** this.SECDAY);
    const mintDayProbs = failDayProbs.map((x) => 1 - x);

    // Actual probability of mint on day assuming no mints before
    const cumFail = this.cumprod(failDayProbs);

    // Prob of fail up-to now
    // add 1 in front:
    let cumPrevFail = [1, ...cumFail];
    if (cumPrevFail.length > this.MAX_DAYS) {
      //make size max days again
      cumPrevFail = cumPrevFail.slice(0, this.MAX_DAYS);
    }
    let dailyProbs = [...Array(cumPrevFail.length).keys()].map(
      (x) => cumPrevFail[x] * mintDayProbs[x]
    );
    // Add probabilty of final day to represent no successful mints
    const lastElement = cumFail[cumFail.length - 1];
    //length array is MAX_DAYS+1:
    return [...dailyProbs, lastElement];
  }
}
