[**punuy-datasets**](../README.md)

***

[punuy-datasets](../README.md) / PartitionMetrics

# Type Alias: PartitionMetrics

> **PartitionMetrics**: `object`

Defined in: [types.ts:295](https://github.com/andrefs/punuy-datasets/blob/850c8b8821307795ffd38b3231bd396eabb0ce41/src/lib/types.ts#L295)

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
