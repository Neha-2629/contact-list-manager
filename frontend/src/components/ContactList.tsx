import React, { useState } from "react";
import { Contact } from "../types/Contact";
import { deleteContact} from "../services/apiService";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditContactModal from "./EditContactModal";
import toast from "react-hot-toast";


const ContactList: React.FC<{
  contacts: Contact[];
  onDelete: () => void;
  onEdit: (id: number, name: string, email: string) => Promise<void>;
}> = ({ contacts, onDelete, onEdit}) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

  const handleDelete = async () => {
    if (contactToDelete) {
      try {
        await deleteContact(contactToDelete.id);
        toast.success("UserContactDetails Deleted Successfully"); // Success notification
        onDelete(); // Refresh the contact list
        setContactToDelete(null); // Close the modal
      } catch (error) {
        toast.error("Failed to delete contact. Please try again.");
        console.error("Error deleting contact:", error);
      }
    }
  };

  return (
    <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {contacts.map((contact) => (
        <div key={contact.id} className="bg-white border shadow rounded-lg p-4">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 flex-none flex items-center justify-center rounded-full bg-blue-500 text-white text-3xl font-bold">
              {contact.name[0].toUpperCase()}
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold whitespace-nowrap">{contact.name}</h3>
              <p className="text-md text-gray-500">{contact.email}</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6 items-center">
            <button
             onClick={() => setContactToDelete(contact)} // Trigger delete confirmation modal
              className="btn btn-danger p-2 text-semibold rounded-lg bg-[#fca5a5]"
            >
              Delete
            </button>
            <div className="flex items-center">
            <button
              onClick={() => setSelectedContact(contact)}
              className="btn btn-warning w-full p-2 border rounded-lg bg-[#93c5fd]"
            >
              Edit
            </button>
              {/* Edit Contact Modal */}
                {selectedContact && (
                <EditContactModal
                  contact={selectedContact}
                  onClose={() => setSelectedContact(null)}
                  onSubmit={async (id, name, email) => {
                    await onEdit(id, name, email);
                    setSelectedContact(null);
                }}
              />
            )}

            {/* Delete Confirmation Modal */}
            {contactToDelete && (
              <DeleteConfirmationModal
                onClose={() => setContactToDelete(null)} // Close the modal
                onConfirm={handleDelete} // Confirm deletion
              />
            )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;









// OLD - CODE
// import React from "react";
// import { deleteContact } from "../services/apiService";

// const ContactList: React.FC<{
//   contacts: { id: number; name: string; email: string }[];
//   onDelete: () => void;
// }> = ({ contacts, onDelete }) => {
//   return (
//     <ul className="space-y-4">
//       {contacts.map((contact) => (
//         <li key={contact.id} className="flex justify-between">
//           <div>{contact.name} ({contact.email})</div>
//           <button
//             onClick={async () => {
//               await deleteContact(contact.id);
//               onDelete();
//             }}
//             className="btn btn-danger"
//           >
//             Delete
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default ContactList;
