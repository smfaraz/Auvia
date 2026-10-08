> Historical comparison from the earlier implementation. The user subsequently requested restoring the original content. These rewrite changes are not the current deliverable.

# Content comparison and rewrite

Reviewed October 3, 2026 against repository baseline `d9f4f39` on `master`. Changes are local and have not been published.

## Comparison site

The user named `ABCtherapyclinic.com`. Its intended identity remains unconfirmed. The earlier candidate, [ABC Therapy Clinics](https://www.abctherapyclinics.com/), was only tentative. It was insufficient to support a copying conclusion.

The stronger textual evidence is [Action Behavior Centers](https://www.actionbehavior.com/). Several original Auvia homepage passages match that page exactly after normalizing typography, or contain complete matching sentences. This is a textual comparison, not a legal finding about plagiarism, authorship, or permission.

## Confirmed matches addressed

Baseline locations refer to the original commit, so they remain reproducible after edits. The source columns identify sections without reproducing the competitor's full text.

| Original Auvia location | External source section | Finding | Local replacement |
| --- | --- | --- | --- |
| `Home.tsx:374` | Homepage diagnostic support card | Paragraph matches after apostrophe normalization | Overview and questions for a diagnostic professional |
| `Home.tsx:383` | Homepage insurance card | Exact paragraph | Plan information and insurer confirmation |
| `Home.tsx:392` | Homepage coordinated care card | First sentence matches; second is shortened | Service availability inquiry |
| `Home.tsx:517` and `:520` | Homepage ABA introduction | Matching paragraphs; registered marks/formatting differ | Original explanation and questions about clinical roles |
| `Home.tsx:514` | Homepage ABA section heading | Matching wording across JSX tags | New ABA introduction heading |
| `Home.tsx:557` and `:558` | Homepage diagnostic next steps introduction | Matching heading and introductory sentence | Original evaluation questions introduction |
| `Home.tsx` diagnosis pathway cards | Homepage diagnosis pathways | Matching headings | New evaluation and care conversation headings |
| `Home.tsx:609` | Homepage inquiry pathway | Long matching passage with a changed opening | Original explanation of inquiry follow-up |
| `Home.tsx` interest form introduction | Homepage inquiry form | Matching heading and introductory text | Original contact invitation |

The family-session schedule also closely followed the source. It was replaced with general parent-resource copy rather than repeating a specific service schedule.

On the [Action financial assistance page](https://www.actionbehavior.com/resource/financial-assistance), all three insurance-process descriptions also matched the original `InsuranceFinancialAssistance.tsx`. These are now original questions about benefits, approval, and billing. Matching closing form copy and closely similar assistance/cost language were rewritten there too.

The [Action ABA guide](https://www.actionbehavior.com/services/aba-therapy) and [services overview](https://www.actionbehavior.com/services) were also reviewed. No whole-site originality guarantee is implied. Generic clinical terms and ordinary navigation labels are retained where useful.

## Scope and remaining content

- Preserved and extended original-copy revisions across services, about, locations, careers, family guides, and educational pages.
- Replaced two service images linked to other therapy providers with original illustrations. Existing photos elsewhere were not subject to a complete rights audit.
- Removed the homepage's simulated newsletter confirmation and welcome-email promise. The section now links to a real local parent-guide route.
- Updated the static prerender footer and shared introduction so a future build does not reintroduce their old marketing language.
- FAQs, careers, and some location information can come from Firestore. Production records were not changed or comprehensively audited; text supplied by those records may still require a separate editorial pass.
- Existing provider lists, medical-review attributions, clinical claims, and legal policy content still need owner verification. This work does not certify those claims or legal compliance.
