import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Calendar, AlertCircle, CheckCircle2, Send, MapPin, ExternalLink, Download, XCircle } from "lucide-react";
import { useSiteSettings } from "../../context/SiteSettingsContext";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

const timeSlots = ["10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"];

const channels = [
  { icon: Mail,         label: "Email",    value: "m.usman.shamsi.pak@gmail.com", href: "mailto:m.usman.shamsi.pak@gmail.com" },
  { icon: ExternalLink, label: "GitHub",   value: "github.com/musmanshamsi",      href: "https://github.com/musmanshamsi", external: true },
  { icon: ExternalLink, label: "LinkedIn", value: "linkedin.com/in/musmanshamsi", href: "https://www.linkedin.com/in/musmanshamsi", external: true },
  { icon: Download,     label: "Resume",   value: "Usman-Shamsi-Resume.pdf",      href: "/resume.pdf", download: "Usman-Shamsi-Resume.pdf" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function ContactDetail() {
  const { isDateBlackedOut, isSlotDisabled } = useSiteSettings();

  const [activeTab, setActiveTab] = useState<"email" | "appointment">("email");

  const emailTabRef  = useRef<HTMLButtonElement>(null);
  const apptTabRef   = useRef<HTMLButtonElement>(null);

  // Email form
  const [emailForm, setEmailForm]           = useState({ name: "", email: "", message: "" });
  const [emailSending, setEmailSending]     = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailTouched, setEmailTouched]     = useState(false); // has user left the email field?

  // Appointment form
  const [apptForm, setApptForm]             = useState({ name: "", email: "", date: "", time: "10:00 AM", message: "" });
  const [weekendError, setWeekendError]     = useState("");
  const [apptSending, setApptSending]       = useState(false);
  const [apptSubmitted, setApptSubmitted]   = useState(false);
  const [apptEmailTouched, setApptEmailTouched] = useState(false);

  // Derived validation flags
  const emailValid     = isValidEmail(emailForm.email);
  const apptEmailValid = isValidEmail(apptForm.email);

  /* ── helpers ── */
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    if (!emailForm.name || !emailForm.email || !emailForm.message || !emailValid) return;
    setEmailSending(true);
    try {
      const saved = localStorage.getItem("usman_portfolio_messages");
      const existing = saved ? JSON.parse(saved) : [];
      localStorage.setItem("usman_portfolio_messages", JSON.stringify([
        { id: "msg_" + Date.now(), senderName: emailForm.name, senderEmail: emailForm.email,
          subject: "Direct Portfolio Inquiry", message: emailForm.message,
          status: "unread", createdAt: new Date().toISOString() },
        ...existing,
      ]));
    } catch { /* ignore */ }
    try {
      await fetch("https://formsubmit.co/ajax/m.usman.shamsi.pak@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: emailForm.name, email: emailForm.email, message: emailForm.message,
          _subject: `New Portfolio Message from ${emailForm.name}`, _template: "table", _captcha: "false" }),
      });
    } catch { /* ignore */ }
    setEmailSending(false);
    setEmailSubmitted(true);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) { setApptForm(p => ({ ...p, date: "" })); setWeekendError(""); return; }
    if (isDateBlackedOut(val)) {
      setWeekendError("This date is unavailable. Please choose another weekday.");
      setApptForm(p => ({ ...p, date: "" })); return;
    }
    const day = new Date(val + "T00:00:00").getDay();
    if (day === 0 || day === 6) {
      setWeekendError("Appointments are available Monday through Friday only.");
      setApptForm(p => ({ ...p, date: "" }));
    } else {
      setWeekendError("");
      setApptForm(p => ({ ...p, date: val }));
    }
  };

  const handleApptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApptEmailTouched(true);
    if (!apptForm.name || !apptForm.email || !apptEmailValid) return;
    if (!apptForm.date) { setWeekendError("Please select a valid weekday date."); return; }
    setApptSending(true);
    try {
      const saved = localStorage.getItem("usman_portfolio_appointments");
      const existing = saved ? JSON.parse(saved) : [];
      localStorage.setItem("usman_portfolio_appointments", JSON.stringify([
        { id: "appt_" + Date.now(), ...apptForm, status: "pending", createdAt: new Date().toISOString() },
        ...existing,
      ]));
    } catch { /* ignore */ }
    try {
      await fetch("https://formsubmit.co/ajax/m.usman.shamsi.pak@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Request_Type: "Appointment Booking", Name: apptForm.name, Email: apptForm.email,
          Requested_Date: apptForm.date, Requested_Time: apptForm.time,
          Agenda_Notes: apptForm.message || "None provided",
          _subject: `📅 New Appointment: ${apptForm.name} (${apptForm.date} @ ${apptForm.time})`,
          _template: "table", _captcha: "false",
        }),
      });
    } catch { /* ignore */ }
    setApptSending(false);
    setApptSubmitted(true);
  };

  /* ── tab pill position ── */
  const getPillStyle = () => {
    const ref = activeTab === "email" ? emailTabRef : apptTabRef;
    const el = ref.current;
    if (!el) return { left: "5px", width: "140px" };
    return { left: el.offsetLeft + "px", width: el.offsetWidth + "px" };
  };

  return (
    <section id="contact-detail" className="ct2-page">

      <div className="ct2-body">

        {/* ── LEFT: EDITORIAL PANEL ── */}
        <motion.div className="ct2-left">

          <motion.p {...fadeUp(0)} className="ct2-kicker">
            07 / Contact · Direct Channels
          </motion.p>

          <motion.h2 {...fadeUp(0.05)} className="ct2-heading">
            Get In<span>Touch.</span>
          </motion.h2>

          <motion.p {...fadeUp(0.1)} className="ct2-tagline">
            Have a project, opportunity, or just want to talk? Choose your channel — I respond within 24 hours.
          </motion.p>

          <motion.div {...fadeUp(0.14)} className="ct2-channels">
            {channels.map((ch) => {
              const Icon = ch.icon;
              return (
                <a
                  key={ch.label}
                  href={ch.href}
                  download={ch.download}
                  target={ch.external ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="ct2-channel"
                >
                  <div className="ct2-channel-icon">
                    <Icon size={15} />
                  </div>
                  <div>
                    <div className="ct2-channel-label">{ch.label}</div>
                    <div className="ct2-channel-value">{ch.value}</div>
                  </div>
                </a>
              );
            })}
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="ct2-location">
            <span className="ct2-location-dot" />
            <MapPin size={11} />
            Karachi, Pakistan · Open to Remote
          </motion.div>
        </motion.div>

        {/* ── RIGHT: FORM PANEL ── */}
        <motion.div {...fadeUp(0.08)} className="ct2-right">

          {/* Tab Switcher */}
          <div className="ct2-tabs" id="ct2-tabs-container">
            <div className="ct2-tab-pill" style={getPillStyle()} />
            <button
              ref={emailTabRef}
              className={`ct2-tab-btn ${activeTab === "email" ? "active" : ""}`}
              onClick={() => setActiveTab("email")}
            >
              <Mail size={13} /> Send Message
            </button>
            <button
              ref={apptTabRef}
              className={`ct2-tab-btn ${activeTab === "appointment" ? "active" : ""}`}
              onClick={() => setActiveTab("appointment")}
            >
              <Calendar size={13} /> Book Appointment
            </button>
          </div>

          {/* Form Card */}
          <AnimatePresence mode="wait">
            {activeTab === "email" ? (
              <motion.div
                key="email-card"
                className="ct2-form-card"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                {emailSubmitted ? (
                  <div className="ct2-success">
                    <motion.div
                      className="ct2-success-icon"
                      style={{ background: "rgba(46,213,115,0.08)", border: "1px solid rgba(46,213,115,0.22)", color: "#2ed573" }}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <CheckCircle2 size={34} />
                    </motion.div>
                    <h3 className="ct2-success-title">Message Dispatched</h3>
                    <p className="ct2-success-sub">
                      Your message has been sent to{" "}
                      <strong style={{ color: "var(--champagne)" }}>m.usman.shamsi.pak@gmail.com</strong>. I'll be in touch shortly.
                    </p>
                    <button className="ct2-success-action" onClick={() => setEmailSubmitted(false)}>
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="ct2-form-inner">
                    <h3 className="ct2-form-title">Send a Direct Message</h3>
                    <div className="ct2-row">
                      <div className="ct2-field">
                        <label className="ct2-label">Your Name *</label>
                        <input className="ct2-input" type="text" required placeholder="Muhammad Ali"
                          value={emailForm.name} onChange={e => setEmailForm({ ...emailForm, name: e.target.value })} />
                      </div>
                      <div className="ct2-field">
                        <label className="ct2-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          Your Email *
                          {emailTouched && emailForm.email && (
                            emailValid
                              ? <CheckCircle2 size={11} style={{ color: "#2ed573" }} />
                              : <XCircle      size={11} style={{ color: "#fb7185" }} />
                          )}
                        </label>
                        <input
                          className="ct2-input"
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={emailForm.email}
                          onChange={e => setEmailForm({ ...emailForm, email: e.target.value })}
                          onBlur={() => setEmailTouched(true)}
                          style={emailTouched && emailForm.email
                            ? { borderColor: emailValid ? "rgba(46,213,115,0.45)" : "rgba(251,113,133,0.55)" }
                            : {}}
                        />
                        {emailTouched && emailForm.email && !emailValid && (
                          <p className="ct2-error" style={{ marginTop: 4 }}>
                            <AlertCircle size={12} /> Please enter a valid email address (e.g. name@domain.com)
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="ct2-field">
                      <label className="ct2-label">Message *</label>
                      <textarea className="ct2-textarea" rows={5} required
                        placeholder="Tell me about your project, opportunity, or idea..."
                        value={emailForm.message} onChange={e => setEmailForm({ ...emailForm, message: e.target.value })} />
                    </div>
                    <button type="submit" className="ct2-submit" disabled={emailSending}>
                      <Send size={15} />
                      {emailSending ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="appt-card"
                className="ct2-form-card"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                {apptSubmitted ? (
                  <div className="ct2-success">
                    <motion.div
                      className="ct2-success-icon"
                      style={{ background: "rgba(214,178,111,0.08)", border: "1px solid rgba(214,178,111,0.22)", color: "var(--champagne)" }}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <CheckCircle2 size={34} />
                    </motion.div>
                    <h3 className="ct2-success-title">Request Received</h3>
                    <p className="ct2-success-sub">
                      Your slot for{" "}
                      <strong style={{ color: "var(--champagne)" }}>{apptForm.date} @ {apptForm.time}</strong>{" "}
                      has been submitted. I'll confirm shortly.
                    </p>
                    <button className="ct2-success-action" onClick={() => setApptSubmitted(false)}>
                      Book Another Slot
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApptSubmit} className="ct2-form-inner">
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                      <h3 className="ct2-form-title">Schedule a Consultation</h3>
                      <span className="ct2-form-meta">Mon–Fri · PKT</span>
                    </div>

                    <div className="ct2-row">
                      <div className="ct2-field">
                        <label className="ct2-label">Your Name *</label>
                        <input className="ct2-input" type="text" required placeholder="Muhammad Ali"
                          value={apptForm.name} onChange={e => setApptForm({ ...apptForm, name: e.target.value })} />
                      </div>
                      <div className="ct2-field">
                        <label className="ct2-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          Your Email *
                          {apptEmailTouched && apptForm.email && (
                            apptEmailValid
                              ? <CheckCircle2 size={11} style={{ color: "#2ed573" }} />
                              : <XCircle      size={11} style={{ color: "#fb7185" }} />
                          )}
                        </label>
                        <input
                          className="ct2-input"
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={apptForm.email}
                          onChange={e => setApptForm({ ...apptForm, email: e.target.value })}
                          onBlur={() => setApptEmailTouched(true)}
                          style={apptEmailTouched && apptForm.email
                            ? { borderColor: apptEmailValid ? "rgba(46,213,115,0.45)" : "rgba(251,113,133,0.55)" }
                            : {}}
                        />
                        {apptEmailTouched && apptForm.email && !apptEmailValid && (
                          <p className="ct2-error" style={{ marginTop: 4 }}>
                            <AlertCircle size={12} /> Please enter a valid email address (e.g. name@domain.com)
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="ct2-field">
                      <label className="ct2-label">Select Date (Weekdays Only) *</label>
                      <input className="ct2-date" type="date" required
                        min={new Date().toISOString().split("T")[0]} onChange={handleDateChange} />
                      {weekendError && (
                        <p className="ct2-error"><AlertCircle size={13} /> {weekendError}</p>
                      )}
                    </div>

                    <div className="ct2-field">
                      <label className="ct2-label">Time Slot (PKT) *</label>
                      <div className="ct2-slots">
                        {timeSlots.map(slot => {
                          const isDisabled = apptForm.date ? isSlotDisabled(apptForm.date, slot) : false;
                          return (
                            <button
                              type="button" key={slot} disabled={isDisabled}
                              className={`ct2-slot${apptForm.time === slot ? " active" : ""}`}
                              onClick={() => setApptForm({ ...apptForm, time: slot })}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="ct2-field">
                      <label className="ct2-label">Agenda / Topic</label>
                      <textarea className="ct2-textarea" rows={3}
                        placeholder="Briefly describe what you'd like to discuss..."
                        value={apptForm.message} onChange={e => setApptForm({ ...apptForm, message: e.target.value })} />
                    </div>

                    <button type="submit" className="ct2-submit" disabled={apptSending}>
                      <Calendar size={15} />
                      {apptSending ? "Submitting..." : "Confirm Appointment Request"}
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <p className="ct2-footnote">
        Typically responds within 24 hours · Karachi, Pakistan (PKT, UTC+5)
      </p>
    </section>
  );
}