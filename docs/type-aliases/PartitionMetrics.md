[**punuy-datasets**](../README.md) • **Docs**

***

[punuy-datasets](../README.md) / PartitionMetrics

# Type Alias: PartitionMetrics

> **PartitionMetrics**: `object`

## Type declaration

### annotators

> **annotators**: `object`

The number of annotators

### annotators.fixedColumns?

> `optional` **fixedColumns**: `boolean`

Whether each column in .values corresponds to a single annotator

### annotators.minEachPair

> **minEachPair**: `number` \| `null`

The minimum number of annotators for each pair

### annotators.total

> **total**: `number` \| `null`

The total number of annotators

### interAgreement

> **interAgreement**: `object`

Inter annotator agreement metrics

### interAgreement.pearson

> **pearson**: `number` \| `null`

Pearson correlation coefficient between annotators

### interAgreement.spearman

> **spearman**: `number` \| `null`

Spearman correlation coefficient between annotators

### intraAgreement?

> `optional` **intraAgreement**: `object`

Intra annotator agreement metrics

### intraAgreement.pearson

> **pearson**: `number` \| `null`

Pearson correlation coefficient between annotators

### intraAgreement.spearman

> **spearman**: `number` \| `null`

Spearman correlation coefficient between annotators

## Defined in

[types.ts:211](https://github.com/andrefs/punuy-datasets/blob/32d3bc968edca6eb57e6fff50a66cdfb284c9b9f/src/lib/types.ts#L211)
