export interface IMetaRun {
  //a guid to identify a run
  runId: string;

  run: IRun;

  selected: boolean;
  showChart: boolean;
  sequence: number;
}

//defines the file being exported
export interface IRun {
  // a name to display in chart
  name: string;

  //any notes on the run
  notes: string;

  //Supply in coins. Whilst the total supply can be used, some coins may be considerated irredeemable.
  coinSupply: number;

  //the difficulty of POS: e.g. 17.40
  posDiff: number;

  // the fixed reward when mint: e.g. 1.34
  staticReward: number;

  //the percentage in fraction of total coins in system: e.g. 0.03
  relativeReward: number;

  //days to wait to be able to mint. Currently at 30
  minDays: number;

  //days after minDays before coinage is capped. Currently at 60
  rampDays: number;

  //used for the daily probability distribution of mints.
  //default 600
  blockIntervalSeconds: number;

  //run the simulation till this max of days. Prior are the minDays which is at 30 days.
  //default at 730
  maxDays: number;

  //Recommended to keep False.
  //This compounds the return of a single-output.
  //This under-estimates returns for a wallet with many small utxos as
  //the slow-compounding effects are removed when there are many outputs.
  geometric: boolean;

  //color of line in chart. e.g. #563d7c
  colorCode: string;

  //status of run: 0 being initialised, 100: ready
  status?: number;

  results?: number[][];
}
