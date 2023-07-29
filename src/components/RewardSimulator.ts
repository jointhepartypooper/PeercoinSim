import {type IModelSimulator} from "../components/IModelSimulator"

export class RewardSimulator implements IModelSimulator {
  private SECDAY: number = 60 * 60 * 24;
  private DAYYEAR = (365 * 33 + 8) / 33;
  private halfDay: number = 0.5;

  private DIFF: number;
  private STATIC_REWARD: number;
  private BLOCK_INTERVAL_SECS: number;//not used yet
  private RELATIVE_REWARD: number;
  private MAX_DAYS: number;
  private MIN_PROB_DAYS: number; //not used yet
  private NO_MINT_DAY: number;
  private SUPPLY: number;//not used yet
  private RAMP_UP: number;
  private DAYS: number[];
  private DAYS_WITH_NO_MINT: number[];
  private probSecs: number[];
  private sizes: number[];
  private geometric: boolean;
  //todo construct with object:
  constructor(
    posDiff: number,
    staticReward: number,
    blockIntervalSeconds: number,
    relativeReward: number,
    maxDays: number,
    minDays: number,
    coinSupply: number,
    rampUp: number,
    geometric: boolean
  ) {
    this.DIFF = posDiff;
    this.STATIC_REWARD = staticReward;
    this.BLOCK_INTERVAL_SECS = blockIntervalSeconds;
    this.RELATIVE_REWARD = relativeReward;
    this.MAX_DAYS = maxDays;
    this.MIN_PROB_DAYS = minDays;
    this.NO_MINT_DAY = maxDays + minDays;
    this.SUPPLY = coinSupply;
    this.RAMP_UP = rampUp;
    this.geometric = geometric;
    //prefill ouput sizes:
    this.sizes = [...Array(501).keys()].map((x) => 10 ** (x / 125));
    const rangeDays = [...Array(maxDays).keys()];
    this.DAYS = rangeDays.map((x) => minDays + x + this.halfDay);
    this.DAYS_WITH_NO_MINT = [...this.DAYS, this.NO_MINT_DAY];

    // Max weight is the ramp up or assume a constant half day if no ramp up
    const maxDayWeight =
      1.0 * (this.RAMP_UP > 0 ? this.RAMP_UP : this.RAMP_UP + this.halfDay);

    // Offset by 0.5 to assume middle of day
    const dayWeights = rangeDays
      .map((x) => x + 0.5)
      .map((x) => (x < 0 ? 0 : x > maxDayWeight ? maxDayWeight : x));

    // 60/maxDayWeight normalises so that the end probability is always the same
    const normalisedMaxDayweight = 60.0 / maxDayWeight;
    // Calculate daily probability distribution
    const chances = 2 ** 32;
    this.probSecs = dayWeights.map(
      (x) => (x * normalisedMaxDayweight * 1.0) / chances
    );
  }

  //implementens general interface: calulate avg rewards for sizes
  public getXYResults(progressCallback: (progress: number) => void): number[][] {
    let results = [];
    for (let index = 0; index < this.sizes.length; index++) {
      if (!!progressCallback) {
        const progress = (1.0 * index) / this.sizes.length;
        if (progress % 5 === 0) progressCallback(progress);
      }
      const x = this.sizes[index];
      results.push(
        this.averageReward(x, this.DIFF, this.STATIC_REWARD, this.geometric)
      );
    }

    if (!!progressCallback) progressCallback(100);
    return [[...this.sizes], results];
  }

  public averageReward(
    outputSize: number,
    diff: number,
    staticReward: number,
    geometric: boolean
  ): number {
    const probs = this.generateDailyProbs(outputSize, diff);
    const rewards = this.dailyRewards(outputSize, staticReward);
    const weightedTime = [...Array(probs.length).keys()]
      .map((x) => this.DAYS_WITH_NO_MINT[x] * probs[x])
      .reduce((a, b) => a + b, 0);

    /*
    if geometric:
        returns = 1+rewards/outValue
        weightedReturn = (returns**probs).prod()
        return (weightedReturn**(DAYYEAR/weightedTime) - 1) * 100
*/

    // Arithmetic
    const returns = rewards.map((x) => (1.0 * x) / outputSize);
    const weightedReturn = [...Array(returns.length).keys()]
      .map((x) => returns[x] * probs[x])
      .reduce((a, b) => a + b, 0);
    return weightedReturn * ((1.0 * this.DAYYEAR) / weightedTime) * 100;
  }

  public generateDailyProbs(outputSize: number, diff: number): number[] {
    const adj = (outputSize * 1.0) / diff;
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

  // Calculate Geometric average of rewards weighted by probabilities
  public dailyRewards(outputSize: number, staticReward: number): number[] {
    const mintRewards = this.DAYS.map(
      (x) =>
        (1.0 * outputSize * this.RELATIVE_REWARD * Math.min(365, x)) /
          this.DAYYEAR +
        staticReward
    );
    const includingFailed = [...mintRewards, 0];
    return includingFailed;
  }

  // public toXYCoords(y: number[]): number[][] {
  //   const coordinates = [] as number[][];
  //   for (let i = 0; i < this.DAYS_WITH_NO_MINT.length; i++) {
  //     coordinates.push([this.DAYS_WITH_NO_MINT[i], y[i]]);
  //   }
  //   return coordinates;
  // }

  cumprod(arr: number[]): number[] {
    const cummulative = [];
    let cumx = 1;
    for (let i = 0; i < arr.length; i++) {
      cumx = cumx * arr[i];
      cummulative.push(cumx);
    }
    return cummulative;
  }

  cumsum(arr: number[]): number[] {
    const cum = [];
    let cumx = 0;
    for (let i = 0; i < arr.length; i++) {
      cumx = cumx + arr[i];
      cum.push(cumx);
    }
    return cum;
  }
}
