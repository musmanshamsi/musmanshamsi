# Implementation Plan — Contact Enhancements & Appointment Booking

Implementation plan to upgrade the **Contact Section** with direct email delivery to `m.usman.shamsi.pak@gmail.com` and a weekday-only (Mon–Fri) **Appointment Booking System** integrated with Google Calendar.

## User Review Required

> [!IMPORTANT]
> Please review the proposed 100% free tools and feature architecture below. You can approve the plan or specify any additional meeting time slots or form fields.

## Open Questions

> [!NOTE]
> 1. **Time Slots**: Default available slots are 10:00 AM, 11:30 AM, 02:00 PM, 03:30 PM, and 05:00 PM PKT (Mon–Fri). Do these times suit your availability?
> 2. **Direct Email Service**: We will use Web3Forms / Formspree free API to deliver messages & bookings straight to `m.usman.shamsi.pak@gmail.com`.

---

## Proposed Changes

### 1. Direct Email Delivery System

#### [MODIFY] [ContactDetail.tsx](file:///e:/usman-portfolio/src/components/sections/ContactDetail.tsx)
- Integrate direct AJAX form submission to Web3Forms / Formspree API targeting `m.usman.shamsi.pak@gmail.com`.
- Send full sender payload: Name, Email ID, Subject, and Message body.
- Add error handling and interactive success feedback animation.

---

### 2. Weekday-Only Appointment Booking System

#### [MODIFY] [ContactDetail.tsx](file:///e:/usman-portfolio/src/components/sections/ContactDetail.tsx)
- Add a tab toggle: **"Send Message"** vs **"Book Appointment"**.
- Build an interactive **Weekday Date Picker**:
  - Automatically disables Saturdays and Sundays (`getDay() === 0 || getDay() === 6`).
  - Restricts selection to future weekday dates (Mon–Fri).
- Build a **Time Slot Selector** (10:00 AM – 5:00 PM PKT).
- Generate a one-click **Google Calendar Add Event URL**:
  - `https://calendar.google.com/calendar/render?action=TEMPLATE&text=...&dates=...&details=...`
- Deliver booking notification email directly to `m.usman.shamsi.pak@gmail.com`.

---

### 3. Styling & Polish

#### [MODIFY] [index.css](file:///e:/usman-portfolio/src/index.css)
- Style calendar date picker cards, disabled weekend states, active slot pills, and tab toggles.

---

## Verification Plan

### Automated Tests
- Type checking: `npx tsc --noEmit`
- Production build: `npm run build`

### Manual Verification
- Fill contact form and verify payload delivery.
- Select a Saturday/Sunday in the appointment picker to verify weekend dates are disabled.
- Select a weekday date (e.g. Wednesday), pick a time slot, and test Google Calendar event link creation.
