# Civic Substrate County Snapshot API

## Purpose

This contract defines the data shape PolitíCat needs for county-level Community Snapshot pages.

The goal is not to make every field look complete on day one. The goal is to make every field honest:

```text
Verified value
  -> display the value with source/date

Missing verified feed
  -> display "Awaiting Civic Substrate" with the expected source
```

PolitíCat should show no number it cannot source.

## Recommended Endpoint

```http
GET /api/civic/counties/{countySlug}/snapshot
```

Example:

```http
GET /api/civic/counties/sandoval/snapshot
```

## County Keying

Use both slug and FIPS. The slug is human-readable for routing. FIPS is the stable machine key for joins.

```json
{
  "name": "Sandoval",
  "slug": "sandoval",
  "state": "NM",
  "fips": "35043"
}
```

## Datum Contract

Every snapshot field must use the same object shape.

```json
{
  "value": 148834,
  "display": "148,834",
  "source": "U.S. Census Bureau (2020 Decennial)",
  "source_url": "https://www.census.gov/",
  "as_of": "2020",
  "status": "verified",
  "notes": null
}
```

Allowed `status` values:

| Status | Meaning | UI Treatment |
| --- | --- | --- |
| `verified` | Value is available and source-backed. | Solid cell. |
| `pending` | Civic Substrate knows which feed should fill it, but the feed is not loaded yet. | Dashed cell with `Awaiting Civic Substrate`. |
| `unavailable` | Source exists, but no value is available for this county or field. | Muted cell with `Unavailable`. |
| `stale` | Value exists, but its source date is older than the accepted freshness window. | Warning cell with source/date visible. |
| `error` | Retrieval failed. | Error cell; do not show old/fallback value unless marked `stale`. |

## Response Shape

```json
{
  "county": {
    "name": "Sandoval",
    "slug": "sandoval",
    "state": "NM",
    "fips": "35043"
  },
  "snapshot": {
    "population": {
      "value": 148834,
      "display": "148,834",
      "source": "U.S. Census Bureau (2020 Decennial)",
      "source_url": "https://www.census.gov/",
      "as_of": "2020",
      "status": "verified",
      "notes": null
    },
    "county_seat": {
      "value": "Bernalillo",
      "display": "Bernalillo",
      "source": "NM public record",
      "source_url": null,
      "as_of": "current",
      "status": "verified",
      "notes": null
    },
    "founded": {
      "value": "1903",
      "display": "1903",
      "source": "NM public record",
      "source_url": null,
      "as_of": "historical",
      "status": "verified",
      "notes": null
    },
    "registered_voters": {
      "value": null,
      "display": "Awaiting Civic Substrate",
      "source": "Civic Substrate <- NM SOS voter file",
      "source_url": null,
      "as_of": null,
      "status": "pending",
      "notes": "Do not estimate or backfill from unofficial sources."
    },
    "active_voters": {
      "value": null,
      "display": "Awaiting Civic Substrate",
      "source": "Civic Substrate <- NM SOS voter file",
      "source_url": null,
      "as_of": null,
      "status": "pending",
      "notes": null
    },
    "precincts": {
      "value": null,
      "display": "Awaiting Civic Substrate",
      "source": "Civic Substrate <- county clerk",
      "source_url": null,
      "as_of": null,
      "status": "pending",
      "notes": null
    },
    "municipalities": {
      "value": null,
      "display": "Awaiting Civic Substrate",
      "source": "Civic Substrate <- NM municipal registry",
      "source_url": null,
      "as_of": null,
      "status": "pending",
      "notes": null
    },
    "school_districts": {
      "value": null,
      "display": "Awaiting Civic Substrate",
      "source": "Civic Substrate <- NM PED",
      "source_url": null,
      "as_of": null,
      "status": "pending",
      "notes": null
    },
    "house_district": {
      "value": null,
      "display": "Awaiting Civic Substrate",
      "source": "Civic Substrate <- NM Legislature districts",
      "source_url": null,
      "as_of": null,
      "status": "pending",
      "notes": null
    },
    "senate_district": {
      "value": null,
      "display": "Awaiting Civic Substrate",
      "source": "Civic Substrate <- NM Legislature districts",
      "source_url": null,
      "as_of": null,
      "status": "pending",
      "notes": null
    },
    "congressional": {
      "value": null,
      "display": "Awaiting Civic Substrate",
      "source": "Civic Substrate <- redistricting / U.S. Census",
      "source_url": null,
      "as_of": null,
      "status": "pending",
      "notes": null
    },
    "fun_fact": {
      "value": "Home to ancient Pueblo sites and the Jemez hot springs.",
      "display": "Home to ancient Pueblo sites and the Jemez hot springs.",
      "source": "PolitíCat editorial",
      "source_url": null,
      "as_of": "current",
      "status": "verified",
      "notes": "Editorial field; not a civic statistic."
    }
  },
  "meta": {
    "data_version": "county_snapshot_v1",
    "generated_at": "2026-06-07T00:00:00Z",
    "trust_rule": "PolitíCat shows no number it cannot source."
  }
}
```

## Required Snapshot Fields

