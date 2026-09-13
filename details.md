## Cassini Assessment Tool  
Product Requirements and Implementation Plan
## 1. Product Overview
Cassini Assessment Tool is a responsive web application for entering learner assessment marks, processing grades, generating performance analysis, and exporting results.
The application should:
- Work primarily on the user’s device.
- Store data locally whenever possible.
- Use cloud services only when necessary, such as sending feedback or optional backups.
- Preserve the user’s progress if they refresh or temporarily leave the application.
- Provide a modern, light-mode, space-themed interface inspired by SpaceX.
- Work well on desktop, tablet, and mobile devices.
- Use Font Awesome icons where suitable.
The application should not require a server for its core assessment workflow. Data should be processed in the browser using JavaScript, with browser storage such as IndexedDB or localStorage used for persistence.


## 2. Main Navigation and Layout
### 2.1 Desktop layout
On desktop devices, the application should use:
- A persistent vertical sidebar.
- Cassini logo or application name.
- Circular progress indicator.
- Navigation links:
  - Home
  - Instructions
  - About
  - Submit Feedback
A whatsapp like chat interface is preferred for sections requiring user interaction.
### 2.2 Mobile layout
On mobile devices, the application should use:
- A persistent top header.
- Hamburger menu.
- Circular progress indicator.
- Current step title.
- Back and continue controls where applicable.
 ### 2.3 Navigation behavior
- Each major step should behave like an independent subpage.
- The user should be able to move backward and forward.
- Home should return the user to the beginning of the workflow.
- The application should warn the user before clearing any existing assessment data.
- The current step should be saved so that a refresh does not automatically erase progress.
### 2.4 Progress indicator
The progress indicator should display the current stage, for example:
```text
Step 3 of 5
```
It may also show a circular progress ring:
```text
20% → 40% → 60% → 80% → 100%
```
The progress indicator should update as the user advances.


## 3. Recommended Application Data Model
Instead of relying on separate physical CSV files during the workflow, the application should maintain structured data internally and generate CSV files only when needed.
Example application state:
```javascript
{
  schoolName: "Quality Nursery & Primary School Kyengera",
  session: "Beginning of Term",
  className: "P1",
  term: "I",
  year: 2026,
  applicableSubjects: ["ENG", "MTC", "SCI", "SST"],
  compiledBy: "User name",

  learners: [
    {
      id: "unique-id",
      name: "Learner Name",
      marks: {
        ENG: 75,
        MTC: 82,
        SCI: 0,
        SST: 68
      },
      missedSubjects: ["SCI"]
    }
  ]
}
```
The application can generate the following files from this data:
- `classlist.csv`
- `applicable_subjects.csv`
- `raw_data.csv`
- `assessment.csv`
- `additional_analysis.csv`
The correct spelling should be standardized as:
```text
assessment.csv
```
rather than `assesment.csv`.


## 4. Step 1: Welcome Page
Purpose
Introduce the application and allow the user to begin or learn how the tool works.

## Interface elements

- Cassini Assessment Tool title.
- Brief description.
- Welcome message.
- Continue button.
- Instructions or Help button.

Example:

```text
Welcome to the Cassini Assessment Tool

Enter learner marks, process assessments, analyze performance,
and download professional reports.

[Continue] [Instructions]
```

## Instructions page

The instructions page should explain:

1. How to select the school and assessment details.
2. How to enter or upload learner names.
3. How to enter marks.
4. How the grading system works.
5. What the “Missed” button means.
6. How to review and edit results.
7. How to download the final reports.

---

# 5. Step 2: Institution and Assessment Setup

## Purpose

Collect the information required to identify the assessment.

## Form fields

### Institution

- School name.
- Select from a predefined school list.
- Option to enter a custom school name.
- Default value:

```text
Quality Nursery & Primary School Kyengera
```

### Assessment details

- Session:
  - Beginning of Term
  - Mid Term
  - End of Term

- Class:
  - Reception
  - K1
  - K2
  - P1
  - P2
  - P3
  - P4
  - P5
  - P6
  - P7

- Term:
  - I
  - II
  - III

- Year:
  - Default: 2026
  - Ideally automatically populated with the current year

### Subjects

The user should select all subjects applicable to the selected class.

Available subjects:

```text
ENG
MTC
SCI
SST
LIT1A
LIT1B
NUM
GK1
GK2
```

The system should require at least one subject before continuing.

### Compiler identification

- Name of the person compiling the assessment.
- This name will appear in the final report.

## Validation

The system should prevent the user from continuing if:

- School name is empty.
- Session is not selected.
- Class is not selected.
- Term is not selected.
- Year is invalid.
- No subjects are selected.
- Compiler name is empty.

---

# 6. Step 3: Learner List Entry

## Purpose

Create the list of learners whose marks will be entered.

## Interface style

