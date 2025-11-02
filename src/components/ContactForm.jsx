import { useState, useEffect } from "react";
import ContactDropdown from "./ContactDropdown.jsx";

const phoneRegex = /^(?:\+30)?69\d{8}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm() {
  const [therapist, setTherapist] = useState("");
  const [service, setService] = useState("");
  const [preferred, setPreferred] = useState("");
  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState(null); // {status: "success"|"error", message: string}
  const [ts, setTs] = useState("");

  useEffect(() => {
    setTs(String(Math.floor(Date.now() / 1000)));
  }, []);

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

  const handleSubmit = async (e) => {
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

    fd.set("service", service);
    fd.set("therapist", therapist);
    fd.set("preferred", preferred);
    fd.set("ts", ts);

    try {
      const res = await fetch("/contact-form-handler.php", { method: "POST", body: fd });
      if (res.ok) {
        setPopup({
          status: "success",
          message: "Το μήνυμά σας στάλθηκε με επιτυχία! Θα επικοινωνήσουμε σύντομα μαζί σας.",
        });
        form.reset();
        setService("");
        setTherapist("");
        setPreferred("");
      } else {
        const text = await res.text();
        setPopup({
          status: "error",
          message: text || "Παρουσιάστηκε σφάλμα. Παρακαλώ δοκιμάστε ξανά.",
        });
      }
    } catch {
      setPopup({
        status: "error",
        message: "Δεν ήταν δυνατή η αποστολή. Ελέγξτε τη σύνδεσή σας και προσπαθήστε ξανά.",
      });
    }
  };

  const closePopup = () => setPopup(null);

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-6 relative">
        <input type="hidden" name="service" value={service} />
        <input type="hidden" name="therapist" value={therapist} />
        <input type="hidden" name="preferred" value={preferred} />
        <input type="hidden" name="ts" value={ts} />

        {/* name */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Ονοματεπώνυμο*</label>
          <input
            type="text"
            name="name"
            className={`w-full p-2.5 border rounded-lg text-gray-900 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* preferred */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Επιλέξτε τρόπο επικοινωνίας*</label>
          <select
            value={preferred}
            onChange={(e) => setPreferred(e.target.value)}
            className={`w-full p-2.5 border rounded-lg text-gray-900 bg-white ${
              errors.preferred ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="" disabled>Επιλέξτε τρόπο επικοινωνίας</option>
            <option value="email">Email</option>
            <option value="phone">Τηλέφωνο</option>
          </select>
          {errors.preferred && <p className="mt-1 text-sm text-red-600">{errors.preferred}</p>}
        </div>

        {/* email */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Email{preferred === "email" ? "*" : " (προαιρετικό)"}
          </label>
          <input
            type="email"
            name="email"
            inputMode="email"
            className={`w-full p-2.5 border rounded-lg text-gray-900 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            required={preferred === "email"}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* phone */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Τηλέφωνο Επικοινωνίας*</label>
          <input
            type="tel"
            name="phone"
            inputMode="tel"
            pattern="^(?:\\+30)?69\\d{8}$"
            title="Δεκτά: +3069XXXXXXXX ή 69XXXXXXXX"
            className={`w-full p-2.5 border rounded-lg text-gray-900 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        {/* dropdowns */}
        <ContactDropdown
          label="Επιλέξτε Υπηρεσία*"
          options={[
            { label: "Ατομική Θεραπεία" },
            { label: "Θεραπεία Ζεύγους" },
            { label: "Οικογενειακή Θεραπεία" },
            { label: "Συμβουλευτική Γονέων" },
            { label: "Ομαδική Θεραπεία" },
            { label: "Online Ψυχοθεραπεία" },
            { label: "Βιωματικές Δράσεις" },
            { label: "Άλλο" },
          ]}
          value={service}
          onChange={setService}
        />
        {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service}</p>}

        <ContactDropdown
          label="Επιλέξτε Θεραπευτή*"
          options={[{ label: "Εύη Καραβάνα" }, { label: "Χρήστος Κωστικίδης" }]}
          value={therapist}
          onChange={setTherapist}
        />
        {errors.therapist && <p className="mt-1 text-sm text-red-600">{errors.therapist}</p>}

        {/* message */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Μήνυμα</label>
          <textarea name="message" rows="6" className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900" />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-white text-gray-800 hover:bg-primary hover:text-white"
        >
          Αποστολή
        </button>
      </form>

      {/* Popup Modal */}
      {popup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
          onClick={closePopup}
        >
          <div
            className={`bg-white p-6 rounded-lg shadow-lg max-w-sm mx-4 text-center ${
              popup.status === "success" ? "border-green-500" : "border-red-500"
            } border`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className={`text-lg font-semibold mb-2 ${
                popup.status === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {popup.status === "success" ? "Επιτυχία" : "Σφάλμα"}
            </h3>
            <p className="text-gray-700 mb-4">{popup.message}</p>
            <button
              onClick={closePopup}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
            >
              Κλείσιμο
            </button>
          </div>
        </div>
      )}
    </>
  );
}
