[**punuy-datasets**](../README.md) • **Docs**

***

[punuy-datasets](../README.md) / AnnotatorAgreement

# Type Alias: AnnotatorAgreement

> **AnnotatorAgreement**: `object`

## Type declaration

### description?

> `optional` **description**: `string`

A description of how the value is calculated, preferably quoted from the paper

### method

> **method**: `"spearman"` \| `"pearson"`

The method used to calculate the correlation coefficient: Pearson's or Spearman's

### metric

> **metric**: `"APIAA"` \| `"AMIAA"` \| `"CBRGM"` \| `"other"` \| `"unclear"`

How the value was calculated:
- APIAA: Average Pairwise Inter-Annotator Agreement
- AMIAA: Average Mean Inter-Annotator Agreement
- CBRGM: Correlation Between Randomized Group Means
- other: another method
- unclear: the method was not described in the paper

### value

> **value**: `number`

The value of the correlation coefficient

## Defined in

[types.ts:211](https://github.com/andrefs/punuy-datasets/blob/d28aa2ccdf77990629d2675521bf766facc13e9c/src/lib/types.ts#L211)
