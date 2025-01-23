import React from "react";

interface DeleteConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center">
      <div className="bg-white mx-4 md:mx-0 p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Delete Contact</h2>
        <p className="mb-6">Are you sure you want to delete this contact?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="btn btn-secondary w-12 font-semibold border-gray-300 text-gray-700 p-2 rounded-md border"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-danger w-12 p-2 font-semibold text-white rounded-md bg-red-500"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
