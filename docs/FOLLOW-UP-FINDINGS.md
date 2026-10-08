> October 4 update: original content/footer/prerender were restored at the user’s request. Earlier notes claiming removal of promotional claims or fake newsletter behavior are historical; retained claims and behavior still need review. No live secret exposure was verified.

# Separate findings for a follow-up task

These source observations are outside the main copy and presentation changes. They are not evidence of live key exposure or a legal-compliance conclusion.

1. **Browser AI credential (fixed October 8, see IMPLEMENTATION-STATUS):** `vite.config.ts` injects `GEMINI_API_KEY` into the browser bundle when configured; `src/components/MagicMascot.tsx` uses it in a direct provider request. The integration needs a server boundary and suitable access controls before relying on it for production use. Whether the deployed build contains a live credential was not verified. No secret values were printed.
2. **Chat data:** The same component sends conversation history to Gemini if the key is configured. The redesigned dialog labels itself as automated and asks visitors to avoid personal/health details, but a notice alone does not address the underlying data flow or privacy obligations. Its provider integration remains unchanged.
3. **Tracking and forms:** `index.html` includes a global Meta Pixel PageView. Forms collect child names, dates of birth, and insurance/contact information. Consent, data minimization, access rules, retention, and tracking suitability require a dedicated review. No real patient information was opened or submitted.
4. **Claims:** Existing privacy/terms text, medical-review attributions, and some service/insurance details are not substantiated by the materials reviewed. The static prerender footer's unverified HIPAA marketing badge was removed, but this does not validate or rewrite the underlying policies. No full US legal or HIPAA compliance is promised.
5. **Content supplied by Firestore:** Homepage/insurance FAQs and other managed content can differ from source files. They were not altered in production. The content rewrite needs an authorized editorial review of that data before anyone claims all live text has been cleared.

The nonfunctional homepage newsletter success state was resolved within the requested content/UX scope by linking to the existing parent guide.
