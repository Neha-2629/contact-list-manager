const pool = require("../../config/db");

const getAllContacts = async (search, limit, offset) => {
  // Query to fetch contacts with optional search, limit, and offset
  const query = search
    ? `SELECT * FROM contacts WHERE name ILIKE $1 OR email ILIKE $1 ORDER BY name ASC LIMIT $2 OFFSET $3`
    : `SELECT * FROM contacts ORDER BY name ASC LIMIT $1 OFFSET $2`;

  const values = search ? [`${search}%`, limit, offset] : [limit, offset];
  const result = await pool.query(query, values);

  // Query to get the total count of matching contacts
  const countQuery = search
    ? `SELECT COUNT(*) FROM contacts WHERE name ILIKE $1 OR email ILIKE $1`
    : `SELECT COUNT(*) FROM contacts`;

  const countValues = search ? [`%${search}%`] : [];
  const countResult = await pool.query(countQuery, countValues);
  console.log(countResult.rows[0]);
  return {
    contacts: result.rows, // Contacts for the current page
    totalCount: parseInt(countResult.rows[0].count, 10), // Total number of matching contacts
  };
};

const createContact = async (name, email) => {
  const query = "INSERT INTO contacts (name, email) VALUES ($1, $2) RETURNING *";
  const result = await pool.query(query, [name, email]);
  return result.rows[0];
};

const updateContact = async (id, name, email) => {
  const query = "UPDATE contacts SET name = $1, email = $2 WHERE id = $3 RETURNING *";
  const result = await pool.query(query, [name, email, id]);
  return result.rows[0];
};

const deleteContact = async (id) => {
  const query = "DELETE FROM contacts WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = { getAllContacts, createContact, updateContact, deleteContact };
