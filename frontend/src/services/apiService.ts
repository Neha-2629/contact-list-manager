import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchContacts = (search: string, page: number) =>
  axios.get(`${API_URL}/contacts`, { params: { search, page } });

export const addContact = (contact: { name: string; email: string }) =>
  axios.post(`${API_URL}/contacts`, contact);


export const editContact = (id: number, contact: { name: string; email: string }) =>
  axios.put(`${API_URL}/contacts/${id}`, contact);

export const deleteContact = (id: number) =>
  axios.delete(`${API_URL}/contacts/${id}`);


