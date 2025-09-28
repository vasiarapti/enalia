import { useState } from "react";
import ContactDropdown from "./ContactDropdown.jsx";

const phoneRegex = /^(?:\+30)?69\d{8}$/; // +3069XXXXXXXX or 69XXXXXXXX
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm() {
  const [therapist, setTherapist] = useState("");
  const [service, setService] = useState("");
  const [preferred, setPreferred] = useState(""); // "email" | "phone"
  const [errors, setErrors] = useState({});

  const validate = (fields) => {
    const newErrors = {};

    // Required basics
    if (!fields.name?.trim()) newErrors.name = "Το ονοματεπώνυμο είναι υποχρεωτικό.";
    if (!fields.preferred) newErrors.preferred = "Παρακαλώ επιλέξτε τρόπο επικοινωνίας.";
    if (!fields.service?.trim()) newErrors.service = "Παρακαλώ επιλέξτε υπηρεσία.";
    if (!fields.therapist?.trim()) newErrors.therapist = "Παρακαλώ επιλέξτε θεραπευτή.";
    

    // Preferred-specific requirements
    if (fields.preferred === "email") {
      if (!fields.email?.trim()) {
        newErrors.email = "Το email είναι υποχρεωτικό.";
      } else if (!emailRegex.test(fields.email.trim())) {
        newErrors.email = "Το email δεν είναι έγκυρο (π.χ. onoma@example.com).";
      }
      // Phone optional but validate if provided
      if (fields.phone?.trim() && !phoneRegex.test(fields.phone.replace(/\s+/g, ""))) {
        newErrors.phone = "Μη έγκυρο κινητό. Δεκτά: +3069XXXXXXXX ή 69XXXXXXXX.";
      }
    } else if (fields.preferred === "phone") {
      const phoneClean = (fields.phone || "").replace(/\s+/g, "");
      if (!phoneClean) {
        newErrors.phone = "Το τηλέφωνο είναι υποχρεωτικό.";
      } else if (!phoneRegex.test(phoneClean)) {
        newErrors.phone = "Μη έγκυρο κινητό. Δεκτά: +3069XXXXXXXX ή 69XXXXXXXX.";
      }
      // Email optional but validate if provided
      if (fields.email?.trim() && !emailRegex.test(fields.email.trim())) {
        newErrors.email = "Το email δεν είναι έγκυρο (π.χ. onoma@example.com).";
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
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

    if (Object.keys(v).length === 0) {
      e.currentTarget.submit();
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {/* Name */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Ονοματεπώνυμο*</label>
        <input
          type="text"
          name="name"
          className={`w-full p-2.5 border rounded-lg text-gray-900 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          onBlur={(e) =>
            setErrors((prev) => ({
              ...prev,
              name: !e.target.value.trim() ? "Το ονοματεπώνυμο είναι υποχρεωτικό." : undefined,
            }))
          }
          required
        />
        {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      {/* Preferred contact method */}
      <fieldset className="mt-2">
        <legend className="block mb-2 text-sm font-medium text-gray-900">
          Προτιμώμενος τρόπος επικοινωνίας*
        </legend>
        <div className="flex items-center gap-6">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="preferred"
              value="email"
              checked={preferred === "email"}
              onChange={() => setPreferred("email")}
              aria-invalid={!!errors.preferred}
              required
            />
            <span className="text-gray-900">Email</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="preferred"
              value="phone"
              checked={preferred === "phone"}
              onChange={() => setPreferred("phone")}
              aria-invalid={!!errors.preferred}
              required
            />
            <span className="text-gray-900">Κινητό</span>
          </label>
        </div>
        {errors.preferred && (
          <p className="mt-1 text-sm text-red-600">{errors.preferred}</p>
        )}
      </fieldset>

      {/* Email (required only if preferred === 'email') */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Email{preferred === "email" ? "*" : " (προαιρετικό)"}</label>
        <input
          type="email"
          name="email"
          inputMode="email"
          placeholder=" "
          className={`w-full p-2.5 border rounded-lg text-gray-900 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          onBlur={(e) => {
            const v = e.target.value.trim();
            setErrors((prev) => ({
              ...prev,
              email:
                preferred === "email"
                  ? (!v
                      ? "Το email είναι υποχρεωτικό."
                      : emailRegex.test(v) ? undefined : "Το email δεν είναι έγκυρο (π.χ. onoma@example.com).")
                  : (v && !emailRegex.test(v) ? "Το email δεν είναι έγκυρο (π.χ. onoma@example.com)." : undefined),
            }));
          }}
          required={preferred === "email"}
        />
        {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* Phone (required only if preferred === 'phone') */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Τηλέφωνο Επικοινωνίας{preferred === "phone" ? "*" : " (προαιρετικό)"}
        </label>
        <input
          type="tel"
          name="phone"
          inputMode="tel"
          placeholder=" "
          pattern="^(?:\+30)?69\d{8}$"
          title="Δεκτά: +3069XXXXXXXX ή 69XXXXXXXX"
          className={`w-full p-2.5 border rounded-lg text-gray-900 ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          onBlur={(e) => {
            const v = e.target.value.replace(/\s+/g, "");
            setErrors((prev) => ({
              ...prev,
              phone:
                preferred === "phone"
                  ? (!v
                      ? "Το τηλέφωνο είναι υποχρεωτικό."
                      : phoneRegex.test(v) ? undefined : "Μη έγκυρο κινητό. Δεκτά: +3069XXXXXXXX ή 69XXXXXXXX.")
                  : (v && !phoneRegex.test(v) ? "Μη έγκυρο κινητό. Δεκτά: +3069XXXXXXXX ή 69XXXXXXXX." : undefined),
            }));
          }}
          required={preferred === "phone"}
        />
        {errors.phone && <p id="phone-error" className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      {/* Service */}
      <ContactDropdown
        label="Επιλέξτε Υπηρεσία*"
        name="service"
        options={[
          { label: "Ατομική Θεραπεία" },
          { label: "Θεραπεία Ζεύγους" },
          { label: "Οικογενειακή Θεραπεία" },
          { label: "Συμβουλευτική Γονέων" },
          { label: "Online Ψυχοθεραπεία" },
          { label: "Βιωματικές Δράσεις" },
          { label: "Άλλο" },
        ]}
        onChange={setService}
      />
      {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service}</p>}

      {/* Therapist */}
      <ContactDropdown
        label="Επιλέξτε Θεραπευτή*"
        name="therapist"
        options={[{ label: "Εύη Καραβάνα" }, { label: "Χρήστος Κωστικίδης" }]}
        onChange={setTherapist}
      />
      {errors.therapist && <p className="mt-1 text-sm text-red-600">{errors.therapist}</p>}

      {/* Hidden inputs to ensure dropdown values are submitted */}
      <input type="hidden" name="service" value={service} />
      <input type="hidden" name="therapist" value={therapist} />
      <input type="hidden" name="preferred" value={preferred} />

      {/* Message */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Μήνυμα</label>
        <textarea
          name="message"
          rows="6"
          className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2.5 rounded-lg bg白 text-gray-800 hover:bg-primary hover:text-white"
      >
        Αποστολή
      </button>
    </form>
  );
}
