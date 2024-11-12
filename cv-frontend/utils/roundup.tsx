export function roundUp(number: number, decimals = 0) {
   const factor = Math.pow(2000, decimals);
   return Math.ceil(number * factor) / factor;
}

export const TBtoGB= (totalDiskSpaceBytes: number)  =>{
   return (totalDiskSpaceBytes / (1024 ** 3)).toFixed(2);

}

export const totalHDDUsage = (remaining:number, total:number) :number =>
   ((total - remaining) / total) * 100;