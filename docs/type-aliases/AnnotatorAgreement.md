[**punuy-datasets**](../README.md)

***

[punuy-datasets](../README.md) / AnnotatorAgreement

# Type Alias: AnnotatorAgreement

> **AnnotatorAgreement**: `object`

Defined in: [types.ts:221](https://github.com/andrefs/punuy-datasets/blob/e2878b34860b0a74e0741e9a0329cfcec849fb6e/src/lib/types.ts#L221)

## Type declaration

### description?

> `optional` **description**: `string`

A description of how the value is calculated, preferably quoted from the paper

### method

> **method**: `"APIAA"` \| `"AMIAA"` \| `"ARRGMA"` \| `"other"` \| `"unclear"`

How the value was calculated:
- APIAA: Average Pairwise Inter-Annotator Agreement
- AMIAA: Average Mean Inter-Annotator Agreement
- ARRGMA: Average Repeated Randomized Group Means Agreement
- other: another method
- unclear: the method was not described in the paper

### metric

> **metric**: `"spearman"` \| `"pearson"`

The method used to calculate the correlation coefficient: Pearson's or Spearman's

### value

> **value**: `number`

The value of the correlation coefficient
