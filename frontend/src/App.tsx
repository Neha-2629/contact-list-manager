import React, { useState, useEffect } from "react";
import { fetchContacts, addContact, editContact } from "./services/apiService";
import AddUserModal from "./components/AddUserModal";
import ContactList from "./components/ContactList";
import { Contact } from "./types/Contact";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
 

  const loadContacts = async () => {
    const response = await fetchContacts(search, page);
    setContacts(response.data.contacts); // Contacts from backend api resposne
    setTotalPages(response.data.totalPages); // Total number of pages
  };

  
  const handleAddUser = async (name: string, email: string) => {
    await addContact({ name, email });
    setIsModalOpen(false); // Close modal after adding
    loadContacts(); // Refresh contact list
  };

  useEffect(() => {
    loadContacts();
  }, [search, page]); // reload conatcts when serach or page changes

  const handlePageChange = (newPage: number) => {
    if(newPage > 0 && newPage <= totalPages){
      setPage(newPage);
    }
  };

  const handleEditUser = async (id: number, name: string, email: string) => {
    await editContact(id, {name, email});
    loadContacts();
  }
  return (
    <div className="flex items-center h-screen">
      <div className="relative md:min-w-[768px] lg:min-w-[1024px] m-auto">
        <div className="p-2">
          <Toaster/>
          <h1 className="text-3xl md:text-5xl font-bold my-4">Contact List</h1>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search contacts"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="input my-4 p-3 w-full md:w-96 border border-[#006DFF] text-lg rounded-lg"
            />
            <button 
              onClick={() => setIsModalOpen(true)}
              className="absolute top-4 right-2 md:relative md:top-0 md:right-0 btn btn-primary px-4 py-3 text-white text-lg font-semibold rounded-md bg-[#006DFF]"
            >
              + Add User
            </button>
          </div>
          
          {(contacts.length > 0) ? <ContactList contacts={contacts} onDelete={loadContacts} onEdit={handleEditUser}/> : <div>No Contacts found.</div> }
        
          <div className="flex justify-center gap-12 mt-7">
            <button
              onClick={() => handlePageChange(page - 1)}
              className="btn btn-secondary w-20 border border-gray-300 px-2 py-1 rounded-lg"
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="my-auto">Page {page} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              className="btn btn-secondary w-20 border border-gray-300 px-2 py-1 rounded-lg"
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
          {isModalOpen && (
            <AddUserModal onClose={() => setIsModalOpen(false)} onSubmit={handleAddUser} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;