| Field | Type | Initial Source | Notes |
| --- | --- | --- | --- |
| `population` | number | U.S. Census Bureau | Display as formatted integer. |
| `county_seat` | string | NM public record | Stable county fact. |
| `founded` | string | NM public record | Historical year. |
| `registered_voters` | number | NM SOS voter file | Civic Substrate-owned. |
| `active_voters` | number | NM SOS voter file | Civic Substrate-owned. |
| `precincts` | number | County clerk | Civic Substrate-owned. |
| `municipalities` | number or array | NM municipal registry | Decide count vs list before UI expansion. |
| `school_districts` | number or array | NM PED | Decide count vs list before UI expansion. |
| `house_district` | string or array | NM Legislature districts | Counties may contain multiple districts. |
| `senate_district` | string or array | NM Legislature districts | Counties may contain multiple districts. |
| `congressional` | string or array | Redistricting / U.S. Census | Counties may cross district boundaries. |
| `fun_fact` | string | PolitíCat editorial | Must be clearly labeled as editorial. |

## All New Mexico Counties

| County | Slug | FIPS |
| --- | --- | --- |
| Bernalillo | `bernalillo` | `35001` |
| Catron | `catron` | `35003` |
| Chaves | `chaves` | `35005` |
| Cibola | `cibola` | `35006` |
| Colfax | `colfax` | `35007` |
| Curry | `curry` | `35009` |
| De Baca | `de-baca` | `35011` |
| Doña Ana | `dona-ana` | `35013` |
| Eddy | `eddy` | `35015` |
| Grant | `grant` | `35017` |
| Guadalupe | `guadalupe` | `35019` |
| Harding | `harding` | `35021` |
| Hidalgo | `hidalgo` | `35023` |
| Lea | `lea` | `35025` |
| Lincoln | `lincoln` | `35027` |
| Los Alamos | `los-alamos` | `35028` |
| Luna | `luna` | `35029` |
| McKinley | `mckinley` | `35031` |
| Mora | `mora` | `35033` |
| Otero | `otero` | `35035` |
| Quay | `quay` | `35037` |
| Rio Arriba | `rio-arriba` | `35039` |
| Roosevelt | `roosevelt` | `35041` |
| Sandoval | `sandoval` | `35043` |
| San Juan | `san-juan` | `35045` |
| San Miguel | `san-miguel` | `35047` |
| Santa Fe | `santa-fe` | `35049` |
| Sierra | `sierra` | `35051` |
| Socorro | `socorro` | `35053` |
| Taos | `taos` | `35055` |
| Torrance | `torrance` | `35057` |
| Union | `union` | `35059` |
| Valencia | `valencia` | `35061` |

## Front-End Rendering Rules

Community Snapshot cells must render from `status`, not from assumptions about the field name.

```js
function renderDatum(datum) {
  if (datum.status === "verified") {
    return {
      className: "snapshot-cell snapshot-cell--verified",
      value: datum.display,
      tooltip: `Source: ${datum.source} / as of ${datum.as_of || "unknown"}`
    };
  }

  if (datum.status === "pending") {
    return {
      className: "snapshot-cell snapshot-cell--pending",
      value: "Awaiting Civic Substrate",
      tooltip: `Source: ${datum.source} / not yet loaded`
    };
  }

  return {
    className: `snapshot-cell snapshot-cell--${datum.status}`,
    value: datum.display || "Unavailable",
    tooltip: `Source: ${datum.source || "unknown"} / as of ${datum.as_of || "unknown"}`
  };
}
```

## Character Layer Mapping

| Character | Layer | County Page Role |
| --- | --- | --- |
| Don Gato Cívico | Explore | Place story, map hook, basic county intro. |
| Chica Chisme | Understand / Community | Community Snapshot and plain-language context. |
| Nacho Notas | Records | Public records, clerk links, source trail. |
| Cora | Ask | Ask PolitíCat / civic explanation handoff. |

## Non-Negotiable Trust Rules

- Do not fabricate missing numbers.
- Do not infer live voter or district data from stale screenshots, social posts, or unsourced lists.
- Do not silently replace `pending` with `0`.
- Do not hide source/date information behind backend-only logs.
- Do not mix editorial facts with civic statistics without labeling the field.
- If Civic Substrate is unavailable, return a valid response with `pending`, `unavailable`, or `error` states.

## Error Behavior

Unknown county:

```http
404 Not Found
```

```json
{
  "error": "county_not_found",
  "message": "No New Mexico county found for slug: example",
  "accepted_counties_url": "/api/civic/counties"
}
```

Source outage:

```http
200 OK
```

Return the county object and mark affected fields as `error` or `stale`. Do not fail the whole county page when one feed fails.

## Acceptance Tests

1. Verified `population` renders as a solid cell with source/date tooltip.
2. Pending `registered_voters` renders as a dashed cell reading `Awaiting Civic Substrate`.
3. Every rendered datum exposes `source` and `as_of` or a clear pending/source message.
4. Unknown county slug returns `404`.
5. Civic Substrate feed outage never produces invented fallback numbers.
6. Counties with multiple House, Senate, or Congressional districts can return arrays without breaking the UI.
7. Editorial `fun_fact` is visually distinct from civic statistics if displayed near snapshot fields.

## Implementation Note

The county explorer front end should be able to ship before the full Civic Substrate backend is live. The honest interim state is a complete page with verified stable facts and explicit pending civic fields.

That keeps the experience useful now and makes the backend integration a data swap later.
