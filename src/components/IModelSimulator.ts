export interface IModelSimulator {
    //return two arrays, first being the x-axis then y-axis
    getXYResults(progressCallback: (progress: number) => void): number[][];
    
    //returns 3 array for a double y-axis
    getXYYResults(
      progressCallback: (progress: number) => void
    ): number[][][] 
  }