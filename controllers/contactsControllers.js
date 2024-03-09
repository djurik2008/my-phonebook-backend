import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.status(200).json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

export const createContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);
};

export const updateContact = (req, res) => {};
