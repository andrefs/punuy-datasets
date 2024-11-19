import { Partition, PartitionData } from "./types";
export declare function fixPartData(part: PartitionData, options?: LazyPartitionOptions): PartitionData;
interface LazyPartitionOptions {
    trim?: boolean;
    replaceUTF8Quotes?: boolean;
    noUnderScores?: boolean;
    replaceUTF8Dashes?: boolean;
}
export declare function lazyPartition(part: Omit<Partition, "data">, path: string, options?: LazyPartitionOptions): Partition;
export {};
