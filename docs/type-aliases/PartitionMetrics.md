[**punuy-datasets**](../README.md)

***

[punuy-datasets](../README.md) / PartitionMetrics

# Type Alias: PartitionMetrics

> **PartitionMetrics**: `object`

## Type declaration

### annotators

> **annotators**: `object`

The number of annotators

#### annotators.fixedColumns?

> `optional` **fixedColumns**: `boolean`

Whether each column in .values corresponds to a single annotator

#### annotators.minEachPair

> **minEachPair**: `number` \| `null`

The minimum number of annotators for each pair

#### annotators.total

> **total**: `number` \| `null`

The total number of annotators

### interAnnoAgreement

> **interAnnoAgreement**: [`AnnotatorAgreement`](AnnotatorAgreement.md)[]

Inter annotator agreement metrics

### intraAnnoAgreement?

> `optional` **intraAnnoAgreement**: [`AnnotatorAgreement`](AnnotatorAgreement.md)[]

Intra annotator agreement metrics

## Defined in

[types.ts:247](https://github.com/andrefs/punuy-datasets/blob/b08045a9811ad822717879eafee2ca340e33dd7d/src/lib/types.ts#L247)
