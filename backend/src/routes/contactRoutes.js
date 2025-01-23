const express = require("express");
const { fetchContacts, addContact, editContact, removeContact } = require("../controllers/contactController");

const router = express.Router();

router.get("/contacts", fetchContacts);
router.post("/contacts", addContact);
router.put("/contacts/:id", editContact); 
router.delete("/contacts/:id", removeContact);

module.exports = router;
