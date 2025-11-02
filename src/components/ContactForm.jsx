import { useState } from "react";
import ContactDropdown from "./ContactDropdown.jsx";

const phoneRegex = /^(?:\+30)?69\d{8}$/; // +3069XXXXXXXX ή 69XXXXXXXX
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm() {
  const [therapist, setTherapist] = useState("");
  const [service, setService] = useState("");
  const [preferred, setPreferred] = useState(""); // "email" | "phone"
  const [errors, setErrors] = useState({});

  const validate = (fields) => {
    const newErrors = {};
    if (!fields.name?.trim()) newErrors.name = "Το ονοματεπώνυμο είναι υποχρεωτικό.";
    if (!fields.service?.trim()) newErrors.service = "Παρακαλώ επιλέξτε υπηρεσία.";
    if (!fields.therapist?.trim()) newErrors.therapist = "Παρακαλώ επιλέξτε θεραπευτή.";
    if (!fields.preferred) newErrors.preferred = "Παρακαλώ επιλέξτε τρόπο επικοινωνίας.";

    const p = (fields.phone || "").replace(/\s+/g, "");
    if (!p) newErrors.phone = "Το τηλέφωνο είναι υποχρεωτικό.";
    else if (!phoneRegex.test(p)) newErrors.phone = "Μη έγκυρο κινητό. Δεκτά: +3069XXXXXXXX ή 69XXXXXXXX.";

    const v = (fields.email || "").trim();
    if (fields.preferred === "email") {
      if (!v) newErrors.email = "Το email είναι υποχρεωτικό.";
      else if (!emailRegex.test(v)) newErrors.email = "Το email δεν είναι έγκυρο (π.χ. onoma@example.com).";
    } else if (v && !emailRegex.test(v)) {
      newErrors.email = "Το email δεν είναι έγκυρο (π.χ. onoma@example.com).";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const fields = {
      name: fd.get("name") || "",
      email: fd.get("email") || "",
      phone: fd.get("phone") || "",
      service,
      therapist,
      preferred,
      message: fd.get("message") || "",
    };

    const v = validate(fields);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    // συγχρόνισε τα hidden πριν το φυσικό submit
    form.elements.service.value = service;
    form.elements.therapist.value = therapist;
    form.elements.preferred.value = preferred;

    form.submit(); // φυσικό submit -> /contact-form-handler.php
  };

  return (
    <form
      id="contact"
      action="/contact-form-handler.php"
      method="POST"
      noValidate
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      {/* honeypot για bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

      {/* Name */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Ονοματεπώνυμο*</label>
        <input
          type="text"
          name="name"
          className={`w-full p-2.5 border rounded-lg text-gray-900 ${errors.name ? "border-red-500" : "border-gray-300"}`}
          aria-invalid={!!errors.name}
          required
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      {/* Preferred contact */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Επιλέξτε τρόπο επικοινωνίας*</label>
        <select
          name="preferred-select"
          className={`w-full p-2.5 border rounded-lg text-gray-900 bg-white ${errors.preferred ? "border-red-500" : "border-gray-300"}`}
          value={preferred}
          onChange={(e) => setPreferred(e.target.value)}
          aria-invalid={!!errors.preferred}
          required
        >
          <option value="" disabled>Επιλέξτε τρόπο επικοινωνίας</option>
          <option value="email">Email</option>
          <option value="phone">Τηλέφωνο</option>
        </select>
        {errors.preferred && <p className="mt-1 text-sm text-red-600">{errors.preferred}</p>}
      </div>

      {/* Email (conditional required) */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Email{preferred === "email" ? "*" : " (προαιρετικό)"}
        </label>
        <input
          type="email"
          name="email"
          inputMode="email"
          className={`w-full p-2.5 border rounded-lg text-gray-900 ${errors.email ? "border-red-500" : "border-gray-300"}`}
          aria-invalid={!!errors.email}
          required={preferred === "email"}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* Phone (always required) */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Τηλέφωνο Επικοινωνίας*</label>
        <input
          type="tel"
          name="phone"
          inputMode="tel"
          pattern="^(?:\+30)?69\d{8}$"
          title="Δεκτά: +3069XXXXXXXX ή 69XXXXXXXX"
          className={`w-full p-2.5 border rounded-lg text-gray-900 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
          aria-invalid={!!errors.phone}
          required
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      {/* Service (dropdown που ΔΕΝ αποδίδει hidden) */}
      <ContactDropdown
        label="Επιλέξτε Υπηρεσία*"
        options={[
          { label: "Ατομική Θεραπεία" },
          { label: "Θεραπεία Ζεύγους" },
          { label: "Οικογενειακή Θεραπεία" },
          { label: "Συμβουλευτική Γονέων" },
          { label: "Online Ψυχοθεραπεία" },
          { label: "Βιωματικές Δράσεις" },
          { label: "Άλλο" },
        ]}
        value={service}
        onChange={setService}
      />
      {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service}</p>}

      {/* Therapist */}
      <ContactDropdown
        label="Επιλέξτε Θεραπευτή*"
        options={[{ label: "Εύη Καραβάνα" }, { label: "Χρήστος Κωστικίδης" }]}
        value={therapist}
        onChange={setTherapist}
      />
      {errors.therapist && <p className="mt-1 text-sm text-red-600">{errors.therapist}</p>}

      {/* Hidden που θα σταλούν στον server (ένα από το καθένα) */}
      <input type="hidden" name="service" value={service} />
      <input type="hidden" name="therapist" value={therapist} />
      <input type="hidden" name="preferred" value={preferred} />

      {/* Message */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Μήνυμα</label>
        <textarea name="message" rows="6" className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900" />
      </div>

      <button type="submit" className="w-full py-2.5 rounded-lg bg-white text-gray-800 hover:bg-primary hover:text-white">
        Αποστολή
      </button>
    </form>
  );
}