Use a chat-like interface where each learner’s name appears as a saved message.

Example:

```text
Cassini: Enter the full name of the next learner.
User:      Sarah Namukasa
Cassini: Sarah Namukasa saved.
```

Each saved learner should have controls:

```text
[Edit] [Delete]
```

Use:

- Pencil icon for Edit.
- Trash icon for Delete.

## Manual learner entry

The interface should provide:

- Text input for the learner’s full name.
- Send or Add button.
- Enter-key support.
- Confirmation message after saving.

The system should:

- Trim unnecessary spaces.
- Reject blank names.
- Warn if the same name appears more than once.
- Allow the user to edit or delete a name.
- Preserve the list in temporary application storage.

## File upload

Provide a paperclip upload button that accepts:

- CSV files.
- Plain text files with one learner per line.

Example text file:

```text
Sarah Namukasa
John Kato
Maria Achieng
```

The uploaded names should be:

1. Read in the browser.
2. Split into separate lines.
3. Trim whitespace.
4. Remove blank lines.
5. Check for duplicates.
6. Add them to the current learner list.
7. Display them in the chat interface.

No file needs to be sent to a server.

## Completion control

Place a **Done** button in the top-right corner.

When the user selects Done, the application should:

- Confirm that at least one learner exists.
- Display a warning:

```text
Please review all learner names carefully before continuing.
Editing names may be more difficult after marks have been entered.
You will still be able to edit names in the final results.
```

The user should then choose:

```text
[Review Names] [Continue]
```

---

# 7. Step 4: Learner Marks Entry

## Purpose

Enter marks for every learner and every applicable subject.

## Interface style

Continue using the chat-like interface.

For each learner, the system should display the learner’s name and ask for marks one subject at a time.

Example:

```text
Enter marks for Sarah Namukasa.

ENG:
[      ] [Missed]

MTC:
[      ] [Missed]

SCI:
[      ] [Missed]

SST:
[      ] [Missed]
```

## Mark rules

Each mark must be:

- A whole number.
- Between 0 and 100.
- Entered manually or marked as missed.
- Validated immediately.

Invalid examples:

- Blank marks.
- Negative numbers.
- Numbers above 100.
- Text that is not a valid mark.
- Decimal values, unless decimal marks are deliberately supported later.

## Missed button

The Missed button should:

- Record a score of `0`.
- Mark the subject as missed internally.
- Display `X` as the final grade for that subject.
- Ensure the learner is counted in missed-paper analysis.

The application should distinguish between:

```text
Actual score of 0
```

and:

```text
Missed paper
```

Both may produce `X` in the final report, but the internal data should preserve the difference.

## Confirmation message

After completing a learner’s marks, display a confirmation message:

```text
Sarah Namukasa’s marks have been saved.

ENG: 75
MTC: 82
SCI: Missed
SST: 68
```

Then provide:

```text
[Edit Marks] [Continue]
```

## Error detection

The application should detect and explain:

- Missing marks.
- Invalid marks.
- Scores above 100.
- Duplicate learners.
- Subjects accidentally skipped.
- Incorrect file format.
- Incomplete learner records.

Messages should be specific and actionable, for example:

```text
ENG mark for Sarah Namukasa is missing.
Enter a score from 0 to 100 or select Missed.
```

---

# 8. Raw Data Review

After all learner marks have been entered, generate an editable raw-data table.

Example:

| CAT | NAME | ENG | MTC | SCI | SST |
|---|---|---:|---:|---:|---:|
| 1 | Sarah Namukasa | 75 | 82 | 0 | 68 |
| 2 | John Kato | 61 | 70 | 55 | 80 |

The table should allow the user to:

- Edit learner names.
- Edit marks.
- Review missed subjects.
- Return to the relevant learner if necessary.
- Continue to processing.

Buttons:

```text
[Edit Value] [Process Assessment]
```

The system must validate the table again before processing.

---

# 9. Assessment Processing

When the user selects Process Assessment, display a processing animation:

```text
Processing assessment...
Calculating grades...
Preparing analysis...
Generating reports...
```

The calculation should happen locally in the browser.

## 9.1 Grade conversion

| Mark range | Numeric aggregate | Grade |
|---:|---:|---|
| 95–100 | 1 | D1 |
| 80–94 | 2 | D2 |
| 70–79 | 3 | C3 |
| 65–69 | 4 | C4 |
| 60–64 | 5 | C5 |
| 50–59 | 6 | C6 |
| 45–49 | 7 | P7 |
| 40–44 | 8 | P8 |
| 1–39 | 9 | F9 |
| 0 or missed | X | X |

The application should store both values:

```text
Numeric aggregate: 3
Displayed grade: C3
```

This allows calculations to be performed correctly while showing the expected grade format to the user.

## 9.2 Assessment output

