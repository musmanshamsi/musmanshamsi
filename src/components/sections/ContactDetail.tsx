import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { useSiteSettings } from "../../context/SiteSettingsContext";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "m.usman.shamsi.pak@gmail.com",
    href: "mailto:m.usman.shamsi.pak@gmail.com",
    cta: "Send Email",
    accent: "#d6b26f",
  },
  {
    icon: ExternalLink,
    label: "GitHub",
    value: "github.com/musmanshamsi",
    href: "https://github.com/musmanshamsi",
    cta: "Open GitHub",
    accent: "#a78bfa",
    external: true,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Karachi, Pakistan",
    href: null,
    cta: "Open to remote opportunities",
    accent: "#34d399",
  },
];

const timeSlots = ["10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function ContactDetail() {
  const { isDateBlackedOut, isSlotDisabled } = useSiteSettings();

  const [activeTab, setActiveTab] = useState<"email" | "appointment">("email");

  // Email Form State
  const [emailForm, setEmailForm] = useState({ name: "", email: "", message: "" });
  const [emailSending, setEmailSending] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Appointment Form State
  const [apptForm, setApptForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "10:00 AM",
    message: "",
  });
  const [weekendError, setWeekendError] = useState("");
  const [apptSending, setApptSending] = useState(false);
  const [apptSubmitted, setApptSubmitted] = useState(false);

  // Handle Direct Email Submit
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailForm.name || !emailForm.email || !emailForm.message) return;

    setEmailSending(true);

    // Save to LocalStorage Message Store
    try {
      const saved = localStorage.getItem("usman_portfolio_messages");
      const existing = saved ? JSON.parse(saved) : [];
      const newMsg = {
        id: "msg_" + Date.now(),
        senderName: emailForm.name,
        senderEmail: emailForm.email,
        subject: "Direct Portfolio Inquiry",
        message: emailForm.message,
        status: "unread",
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("usman_portfolio_messages", JSON.stringify([newMsg, ...existing]));
    } catch {
      // ignore
    }

    // Direct Form API submit
    try {
      await fetch("https://formsubmit.co/ajax/m.usman.shamsi.pak@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: emailForm.name,
          email: emailForm.email,
          message: emailForm.message,
          _subject: `New Portfolio Message from ${emailForm.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
    } catch {
      // Fallback
    }

    setEmailSending(false);
    setEmailSubmitted(true);
  };

  // Handle Date Selection for Appointment (Mon-Fri & Blackout check)
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDateStr = e.target.value;
    if (!selectedDateStr) {
      setApptForm((prev) => ({ ...prev, date: "" }));
      setWeekendError("");
      return;
    }

    if (isDateBlackedOut(selectedDateStr)) {
      setWeekendError("This date is unavailable. Please select another weekday.");
      setApptForm((prev) => ({ ...prev, date: "" }));
      return;
    }

    const dateObj = new Date(selectedDateStr + "T00:00:00");
    const dayOfWeek = dateObj.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setWeekendError("Appointments are available Monday through Friday only. Please select a weekday.");
      setApptForm((prev) => ({ ...prev, date: "" }));
    } else {
      setWeekendError("");
      setApptForm((prev) => ({ ...prev, date: selectedDateStr }));
    }
  };

  // Handle Appointment Submit
  const handleApptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!apptForm.name || !apptForm.email) return;

    if (!apptForm.date) {
      setWeekendError("Please select a valid weekday date.");
      return;
    }

    setApptSending(true);

    const newAppt = {
      id: "appt_" + Date.now(),
      name: apptForm.name,
      email: apptForm.email,
      date: apptForm.date,
      time: apptForm.time,
      message: apptForm.message,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };

    try {
      const saved = localStorage.getItem("usman_portfolio_appointments");
      const existing = saved ? JSON.parse(saved) : [];
      localStorage.setItem("usman_portfolio_appointments", JSON.stringify([newAppt, ...existing]));
    } catch {
      // ignore
    }

    setApptSending(false);
    setApptSubmitted(true);
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-12">
      {/* Hero Header */}
      <motion.div {...fadeUp(0)} className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-medium">
          <Mail size={14} /> Direct Connectivity & Scheduling
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Let’s Start a Conversation</h2>
        <p className="text-sm text-neutral-400">
          Have a project in mind, a job opportunity, or technical inquiry? Reach out via direct email or schedule a weekday meeting slot.
        </p>
      </motion.div>

      {/* Mode Selector Tabs */}
      <motion.div {...fadeUp(0.1)} className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-neutral-900 border border-neutral-800">
          <button
            onClick={() => setActiveTab("email")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "email" ? "bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20" : "text-neutral-400 hover:text-white"
            }`}
          >
            <Mail size={16} /> Send Direct Email
          </button>
          <button
            onClick={() => setActiveTab("appointment")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "appointment" ? "bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20" : "text-neutral-400 hover:text-white"
            }`}
          >
            <Calendar size={16} /> Book Weekday Appointment
          </button>
        </div>
      </motion.div>

      {/* TAB 1: DIRECT EMAIL FORM */}
      {activeTab === "email" && (
        <motion.div {...fadeUp(0.15)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Info Cards */}
          <div className="space-y-4">
            {contactLinks.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800/80 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-neutral-800 text-amber-400">
                      <Icon size={18} />
                    </div>
                    <span className="text-xs font-medium text-neutral-400">{item.label}</span>
                  </div>
                  <div className="text-sm font-semibold text-white font-mono">{item.value}</div>
                  {item.href && (
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold hover:underline pt-1"
                    >
                      {item.cta} &rarr;
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          {/* Form Container */}
          <div className="lg:col-span-2 p-6 md:p-8 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-xl">
            {emailSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-white">Message Dispatched!</h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Your message has been sent directly to <span className="text-amber-400 font-mono">m.usman.shamsi.pak@gmail.com</span>. I will get back to you shortly!
                </p>
                <button
                  onClick={() => setEmailSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-4">Send a Direct Message</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-xs font-semibold text-neutral-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={emailForm.name}
                      onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                      placeholder="Enter your full name..."
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/70"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs font-semibold text-neutral-300">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={emailForm.email}
                      onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                      placeholder="Enter your email address..."
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white font-mono placeholder-neutral-500 focus:outline-none focus:border-amber-500/70"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-xs font-semibold text-neutral-300">Message *</label>
                  <textarea
                    rows={5}
                    required
                    value={emailForm.message}
                    onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                    placeholder="Type your message here..."
                    className="w-full p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/70"
                  />
                </div>

                <button
                  type="submit"
                  disabled={emailSending}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-[0.99] disabled:opacity-50"
                >
                  {emailSending ? "Dispatching Message..." : "Send Direct Message"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      )}

      {/* TAB 2: APPOINTMENT BOOKING FORM */}
      {activeTab === "appointment" && (
        <motion.div {...fadeUp(0.15)} className="max-w-2xl mx-auto p-6 md:p-8 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-xl">
          {apptSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">Appointment Request Submitted!</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Your consultation request for <span className="text-amber-400 font-bold">{apptForm.date}</span> at{" "}
                <span className="text-amber-400 font-bold">{apptForm.time}</span> has been received.
              </p>
              <button
                onClick={() => setApptSubmitted(false)}
                className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white transition-colors"
              >
                Book Another Slot
              </button>
            </div>
          ) : (
            <form onSubmit={handleApptSubmit} className="space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="text-lg font-bold text-white">Schedule Weekday Consultation</h3>
                <span className="text-xs text-neutral-400 font-mono">Mon–Fri Only • PKT</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-xs font-semibold text-neutral-300">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={apptForm.name}
                    onChange={(e) => setApptForm({ ...apptForm, name: e.target.value })}
                    placeholder="Enter your full name..."
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/70"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs font-semibold text-neutral-300">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={apptForm.email}
                    onChange={(e) => setApptForm({ ...apptForm, email: e.target.value })}
                    placeholder="Enter your email address..."
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white font-mono placeholder-neutral-500 focus:outline-none focus:border-amber-500/70"
                  />
                </div>
              </div>

              {/* Date Picker */}
              <div>
                <label className="block mb-1 text-xs font-semibold text-neutral-300">Select Date (Weekday Only) *</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  onChange={handleDateChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-amber-500/70"
                />
                {weekendError && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle size={14} /> {weekendError}
                  </p>
                )}
              </div>

              {/* Time Slots */}
              <div>
                <label className="block mb-2 text-xs font-semibold text-neutral-300">Select Time Slot (PKT) *</label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {timeSlots.map((slot) => {
                    const isDisabled = apptForm.date ? isSlotDisabled(apptForm.date, slot) : false;
                    return (
                      <button
                        type="button"
                        key={slot}
                        disabled={isDisabled}
                        onClick={() => setApptForm({ ...apptForm, time: slot })}
                        className={`py-2 px-3 rounded-xl text-xs font-mono font-semibold transition-all border ${
                          apptForm.time === slot
                            ? "bg-amber-500 text-neutral-950 border-amber-400 shadow-md shadow-amber-500/20"
                            : isDisabled
                            ? "bg-neutral-950 text-neutral-600 border-neutral-900 cursor-not-allowed line-through"
                            : "bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block mb-1 text-xs font-semibold text-neutral-300">Agenda / Meeting Topic</label>
                <textarea
                  rows={3}
                  value={apptForm.message}
                  onChange={(e) => setApptForm({ ...apptForm, message: e.target.value })}
                  placeholder="Briefly state the goal for our call..."
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/70"
                />
              </div>

              <button
                type="submit"
                disabled={apptSending}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-[0.99] disabled:opacity-50"
              >
                {apptSending ? "Submitting Request..." : "Submit Appointment Request"}
              </button>
            </form>
          )}
        </motion.div>
      )}
    </div>
  );
}