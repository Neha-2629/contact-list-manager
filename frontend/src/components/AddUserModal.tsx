import React, { useState } from "react";
import toast from "react-hot-toast";

interface AddUserModalProps {
  onClose: () => void;
  onSubmit: (name: string, email: string) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Both fields are required!");
      return;
    }
    onSubmit(name, email);
    toast.success("User Added Sucessfully!");
    setName("");
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white mx-4 md:mx-0 p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input border-gray-300 p-2 rounded-md border"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input border-gray-300 p-2 rounded-md border"
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary w-16 font-semibold border-gray-300 text-gray-700 p-2 rounded-md border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary p-2 w-16 font-semibold text-white rounded-md bg-green-500"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
