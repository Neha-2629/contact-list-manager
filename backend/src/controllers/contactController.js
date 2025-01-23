const { getAllContacts, createContact, updateContact,deleteContact } = require("../models/contactModel");

const fetchContacts = async (req, res) => {
  try {
    const { search = "", page = 1 } = req.query;
    const limit = 12; // Number of contacts per page
    const offset = (page - 1) * limit;
    const {contacts, totalCount} = await getAllContacts(search, limit, offset);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({contacts, totalPages});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addContact = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) throw new Error("Name and Email are required.");
    const newContact = await createContact(name, email);
    res.status(201).json(newContact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const editContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) throw new Error("Name and Email are required.");
    const updatedContact = await updateContact(id, name, email);

    if (!updatedContact) throw new Error("Contact not found.");
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await deleteContact(id);
    if (!deletedContact) throw new Error("Contact not found.");
    res.json(deletedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { fetchContacts, addContact, editContact, removeContact };
