# Security Specification - Auvia Behavior Centers

## Data Invariants
1. A **Lead** must have a valid status and a verified server timestamp for creation. SMS consent defaults to `false` if not provided but must be a boolean if it is.
2. An **Admin** document must be keyed by the user's Auth UID and contain their verified email.
3. **Jobs** and **FAQs** can only be modified by whitelisted admins.

## The "Dirty Dozen" Payloads

### 1. Identity Spoofing (Leads)
```json
{
  "firstName": "Attacker",
  "lastName": "User",
  "email": "attacker@evil.com",
  "phone": "555-0199",
  "status": "enrolled",
  "source": "spoof",
  "createdAt": "2020-01-01T00:00:00Z"
}
```
*Result:* **PERMISSION_DENIED** (Invalid `createdAt` or status set to 'enrolled' by public).

### 2. ID Poisoning
*Path:* `/leads/CONTAINS_EXCESSIVE_JUNK_DATA_1234567890...`
*Result:* **PERMISSION_DENIED** (ID size check in `isValidId`).

### 3. PII Leak (Admin List)
*Operation:* `list /admins` as public or non-admin.
*Result:* **PERMISSION_DENIED** (Default deny).

### 4. Shadow Field Injection (admins)
```json
{
  "email": "user@auviatherapy.com",
  "role": "super_admin",
  "can_delete_all": true
}
```
*Result:* **PERMISSION_DENIED** (Shadow field `can_delete_all` not in schema).

### 5. Escalation (Self-Admin)
*Operation:* `create /admins/attacker_uid` as `attacker@gmail.com`.
*Result:* **PERMISSION_DENIED** (`admins` collection `allow write: if false`).

### 6. Orphaned Lead
*Operation:* Create lead with no email.
*Result:* **PERMISSION_DENIED** (Required field check).

### 7. Resource Poisoning (Jumbo String)
```json
{
  "firstName": "A".repeat(1001), 
  "lastName": "B",
  "email": "test@test.com"
}
```
*Result:* **PERMISSION_DENIED** (String size limit in `isValidLead`).

### 8. Status Shortcut
*Operation:* Update Lead status from `new` to `enrolled` by a normal user.
*Result:* **PERMISSION_DENIED** (Admin only).

### 9. Temporal Integrity Bypass
*Operation:* Create lead with a custom `createdAt` date.
*Result:* **PERMISSION_DENIED** (Must match `request.time`).

### 10. SMS Consent Fraud
*Operation:* Publicly setting `smsConsent` to `null` or a string.
*Result:* **PERMISSION_DENIED** (Type check).

### 11. Admin Impersonation
*Operation:* Read `/leads` by sending a token with a faked `role` claim.
*Result:* **PERMISSION_DENIED** (Rules use `exists()` check, not token claims).

### 12. Collection Crawl
*Operation:* `list /admins` with a `where("email", ">", "")` query.
*Result:* **PERMISSION_DENIED** (Explicit list check).
