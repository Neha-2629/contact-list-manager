import React, { useState } from "react";
import toast from "react-hot-toast";

interface EditContactModalProps {
  contact: { id: number; name: string; email: string };
  onClose: () => void;
  onSubmit: (id: number, name: string, email: string) => void;
}

const EditContactModal: React.FC<EditContactModalProps> = ({ contact, onClose, onSubmit }) => {
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Both fields are required!");
      return;
    }
    try {
      onSubmit(contact.id, name, email);
      toast.success("Contact updated successfully!");
      onClose(); // Close the modal after submitting
    } catch (error) {
      toast.error("Failed to update contact. Please Try again.");
      console.log("Error updating contact", error);
    }
   
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center">
      <div className="bg-white mx-4 md:mx-0 p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Contact</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input border-gray-300 p-2 rounded-md border"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input border-gray-300 p-2 rounded-md border"
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary w-16 font-semibold text-gray-700 border-gray-300 p-2 rounded-md border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary w-16 p-2 font-semibold text-white rounded-md bg-green-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContactModal;
