# FOODBRIDGE — Food Rescue 2.0 Engineering Roadmap

This roadmap accompanies the current runnable student/demo prototype. It separates existing prototype functionality from integrations that require credentials, real partner data, and deployment work.

## Already in this package
- Flask application with SQLite persistence and startup migrations.
- Donor, receiver/NGO, driver, volunteer and admin workflows.
- Donation and request forms, food images, cooked/raw/packaged category, quantity, preparation time and expiry fields.
- Listing and account verification review states, donation lifecycle statuses, delete controls and audit events.
- Rules-based matching/expiry insights, in-app notifications, delivery handover token/OTP prototype, tracking API.
- Dashboard charts, photo-led cards, sample Hyderabad map/route, persistent Anyaa chat panel and browser voice input/output.
- Computer-vision food-photo analysis remains removed. Images are for human review only.

## Next implementation phases

### Phase 1 — Safety and reliable claims
1. Move to PostgreSQL for a deployed multi-user service; retain SQLite for local demos.
2. Make donation claims atomic with a transaction and conditional update (`WHERE status='Available'`) so only one NGO can claim a listing.
3. Add tests for simultaneous claims, expiry boundaries, rejected accounts, authorization and delivery-state transitions.
4. Add CSRF protection, rate limiting, secure production secrets, strict upload content checks, backups and audit-log access controls.
5. Use explicit local timezone handling and configurable food-category safety rules reviewed against applicable local guidance.

### Phase 2 — Real-time rescue coordination
1. Add a geocoding provider and PostGIS distance queries; do not infer exact locations from text alone.
2. Add a real routing provider for ETA and routes. The current map route is illustrative/demo data, not live GPS.
3. Add a durable background queue for reminders, notifications and retryable tasks.
4. Connect SMS/push providers only after credentials, consent, delivery receipts and opt-out handling are configured. Current notifications are in-app demo notifications.
5. Add recipient capacity, pickup windows, cancellation recovery and idempotency keys.

### Phase 3 — AI copilot and forecasting
1. Keep AI optional and configured with an environment variable; never ship API keys in source code.
2. Use structured tool calls with server-side authorization for actions such as drafting a donation; require human confirmation before publishing.
3. Treat photo understanding as optional draft assistance only; never use appearance to certify food safety. The current computer-vision feature is removed.
4. Start demand forecasting with transparent historical baselines and only introduce ML after collecting enough consented, reliable data.
5. Provide clear fallbacks when the AI provider or network is unavailable.

### Phase 4 — Production quality
1. Add CI for linting, dependency checks, unit/integration/e2e tests and database migration checks.
2. Instrument latency, errors, queue age and delivery completion using structured logs and metrics.
3. Load-test realistic workloads and document measured p95 latency rather than claiming untested performance.
4. Add accessibility checks, image optimization, offline draft support and language translations.
5. Pilot with a small set of verified organizations before expanding.

## Truthful demo labels
- Dashboard sample charts and map journey may be illustrative.
- A verification status is an admin review state, not a guarantee of identity or food safety.
- Browser speech depends on browser support and microphone permission.
- Live general-purpose Anyaa answers require a configured AI API key; local help mode works without one.
- Do not use this prototype as an emergency service or as the sole basis for food-safety decisions.