For selected subjects such as ENG, MTC, SCI, and SST, the output should be:

```text
NAME | ENG | AGG | MTC | AGG | SCI | AGG | SST | AGG | TOTAL | T/AGG | DIV
```

Example:

```text
Sarah Namukasa | 75 | C3 | 82 | D2 | 68 | C4 | 90 | D2 | 315 | 11 | I
```

Where:

- `TOTAL` is the sum of all subject scores.
- `T/AGG` is the sum of all numeric aggregate values.
- `DIV` is the division based on `T/AGG`.

## 9.3 Division rules

| T/AGG range | Division |
|---:|---|
| 4–12 | I |
| 13–24 | II |
| 25–29 | III |
| 30–34 | IV |
| 35–36 | U |


The specified subject-count rule is:

```text
If the number of applicable subjects is less than 4 or greater than 5,
DIV = N/A.
```

This should be confirmed because the application allows nine possible subjects but only permits division calculations for four or five selected subjects.

---

# 10. Additional Analysis

## 10.1 Subject grade distribution

Generate an analysis table such as:

| Subject | D1 | D2 | C3 | C4 | C5 | C6 | P7 | P8 | F9 | X |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| ENG | 2 | 4 | 5 | 3 | 1 | 0 | 1 | 0 | 0 | 0 |
| MTC | 1 | 3 | 4 | 2 | 2 | 1 | 1 | 0 | 1 | 1 |

For each subject, the total of all grade categories should equal the total number of learners.

If the totals do not match, display an error such as:

```text
The ENG analysis contains 29 results, but the class has 30 learners.
Please review the learner marks for ENG.
```

## 10.2 Division summary

Generate a second summary:

| Category | Count |
|---|---:|
| Number of 4s | 3 |
| Division I | 8 |
| Division II | 14 |
| Division III | 5 |
| Division IV | 2 |
| U | 1 |
| X | 0 |

The “Number of 4s” category should count learners whose:

```text
T/AGG = 4
```

The `X` category should count learners who missed at least one paper.

The meaning of `X` in the division summary should be confirmed. It could mean:

- Any learner who missed one or more subjects.
- Learners whose overall division is X.
- Learners with incomplete assessment records.

The first interpretation is the most consistent with the requirements.

---

# 11. Step 5: Final Results Review

Display the generated outputs in the application.

## Assessment table

Show the full `assessment.csv` equivalent in an editable table.

## Additional analysis table

Show the full `additional_analysis.csv` equivalent in a separate table or tab.

The user should be able to:

- Edit learner names.
- Edit marks.
- Recalculate the assessment.
- Review grade distributions.
- Review division totals.
- Return to previous steps.
- Continue to document generation.

Buttons:

```text
[Edit Values] [Recalculate] [Continue]
```

The final output should not be generated until all validation checks pass.

---

# 12. File Generation and Downloads

The application should generate the following downloadable files:

## CSV files

- `classlist.csv`
- `applicable_subjects.csv`
- `raw_data.csv`
- `assessment.csv`
- `additional_analysis.csv`

## Excel-compatible file

The application may provide:

```text
Download Excel/CSV
```

A simple initial implementation can download CSV files, which open in Excel. A later version can generate a true `.xlsx` workbook with separate worksheets.

## PDF document

Generate a PDF containing:

1. School name.
2. Assessment details.
3. Assessment table.
4. Additional analysis table.
5. Compiler name.

## Editable Word document

Generate an editable `.docx` file containing:

```text
{School Name}

{Session} {Term} {Class}, Assessment {Year}

{Assessment Table}

{Additional Analysis Table}

Compiled by: {User}
```

## Document formatting

- Page size: A4.
- Margins: Microsoft Word Narrow.
- School name:
  - Heading 1.
  - 20 pt.
  - Aptos or Calibri.
  - No space after paragraph.
  - 1.115 line spacing.

- Assessment heading:
  - Heading 2.
  - 18 pt.

- Body:
  - 13 pt.
  - Aptos or Calibri.

The document-generation system should use browser-compatible libraries so the first version does not require a server.

---

# 13. Feedback Collection

After the user downloads or finishes reviewing the results, display an optional feedback prompt.

Example:

```text
How would you rate Cassini Assessment Tool?

[1] [2] [3] [4] [5]

Additional feedback:
[________________________________]

[Submit Feedback] [Skip]
```

The feedback should include:

- Rating.
- Written feedback, if provided.
- Date and time.
- Application version.
- Optional assessment context, if appropriate.

The feedback can initially be sent to a Telegram bot through a small cloud endpoint or automation service.

However, a Telegram bot token should not be placed directly in the website’s JavaScript. If it is included in client-side code, anyone could extract it and misuse the bot. A protected intermediary should be used for the Telegram submission.

A fully local fallback could store feedback in a downloadable file until a server or secure cloud endpoint is available.

