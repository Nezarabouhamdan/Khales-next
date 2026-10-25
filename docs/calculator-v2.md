# Khales calculator v2

A preliminary, **building-only** cost range for a family villa in six Gulf countries. The result is free and
shown at once: no name, email or phone is needed to see it, download the card or PDF, or share it. An Odoo lead
is created **only** when the visitor chooses "I want to design my home" or "Review my home budget" and
submits that form.

Page: `/[lang]/calculator` (`en`, `ar`, RTL). Client: `app/components/calculator/`. Logic: `lib/calculator/`.

## What changed from v1

| v1 (removed) | v2 |
| --- | --- |
| UAE only, AED, emirate discounts and uplifts (−5 / −12 / −20 %, +10 %) | 6 countries, each in its own currency. No regional factors. |
| Prices hard-coded in the code | All market numbers in one JSON file, checked at build |
| One cost figure, with a room-by-room breakdown | A range (low to high) plus a "planning figure", with exclusions, confidence and price date |
| Result blurred until email and phone were given (`/api/leads/create` made a lead, or added a note, on every run) | No form before the result, card or PDF. A lead comes only from a design or review request (`/api/calculator/request`). |
| Feedback widget (`/api/feedback`) | Removed |
| Room-by-room wizard that showed a price | "Family home plan" path: the family's rooms give an indicative area, with **no cost**, and lead to a design request |

New: three start paths (area, budget, family plan), a planning checklist (never a "not ready" verdict), a share
card and PDF with a random reference code (`K-XXXXXX`), and structured Odoo leads.
`components/VillaCalculatorClient.js` is the unused legacy file and was left untouched.

## Rates: `data/calculator-rates.v1.json`

The rates file is the only place market numbers live. To change them, edit the file and redeploy. Do not
edit the UI.

| What | Where in the file |
| --- | --- |
| Rates (local currency per built m²) | `markets[].rates.practical / family / premium` → `{ low, expected, high }` |
| Price anchor date | `markets[].anchor_date` (`YYYY`, `YYYY-Qn` or `YYYY-MM-DD`); per tier: `tier_anchor_date` |
| Confidence | `markets[].confidence` (`medium`, `medium_low`, `low`, `very_low`); per tier: `tier_confidence` |
| Pricing source date (date the file was issued) | `meta.as_of` (`YYYY-MM-DD`) |
| VAT status shown | `markets[].vat_mode` (wording in the dictionaries under `vatModes`) |
| Material indexes (shown as context only, never applied) | `markets[].material_signals` |
| Open a market for numbers | `active: "pilot"`, plus `rates` and `anchor_date`. For `coverage: "city"`, also `reference_city` (a city id from `data/calculatorMarkets.ts`). |
| Close a market (no number shown) | `active: "partner_review_only"` and `rates: null` |

`lib/calculator/rates.ts` checks the file when it loads, so a bad file **fails `next build`** with
`Invalid calculator rates file: …` and the previous deployment stays live. The build fails when:

- `meta.as_of` is not `YYYY-MM-DD`, or `meta.default_region_factor` is not `1`;
- a country is unknown, missing or listed twice. All six (AE, SA, QA, OM, KW, BH) must be present;
- a currency, confidence level, `vat_mode` or `coverage` (`city` / `national`) is unknown;
- `coverage: "city"` has a `reference_city` that is not one of that country's cities;
- a `tier_confidence` / `tier_anchor_date` key is not a tier, or a date or period is malformed;
- a `material_signals` entry has an unknown type, or a period that is not `YYYY`, `YYYY-Qn` or `YYYY-MM`;
- a `partner_review_only` market has rates (it must be `rates: null`);
- a `pilot` market is missing `anchor_date` or any tier, has a rate that is not a positive number, or breaks
  `low ≤ expected ≤ high`.

City lists are in `data/calculatorMarkets.ts`. All visitor-facing text is in `dictionaries/en.ts` and
`dictionaries/ar.ts` (`calculator`). This includes the required disclaimer (`disclaimer`) and the
"building only · VAT per country · not a contractor quote" tag (`scopeTag`).

## Market policy (rates v1, 2026-10-23)

| Country | Shown as | Currency | Anchor date / confidence |
| --- | --- | --- | --- |
| UAE | Dubai: direct reference. Other emirates: **the same Dubai numbers**, labelled "UAE reference — needs local partner calibration" | AED | 2025-Q2 / medium-low |
| Saudi Arabia | One national benchmark for every city, with a "city needs calibration" message | SAR | 2026-10-05 (practical: 2025) / medium (practical: low) |
| Qatar | Doha: direct reference. Elsewhere: the Doha numbers with a calibration label | QAR | 2023-Q3 / medium-low |
| Oman, Kuwait, Bahrain | **No number.** "We prepare a preliminary estimate with a local partner", plus the design and review requests | OMR / KWD / BHD | — / very low |

