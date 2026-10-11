[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/portfolio/related/data](../README.md) / fetchData

```ts
function fetchData(host): void;
```

Defined in: website/components/portfolio/related/data.ts:32

Fires two SWR reads in parallel: the home page node (for the
portfoliolist used as the image/description join table) and the
components/related node (title, path, socials, project pointers).
A store hit resolves instantly; a miss round-trips Firebase.

## Parameters

### host

[`PortfolioRelated`](../../../Related/classes/PortfolioRelated.md)

## Returns

`void`
