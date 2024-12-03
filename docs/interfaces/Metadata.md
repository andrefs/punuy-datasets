[**punuy-datasets**](../README.md) • **Docs**

***

[punuy-datasets](../README.md) / Metadata

# Interface: Metadata

## Properties

### authors?

> `optional` **authors**: `string`

The authors of the dataset
Examples:
- "Jane Doe"
- "Jane Doe, John Doe"

#### Defined in

[types.ts:50](https://github.com/andrefs/punuy-datasets/blob/7127f877d1fddfe2bd516b3ea21a76e917743a2f/src/lib/types.ts#L50)

***

### date

> **date**: `string`

The date the dataset was published

@TJS-pattern ^[0-9]{4}(-[0-9]{2}(-[0-9]{2})?)?$

#### Defined in

[types.ts:62](https://github.com/andrefs/punuy-datasets/blob/7127f877d1fddfe2bd516b3ea21a76e917743a2f/src/lib/types.ts#L62)

***

### description

> **description**: `string`

A description of the dataset

#### Defined in

[types.ts:67](https://github.com/andrefs/punuy-datasets/blob/7127f877d1fddfe2bd516b3ea21a76e917743a2f/src/lib/types.ts#L67)

***

### domain

> **domain**: [`Domain`](../type-aliases/Domain.md)

The domain of the dataset

#### Defined in

[types.ts:85](https://github.com/andrefs/punuy-datasets/blob/7127f877d1fddfe2bd516b3ea21a76e917743a2f/src/lib/types.ts#L85)

***

### downloadUrls

> **downloadUrls**: `string`[]

URL(s) to download the dataset files

#### Items

#### Defined in

[types.ts:74](https://github.com/andrefs/punuy-datasets/blob/7127f877d1fddfe2bd516b3ea21a76e917743a2f/src/lib/types.ts#L74)

***

### languages

> **languages**: [`Language`](../type-aliases/Language.md)[]

The languages used in the dataset

#### Defined in

[types.ts:79](https://github.com/andrefs/punuy-datasets/blob/7127f877d1fddfe2bd516b3ea21a76e917743a2f/src/lib/types.ts#L79)

***

### license?

> `optional` **license**: [`License`](License.md)

The license of the dataset

#### Defined in

[types.ts:103](https://github.com/andrefs/punuy-datasets/blob/7127f877d1fddfe2bd516b3ea21a76e917743a2f/src/lib/types.ts#L103)

***

### name

> **name**: `string`

The name of the dataset

#### Defined in

[types.ts:35](https://github.com/andrefs/punuy-datasets/blob/7127f877d1fddfe2bd516b3ea21a76e917743a2f/src/lib/types.ts#L35)

***

### papers

> **papers**: [`Paper`](Paper.md)[]

Information about the scientific papers describing the dataset

#### Defined in

[types.ts:55](https://github.com/andrefs/punuy-datasets/blob/7127f877d1fddfe2bd516b3ea21a76e917743a2f/src/lib/types.ts#L55)

***

### relationTypes

> **relationTypes**: [`RelationType`](../type-aliases/RelationType.md)[]

Which type of semantic relations are used to compare the words

#### Defined in

[types.ts:90](https://github.com/andrefs/punuy-datasets/blob/7127f877d1fddfe2bd516b3ea21a76e917743a2f/src/lib/types.ts#L90)

***

### tags?

> `optional` **tags**: `string`[]

Tags for the dataset content
Examples:
- mturk - the dataset was created using crowdsourcing (e.g. Amazon Mechanical Turk or CrowdFlower)
- entities - the dataset contains entities (e.g. people, places, organizations)

#### Defined in

[types.ts:98](https://github.com/andrefs/punuy-datasets/blob/7127f877d1fddfe2bd516b3ea21a76e917743a2f/src/lib/types.ts#L98)

***

### urls

> **urls**: `string`[]

Web sites containing information about the dataset

#### Items

#### Defined in

[types.ts:42](https://github.com/andrefs/punuy-datasets/blob/7127f877d1fddfe2bd516b3ea21a76e917743a2f/src/lib/types.ts#L42)

***

### version?

> `optional` **version**: `string`

The version of the dataset

#### Example

```ts
"1.0"
```

#### Defined in

[types.ts:109](https://github.com/andrefs/punuy-datasets/blob/7127f877d1fddfe2bd516b3ea21a76e917743a2f/src/lib/types.ts#L109)
