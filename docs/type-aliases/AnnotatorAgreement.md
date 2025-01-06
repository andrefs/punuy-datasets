[**punuy-datasets**](../README.md)

***

[punuy-datasets](../README.md) / AnnotatorAgreement

# Type Alias: AnnotatorAgreement

> **AnnotatorAgreement**: `object`

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

## Defined in

[types.ts:221](https://github.com/andrefs/punuy-datasets/blob/bf77d365972562cc283d62d784414ffd2f200fea/src/lib/types.ts#L221)