---

# 14. Data Persistence and Privacy Strategy

## 14.1 Local-first storage

The application should save its working data locally using:

- IndexedDB for the primary data store.
- localStorage for small settings such as the last active step.
- Browser File APIs for CSV imports and downloads.

Data should remain on the user’s device unless the user explicitly chooses to submit feedback or use a cloud feature.

## 14.2 Persistent memory

The application should save:

- Current step.
- School details.
- Selected subjects.
- Learner list.
- Entered marks.
- Last edited time.
- Application version.

On reopening the application, display:

```text
A saved assessment was found.

[Resume Assessment] [Start New Assessment]
```

## 14.3 New assessment behavior

Provide:

```text
[Start New Assessment]
```

Before clearing data, show a confirmation:

```text
Starting a new assessment will clear the current assessment from this device.
Download or export your current work first.

[Cancel] [Start New Assessment]
```

## 14.4 Backup and recovery

The user should be able to export the current working assessment as a backup file, for example:

```text
cassini-project-backup.json
```

The user should also be able to import this backup later and resume the assessment.

This is especially useful because browser storage can be cleared by the user or browser.

---

# 15. Suggested Technical Architecture

## Frontend

- HTML.
- CSS.
- JavaScript.
- Responsive CSS layout.
- Font Awesome icons.
- Browser File API.
- IndexedDB.
- Client-side CSV parser and generator.
- Client-side PDF and Word document generation libraries.

## Core modules

```text
/navigation
/state-management
/local-storage
/learner-import
/marks-entry
/validation
/grading
/analysis
/csv-export
/pdf-export
/docx-export
/feedback
```

## Processing flow

```text
Welcome
   ↓
Assessment Setup
   ↓
Learner List
   ↓
Marks Entry
   ↓
Raw Data Review
   ↓
Assessment Processing
   ↓
Analysis Review
   ↓
Document Generation
   ↓
Downloads and Feedback
```

---

# 16. Validation Checklist

Before allowing the user to process results, verify:

- School name exists.
- Session exists.
- Class exists.
- Term exists.
- Year is valid.
- Compiler name exists.
- At least one subject is selected.
- At least one learner exists.
- Learner names are not blank.
- Duplicate learners are flagged.
- Every learner has a value for every subject.
- Marks are between 0 and 100.
- Missed subjects are recorded correctly.
- Subject analysis totals equal the number of learners.
- Aggregate totals are valid.
- Division calculations follow the configured rules.
- No unresolved calculation errors exist.

---

# 17. Recommended Development Phases

## Phase 1: Core assessment workflow

Build:

- Welcome page.
- Navigation.
- Assessment setup form.
- Learner entry.
- Manual marks entry.
- Local persistence.
- Basic validation.

## Phase 2: File support and editing

Add:

- CSV learner upload.
- Text learner upload.
- Learner editing and deletion.
- Raw data table.
- Backup and restore files.

## Phase 3: Calculations and analysis

Add:

- Grade conversion.
- Aggregate calculation.
- Total calculation.
- Division calculation.
- Subject analysis.
- Division summary.
- Error checking.

## Phase 4: Exporting

Add:

- CSV downloads.
- Excel-compatible export.
- PDF generation.
- Editable Word document generation.

## Phase 5: Refinement

Add:

- Responsive improvements.
- Space-themed visual design.
- Animations.
- Accessibility improvements.
- Help and About pages.
- Feedback collection.
- Optional Telegram integration.

---

# 18. Decisions to Confirm Before Implementation

These points need a fixed rule before development: And my Proposed answers are given as;
1. Should the year default to the actual current year or remain fixed at 2026?
The year should default to {current year}
2. What should happen when `T/AGG = 34`? 
Then the DIV = IV
3. Should division be calculated only when there are exactly four or five subjects?
Only when there are 4 subjects
4. Does `X` mean a missed subject, a learner with any missed paper, or an overall division?
Its a division for when the learner has any missed paper even if 1/4
5. Should an actual score of `0` be treated the same as a missed paper?
yes
6. Should `LIT1A`, `LIT1B`, `GK1`, and `GK2` count toward division?
Yes if they are selected by the user as applicable subjects. They usually take the place of SCI and SST respectively.
7. Should users be allowed to enter decimal marks?
yes
8. Should a true Excel `.xlsx` file be generated, or are CSV files sufficient initially?
CSV is sufficient
9. Should feedback be sent to Telegram immediately, or stored locally until a secure cloud endpoint is available?
Let us leave a placeholder for that
10. Should the application support multiple saved assessments on the same device?
Yes, but should warn the user incase a previous one is found.

The strongest initial implementation would be a **local-first progressive web app**. It would provide the custom interface you want, work without your own server, preserve data on the device, process all marks locally, and generate downloadable results directly in the browser.