- The city is for display and routing only. It never changes the rate unless the file documents that exact
  city as the reference.
- The region factor is always 1.00 and shown as "difference not established". It is never applied and never
  presented as "cities are equal".
- VAT is never assumed to be included. It is shown on its own line with each country's status. There is no
  currency conversion: every amount is in the selected country's currency.

## Engine (`lib/calculator/engine.ts`)

The visitor's screen and the saved lead use the same code. The request API recomputes everything from the
submitted inputs and never trusts numbers sent by the client.

- **Area path**: range = area × `low` … area × `high`. Planning figure = area × `expected` ("not a contract
  price; don't use it alone to buy or sign"). Internal maths is in m², and sqft = m² × 10.7639.
- **Budget path**: conservative area = budget ÷ `high`, reference = budget ÷ `expected`, maximum = budget ÷
  `low`. Areas are rounded down. These are building-only areas before excluded items; land is not deducted.
- **Nothing else is added**: no markup, hidden contingency, consultant percentage, external works or region
  factor. Special items (basement, pool, elevator, annex, external works) add **no amount and no area
  multiplier**. They are flagged as "special pricing / local partner review" and saved with any request.
- **Rounding**: money to the nearest 1,000 (nearest 10 below 10,000). Areas are always rounded down.
- **Bounds**: area 20–50,000 m², budget 1–10,000,000,000. Outside 150–2,000 m² the result carries an
  "unusual size, local review" note, with no percentage change.
- **Family home plan**: indicative area = (sum of rooms, width × length, + 6 m² per en-suite bathroom + 6 m²
  per dressing room + selected service rooms + extra rooms) × 1.4 circulation. No cost is shown. Office,
  cinema and gym count as rooms and are flagged for separate pricing.
- **Lead score (0–3)** is never shown to the visitor. It gets +1 if the land is owned or granted/being
  allocated, +1 if the start is within 6 months, and +1 for a clear area or budget (area and budget paths) or
  an existing plan or contractor quote.

## Endpoints

| Endpoint | Called when | Odoo | Personal data |
| --- | --- | --- | --- |
| `POST /api/calculator/reference` → `{ reference }` (`Cache-Control: no-store`) | A result is shown | none | none. Random code, nothing stored or logged. |
| `POST /api/calculator/request` | The visitor submits the design or budget-review form | Creates (or returns) **one** `crm.lead` | First name, email and phone, only if given |
| `GET /api/leads/count` → `{ success, count }` | Start-screen counter | One `search_count`, cached 1 h | none |

Viewing a result, changing inputs, downloading the card or PDF and sharing do **not** call a lead API.
`/api/leads/create` and `/api/feedback` are deleted.

`/api/calculator/request` takes a `CalculatorRequestPayload` (`lib/calculator/request.ts`) and returns:

- `200 { success: true, reference, leadId }`
- `400 { success: false, error }`, where `error` is a field code such as `timing`, `email`, `phone`, `consent`
  or `inputs`
- `500 { success: false, error: "generic" }`

Bot traffic (a filled honeypot or a submit in under 3 s, see `lib/spam.ts`) gets a normal-looking
`200 … leadId: null`, and nothing is written. Error logs never contain visitor data; for Odoo faults only
the error kind is logged.

The form never opens WhatsApp by itself. After a request, the visitor can tap **Open WhatsApp** (a `wa.me`
link to 971551299880 with a prepared message: reference, location, area or budget, finish level), or open
an email to info@khales.ae. The page says nothing is sent until they press send. If the request fails, the
page shows the error **and** the same WhatsApp link.

The counter (`{n}+ homeowners…`) counts legacy `PDF Download Lead -` leads plus `Calculator v2 -` leads,
archived ones included.

## Odoo lead mapping (`lib/calculator/odooLead.ts`)

| `crm.lead` field | Value |
| --- | --- |
| `name` | `Calculator v2 - Design request - <City> - <reference>` or `Calculator v2 - Budget review - …`. The counter relies on the `Calculator v2 -` prefix. |
| `contact_name` / `email_from` / `phone` | First name, email and phone, only when given. The phone is normalised to `+<country code>…` by a format check only. |
| `description` | Everything, in English plain text, one fact per line. When the field is HTML (recent Odoo), lines are kept with `<br>`. |
| `source_id` | `utm.source` "Website Calculator v2" (created if missing) |
| `tag_ids` | "Calculator v2" + "Design request" or "Budget review" (created if missing) |
| `priority` | The lead score, `"0"`–`"3"` (stars) |
| Followers | The partners in `ODOO_DEFAULT_PARTNERS` |

The API never creates a `res.partner`, and never sets `type`, the stage, the salesperson or won/lost. Odoo's
defaults and assignment rules apply, so a request never becomes an opportunity or a customer automatically.

**Duplicates**: the name is unique per request, so a double click or a retry returns the existing lead (archived
ones included) instead of creating a second one. A design request and a budget review on the same reference
are two leads. Resubmitting the same request with new contact details does not update the existing lead.

### Custom fields (`x_calc_*`)

The API asks Odoo which of these fields exist (`fields_get`, cached for 10 minutes) and writes only those,
converted to each field's real type. A field that is missing or incompatible is skipped. If Odoo still rejects
one, the lead is created again without the custom fields. The description always has everything, so leads
work before any field is created. Values are codes: country `AE`, city `ae_dubai` (see
`data/calculatorMarkets.ts`), tier `family`, and so on.

| Field | Type | Content |
| --- | --- | --- |
| `x_calc_reference` | char | Estimate reference `K-XXXXXX` |
| `x_calc_version` / `x_calc_source` | char | `v2.0` / `website_calculator_v2` |
| `x_calc_request_type` | char | `design` / `budget_review` |
| `x_calc_country` / `x_calc_city` | char | `AE` … `BH` / city id |
| `x_calc_market_mode` | char | `direct_city`, `country_reference`, `national_benchmark`, `partner_review` |
| `x_calc_market_confidence` | char | `medium`, `medium_low`, `low`, `very_low` |
| `x_calc_pricing_source_date` | char | `meta.as_of` of the rates file (area and budget paths) |
| `x_calc_anchor_date` | char | Price anchor date (priced results only) |
| `x_calc_input_mode` | char | `area`, `budget`, `family_plan` |
| `x_calc_built_area_sqm` | float | Area path: the area in m². Family plan: the indicative area. |
| `x_calc_budget` | float | Budget path: the budget |
| `x_calc_currency` | char | `AED`, `SAR`, `QAR`, `OMR`, `KWD`, `BHD` |
| `x_calc_finish_level` | char | `practical`, `family`, `premium` |
| `x_calc_result_low` / `_expected` / `_high` | float | Area path, priced: the range and planning figure (rounded as shown) |
| `x_calc_area_conservative_sqm` / `_reference_sqm` / `_max_sqm` | float | Budget path, priced: the three areas (rounded down) |
| `x_calc_special_items` | char | Comma list, e.g. `pool, basement`, plus family-plan extra rooms (`office`, `cinema`, `gym`) |
| `x_calc_land_status` | char | `owned`, `grant_or_allocation`, `no_land_yet` |
| `x_calc_start_timing` | char | `within_3_months`, `3_to_6_months`, `over_6_months` |
| `x_calc_has_plan_or_quote` | boolean | Has a plan or contractor quote |
| `x_calc_review_goal` | char | Budget review: `cost_review` / `design_request` |
| `x_calc_preferred_contact` | char | `whatsapp` / `email` |
| `x_calc_contact_consent` / `x_calc_marketing_consent` | boolean | The two separate consents |
| `x_calc_lead_score` | integer | 0–3 (same as `priority`) |
| `x_calc_floors` | char | `1`, `2`, `3`, `4_plus` |
| `x_calc_family_plan` | text | Family plan: rooms with sizes, service and extra rooms, parking, floors, style, indicative area |
| `x_calc_lang` | char | `en` / `ar` |
| `x_calc_created_at` | char | ISO-8601 timestamp |

Fields that do not apply (or are empty) are left out.

**Creating the fields** requires an Odoo user with Settings/Administration rights. The website's integration
user usually doesn't have them.

```bash
node scripts/create-odoo-calculator-fields.mjs --dry-run   # lists what it would create
node scripts/create-odoo-calculator-fields.mjs             # creates the missing fields
```

The script reads `ODOO_URL`, `ODOO_DB`, `ODOO_EMAIL` and `ODOO_PASSWORD` from the environment. It loads
`.env.local` when present, and variables already set take precedence, so pass the admin login inline:
`ODOO_EMAIL=… ODOO_PASSWORD=… node scripts/…`. It needs Node 20.12+ (otherwise pass every variable inline).
It is idempotent: existing fields are skipped, and a type mismatch is reported. The website picks up new
fields within 10 minutes with no redeploy. To show them on the lead form, add them with Studio or a view
edit; they already work in filters, group-by and exports. The script keeps its own copy of the field list:
when you change the list in `lib/calculator/odooLead.ts`, change the script too.

If the integration user cannot create tags or UTM sources, create "Calculator v2", "Design request",
"Budget review" (CRM tags) and "Website Calculator v2" (UTM source) once by hand.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `ODOO_URL` | Odoo base URL. It must be `https://`. |
| `ODOO_DB`, `ODOO_EMAIL`, `ODOO_PASSWORD` | Integration user. It needs to create `crm.lead`, read and create `crm.tag` and `utm.source`, and read lead fields. |
| `ODOO_DEFAULT_PARTNERS` | Comma-separated `res.partner` ids added as followers of every lead (default `9,23`) |
| `CALCULATOR_ODOO_DRY_RUN` | `true` means no Odoo call at all. The server logs the lead name and `x_calc_*` values (never name, email or phone) and answers `leadId: null`. Use it for previews and tests, **never in production**. |

## Acceptance tests

Run them on `npm run dev` or a Vercel preview, with `CALCULATOR_ODOO_DRY_RUN=true` unless you are checking
Odoo itself. Keep DevTools → Network open, filtered on `/api/`.

1. **Dubai, 500 m², balanced family**: range 2,100,000 – 3,250,000 AED, planning figure 2,675,000 AED. Only
   `/api/calculator/reference` is called (plus `/api/leads/count` on the start screen). Downloading the card
   or PDF adds no request.
2. **Budget 2,000,000 AED, Dubai, family**: 307 / 373 / 476 m² (conservative / reference / maximum), with the
   "building only, before excluded items, land not deducted" note.
3. **Sharjah or Fujairah**, same inputs as test 1: the same numbers as Dubai, labelled "UAE reference — needs
   local partner calibration".
4. **Saudi Arabia / Qatar**: amounts in SAR / QAR, with the confidence tag. **Oman / Kuwait / Bahrain**: no
   number anywhere (result, card, PDF), the partner-estimate message, and the request buttons.
5. **Pool or basement** ticked: the range and area are unchanged. The item is flagged on the result. After
   a request, it is in `x_calc_special_items` and in the description.
6. **Card / PDF**: no form, no email or phone. They show only Khales, country, area or budget, finish level,
   range, date and reference.
7. **Requests** (dry run off, test Odoo): each submit creates one lead named `Calculator v2 - …`, with
   tags, source, priority and the `x_calc_*` fields that exist. It has no partner, is not converted or moved
   along the pipeline, and is not marked won. Submitting again returns the same `leadId`.
8. **WhatsApp**: after a request, nothing opens by itself. The "Open WhatsApp" link opens a prepared message,
   and the page says nothing is sent until you press send.
9. **Mobile, both languages**: at 360 px width, in `/ar` and `/en`, there is no horizontal scroll and the
   layout is right-to-left in Arabic. With JavaScript disabled, the `<noscript>` fallback shows the rates
   and contact details.

To test the request API directly in dry-run mode, run the following. `elapsedMs` must be at least 3000 and
`website` empty, or the request is treated as spam.

```bash
curl -s -X POST http://localhost:3000/api/calculator/reference
curl -s -X POST http://localhost:3000/api/calculator/request -H "Content-Type: application/json" -d '{
  "requestType": "design", "reference": "K-7F3Q9C", "lang": "en", "inputMode": "area",
  "estimate": { "country": "AE", "city": "ae_dubai", "landStatus": "owned", "tier": "family", "unit": "m2",
                "area": 500, "budget": null, "floors": null, "specialItems": ["pool"] },
  "familyPlan": null, "startTiming": "within_3_months", "hasPlanOrContractorQuote": false, "reviewGoal": null,
  "preferredContact": "whatsapp", "firstName": "", "email": "", "phone": "",
  "contactConsent": true, "marketingConsent": false, "website": "", "elapsedMs": 5000 }'
# -> {"success":true,"reference":"K-7F3Q9C","leadId":null}, and the server log shows the lead name and fields
```

The code checks are `npx tsc --noEmit -p .` and `npx eslint`, and `next build` re-validates the rates file.

## Not in v1 (intentionally)

- **Analytics** events and a reporting dashboard
- **Currency conversion**: every amount is in the selected country's currency
- **Uploads**: contractor quotes are sent later on WhatsApp, and there is no free-text upload
- **Investment / ROI path**: family villa only
- **Region factors**: always 1.00, "not established", never applied. Material indexes are context only.
- **A fallback store when Odoo is down**: the visitor sees the error and the WhatsApp link
- **A weekly cap on budget reviews in code**: the team handles it
