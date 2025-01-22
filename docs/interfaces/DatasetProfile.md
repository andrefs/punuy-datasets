[**punuy-datasets**](../README.md)

***

[punuy-datasets](../README.md) / DatasetProfile

# Interface: DatasetProfile

Defined in: [types.ts:7](https://github.com/andrefs/punuy-datasets/blob/d9642017daa92ac0fd9bc66f1d11c04481d5eb08/src/lib/types.ts#L7)

## Properties

### id

> **id**: `string`

Defined in: [types.ts:13](https://github.com/andrefs/punuy-datasets/blob/d9642017daa92ac0fd9bc66f1d11c04481d5eb08/src/lib/types.ts#L13)

An identifier for the dataset

#### Min Length

3

***

### metadata

> **metadata**: [`Metadata`](Metadata.md)

Defined in: [types.ts:18](https://github.com/andrefs/punuy-datasets/blob/d9642017daa92ac0fd9bc66f1d11c04481d5eb08/src/lib/types.ts#L18)

Metadata for the dataset

***

### originalInstructions?

> `optional` **originalInstructions**: `string`

Defined in: [types.ts:23](https://github.com/andrefs/punuy-datasets/blob/d9642017daa92ac0fd9bc66f1d11c04481d5eb08/src/lib/types.ts#L23)

The original instructions given to the annotators

***

### partitions

> **partitions**: [`Partition`](Partition.md)[]

Defined in: [types.ts:28](https://github.com/andrefs/punuy-datasets/blob/d9642017daa92ac0fd9bc66f1d11c04481d5eb08/src/lib/types.ts#L28)

The partitions containing the dataset data
