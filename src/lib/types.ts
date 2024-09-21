export type LazyPartition = Omit<Partition, "data">;

export type LazyDataset = Omit<DatasetProfile, "partitions"> & {
  partitions: LazyPartition[];
};

export interface DatasetProfile {
  /**
   * An identifier for the dataset
   *
   * @minLength 3
   */
  id: string;

  /**
   * Metadata for the dataset
   */
  metadata: Metadata;

  /**
   * The original instructions given to the annotators
   */
  originalInstructions?: string;

  /**
   * The partitions containing the dataset data
   */
  partitions: Partition[];
}

export interface Metadata {
  /**
   * The name of the dataset
   */
  name: string;

  /**
   * Web sites containing information about the dataset
   *
   * @items {"type": "string", "format": "uri"}
   */
  urls: string[];

  /**
   * The authors of the dataset
   * Examples:
   * - "Jane Doe"
   * - "Jane Doe, John Doe"
   */
  authors?: string;

  /**
   * Information about the scientific papers describing the dataset
   */
  papers: Paper[];

  /**
   * The date the dataset was published
   *
   * @TJS-pattern ^[0-9]{4}(-[0-9]{2}(-[0-9]{2})?)?$
   */
  date: string;

  /**
   * A description of the dataset
   */
  description: string;

  /**
   * URL(s) to download the dataset files
   *
   * @items {"type": "string", "format": "uri"}
   */
  downloadUrls: string[];

  /**
   * The languages used in the dataset
   */
  languages: ("en" | "pt")[];

  /**
   * The domain of the dataset
   */

  domain: "general" | "geographical" | "biomedical";

  /**
   * Which type of measures are used to compare the words
   */
  measureTypes: MeasureType[];

  /**
   * Tags for the dataset content
   * Examples:
   * - mturk - the dataset was created using crowdsourcing (e.g. Amazon Mechanical Turk or CrowdFlower)
   * - entities - the dataset contains entities (e.g. people, places, organizations)
   */
  tags?: string[];

  /**
   * The license of the dataset
   */
  license?: License;

  /**
   * The version of the dataset
   * @example "1.0"
   */
  version?: string;
}

export interface License {
  /**
   * The name of the license
   */
  name: string;

  /**
   * The URL of the license
   *
   * @format uri
   */
  url: string;

  /**
   * Whether the dataset can be redistributed
   * @example false
   */
  cannotRedistribute?: boolean;
}

export type MeasureType = "similarity" | "relatedness";

export interface Paper {
  /**
   * The title of the paper
   */
  title: string;

  /**
   * The URL where the paper can be found
   *
   * @format uri
   */
  url?: string;
}

export interface Partition {
  /**
   * An identifier for the partition
   */
  id: string;

  /**
   * Which type of measure is used to compare the words
   */
  measureType: MeasureType;

  /**
   * The scale of the semantic measure values
   */
  scale: PartitionScale;

  /**
   * The data for the partition
   */
  data: PartitionDataArray;

  /**
   * Evaluation metrics for the partition
   */
  metrics: PartitionMetrics;
}

export type PartitionScale = {
  /**
   * The scale for the .value property
   */
  value: {
    /**
     * The minimum value of the scale
     */
    min: number;

    /**
     * The maximum value of the scale
     * @minimum 1
     */
    max: number;
  };

  /**
   * The scale for the .values property (if different from the .value scale)
   */
  values?: {
    /**
     * The minimum value of the scale
     */
    min: number;

    /**
     * The maximum value of the scale
     * @minimum 1
     */
    max: number;
  };
};

export type PartitionMetrics = {
  /**
   * The number of annotators
   */
  annotators: {
    /**
     * The total number of annotators
     */
    total: number | null;

    /**
     * The minimum number of annotators for each pair
     */
    minEachPair: number | null;

    /**
     * Whether each column in .values corresponds to a single annotator
     */
    fixedColumns?: boolean;
  };

  /**
   * Inter annotator agreement metrics
   */
  interAgreement: {
    /**
     * Spearman correlation coefficient between annotators
     */
    spearman: number | null;

    /**
     * Pearson correlation coefficient between annotators
     */
    pearson: number | null;
  };

  /**
   * Intra annotator agreement metrics
   */
  intraAgreement?: {
    /**
     * Spearman correlation coefficient between annotators
     */
    spearman: number | null;

    /**
     * Pearson correlation coefficient between annotators
     */
    pearson: number | null;
  };
};

export type PartitionDataArray = PartitionData[];

export type PartitionData = {
  /**
   * The first word in the pair
   */
  term1: string;

  /**
   * The second word in the pair
   */
  term2: string;
} & (
  | {
      /**
       * The averaged numeric value of the semantic measure for the pair
       */
      value: number;

      /**
       * The standard deviation of the numeric values of the semantic measure for the pair
       */
      stddev?: number;

      /**
       * The individual numeric values of the semantic measure for the pair
       *
       * @items {"type": "number"}
       */
      values?: (number | null)[];
    }
  | {
      /**
       * The averaged numeric value of the semantic measure for the pair
       */
      value?: number;

      /**
       * The individual numeric values of the semantic measure for the pair
       *
       * @items {"type": "number"}
       */
      values: number[];
    }
);
