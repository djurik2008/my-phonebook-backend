import Contact from "../models/Contact.js";

export const listContacts = (filter = {}, settings = {}) =>
  Contact.find(filter, "-createdAt -updatedAt", settings).populate(
    "owner",
    "email"
  );

export const countContacts = (filter) => Contact.countDocuments(filter);

export const getContactByFilter = (filter) => Contact.findOne(filter);

export const removeContactByFilter = async (filter) =>
  Contact.findOneAndDelete(filter);

export const addContact = (data) => Contact.create(data);

export const updateContactByFilter = (filter, data) =>
  Contact.findOneAndUpdate(filter, data);
