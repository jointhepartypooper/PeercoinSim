export interface IModelSimulator {
    //return two arrays, first being the x-axis then y-axis
    getXYResults(progressCallback: (progress: number) => void): number[][];
  }