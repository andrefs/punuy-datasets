[**punuy-datasets**](../README.md)

***

[punuy-datasets](../README.md) / Metadata

# Interface: Metadata

Defined in: [types.ts:31](https://github.com/andrefs/punuy-datasets/blob/6011a8fdf7a1327e3552464eff1eb4fa6c957091/src/lib/types.ts#L31)

## Properties

### authors?

> `optional` **authors**: `string`

Defined in: [types.ts:50](https://github.com/andrefs/punuy-datasets/blob/6011a8fdf7a1327e3552464eff1eb4fa6c957091/src/lib/types.ts#L50)

The authors of the dataset
Examples:
- "Jane Doe"
- "Jane Doe, John Doe"

***

### date

> **date**: `string`

Defined in: [types.ts:62](https://github.com/andrefs/punuy-datasets/blob/6011a8fdf7a1327e3552464eff1eb4fa6c957091/src/lib/types.ts#L62)

The date the dataset was published

@TJS-pattern ^[0-9]{4}(-[0-9]{2}(-[0-9]{2})?)?$

***

### description

> **description**: `string`

Defined in: [types.ts:74](https://github.com/andrefs/punuy-datasets/blob/6011a8fdf7a1327e3552464eff1eb4fa6c957091/src/lib/types.ts#L74)

A description of the dataset

***

### doi?

> `optional` **doi**: `string`

Defined in: [types.ts:69](https://github.com/andrefs/punuy-datasets/blob/6011a8fdf7a1327e3552464eff1eb4fa6c957091/src/lib/types.ts#L69)

The DOI of the dataset

@TJS-pattern ^10\.[0-9]{4,}/.+$

***

### domain

> **domain**: [`Domain`](../type-aliases/Domain.md)

Defined in: [types.ts:92](https://github.com/andrefs/punuy-datasets/blob/6011a8fdf7a1327e3552464eff1eb4fa6c957091/src/lib/types.ts#L92)

The domain of the dataset

***

### downloadUrls

> **downloadUrls**: `string`[]

Defined in: [types.ts:81](https://github.com/andrefs/punuy-datasets/blob/6011a8fdf7a1327e3552464eff1eb4fa6c957091/src/lib/types.ts#L81)

URL(s) to download the dataset files

#### Items

***

### languages

> **languages**: [`Language`](../type-aliases/Language.md)[]

Defined in: [types.ts:86](https://github.com/andrefs/punuy-datasets/blob/6011a8fdf7a1327e3552464eff1eb4fa6c957091/src/lib/types.ts#L86)

The languages used in the dataset

***

### license?

> `optional` **license**: [`License`](License.md)

Defined in: [types.ts:110](https://github.com/andrefs/punuy-datasets/blob/6011a8fdf7a1327e3552464eff1eb4fa6c957091/src/lib/types.ts#L110)

The license of the dataset

***

### name

> **name**: `string`

Defined in: [types.ts:35](https://github.com/andrefs/punuy-datasets/blob/6011a8fdf7a1327e3552464eff1eb4fa6c957091/src/lib/types.ts#L35)

The name of the dataset

***

### papers

> **papers**: [`Paper`](Paper.md)[]

Defined in: [types.ts:55](https://github.com/andrefs/punuy-datasets/blob/6011a8fdf7a1327e3552464eff1eb4fa6c957091/src/lib/types.ts#L55)

Information about the scientific papers describing the dataset

***

### relationTypes

> **relationTypes**: [`RelationType`](../type-aliases/RelationType.md)[]

Defined in: [types.ts:97](https://github.com/andrefs/punuy-datasets/blob/6011a8fdf7a1327e3552464eff1eb4fa6c957091/src/lib/types.ts#L97)

Which type of semantic relations are used to compare the words

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:105](https://github.com/andrefs/punuy-datasets/blob/6011a8fdf7a1327e3552464eff1eb4fa6c957091/src/lib/types.ts#L105)

Tags for the dataset content
Examples:
- mturk - the dataset was created using crowdsourcing (e.g. Amazon Mechanical Turk or CrowdFlower)
- entities - the dataset contains entities (e.g. people, places, organizations)

***

### urls

> **urls**: `string`[]

Defined in: [types.ts:42](https://github.com/andrefs/punuy-datasets/blob/6011a8fdf7a1327e3552464eff1eb4fa6c957091/src/lib/types.ts#L42)

Web sites containing information about the dataset

#### Items

***

### version?

> `optional` **version**: `string`

Defined in: [types.ts:116](https://github.com/andrefs/punuy-datasets/blob/6011a8fdf7a1327e3552464eff1eb4fa6c957091/src/lib/types.ts#L116)

The version of the dataset

#### Example

```ts
"1.0"
```
