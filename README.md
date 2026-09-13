# Cassini Assessment Tool

**Version 1.0.0**

Cassini is a responsive, local-first assessment workspace for entering learner marks, calculating results, reviewing performance, and producing classroom reports. It runs entirely in the browser: no application server or account is required for the core workflow.

## What it does

- Guides users through assessment setup, learner entry, mark entry, review, and export.
- Saves the active assessment in browser storage and offers to resume it after a refresh.
- Imports class lists from plain-text files or CSV files with a `name` column.
- Supports manual learner editing, duplicate-name protection, and learner deletion.
- Supports decimal marks from 0 to 100 and explicitly records missed papers.
- Shows one learner at a time during mark entry, with previous/next controls and learner search.
- Converts marks to D1–F9 grades and calculates total marks, aggregates, divisions, and positions.
- Sorts results by highest total, then lowest applicable aggregate; records with `X` appear last.
- Includes subject-grade distribution, division summary, and aggregate-count analysis.
- Produces a combined CSV report, an editable Word-compatible document, and a PDF report.
- Allows local backup export/import and stores feedback locally as a placeholder for future secure submission.

## Assessment workflow

1. Enter the institution, session, class, term, year, compiler, and applicable subjects.
2. Add learner names manually or import a class list.
3. Enter marks for each learner and subject. Choose **Missed** when a learner did not take a paper.
4. Review and correct the calculated results.
5. Download the final report in the required format.

## Class-list CSV format

CSV uploads must include a column named `name` (case-insensitive):

```csv
name
Sarah Namukasa
John Kato
Maria Achieng
```

Text files are also accepted, with one learner name per line.

## Calculation rules

| Mark | Grade | Aggregate |
| --- | --- | --- |
| 95–100 | D1 | 1 |
| 80–94 | D2 | 2 |
| 70–79 | C3 | 3 |
| 65–69 | C4 | 4 |
| 60–64 | C5 | 5 |
| 50–59 | C6 | 6 |
| 45–49 | P7 | 7 |
| 40–44 | P8 | 8 |
| 1–39 | F9 | 9 |
| 0 or missed | X | X |

Division and position are calculated only when exactly four subjects are selected. A score of `0` or a missed paper produces `X`; an `X` record is not assigned a position.

## Report formats

- `cassini-assessment-report.csv` — a combined Excel-compatible report.
- `cassini-assessment-report.doc` — an editable Word-compatible report.
- `cassini-assessment-report.pdf` — a formatted PDF report.

Each report includes assessment results, subject-grade distribution, and division summary.

## Privacy and data

Assessment data remains in the browser unless you explicitly download a report or backup. Use **Export backup** before clearing browser data, changing devices, or beginning a new assessment.

## Release notes — v1.0.0

This is the first publishable release of Cassini Assessment Tool. It provides the complete local assessment workflow, mobile navigation, local persistence, CSV class-list import, analysis, and report generation.

## Credits

Built by Harry.
