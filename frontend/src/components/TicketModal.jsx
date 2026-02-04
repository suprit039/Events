
import React, { useState } from "react";

const TicketModal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!email || !consent) {
      alert("Please enter email and give consent");
      return;
    }

    onSubmit({ email, consent });
    setEmail("");
    setConsent(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">
          Get Tickets
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring"
        />

        <label className="flex items-start gap-2 text-sm text-gray-600 mb-4">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1"
          />
          I agree to receive event-related emails.
        </label>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-black text-white rounded-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
