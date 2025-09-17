import { useState } from "react";
import ContactDropdown from "./ContactDropdown.jsx";

export default function ContactForm() {
  const [therapist, setTherapist] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!therapist || !service) {
      alert("Παρακαλώ επιλέξτε Θεραπευτή και Υπηρεσία.");
      return;
    }
    e.target.submit(); // submit if valid
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Ονοματεπώνυμο*</label>
        <input
          type="text"
          name="name"
          required
          className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Email*</label>
        <input
          type="email"
          name="email"
          required
          className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Τηλέφωνο Επικοινωνίας*</label>
        <input
          type="text"
          name="phone"
          required
          className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900"
        />
      </div>

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

      <ContactDropdown
        label="Επιλέξτε Θεραπευτή*"
        name="therapist"
        options={[{ label: "Εύη Καραβάνα" }, { label: "Χρήστος Κωστικίδης" }]}
        onChange={setTherapist}
      />

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
        className="w-full py-2.5 rounded-lg bg-white text-gray-800 hover:bg-primary hover:text-white"
      >
        Αποστολή
      </button>
    </form>
  );
}
