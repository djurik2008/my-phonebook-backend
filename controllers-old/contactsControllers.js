import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const filter = req.query.favorite;
  const result = filter
    ? await contactsService.listContacts(
        { owner, favorite: filter },
        { skip, limit }
      )
    : await contactsService.listContacts({ owner }, { skip, limit });

  const total = filter
    ? await contactsService.countContacts({ owner, favorite: filter })
    : await contactsService.countContacts({ owner });
  res.json({
    result,
    total,
  });
};

const getOneContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsService.getContactByFilter({ owner, _id: id });
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsService.removeContactByFilter({
    owner,
    _id: id,
  });
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await contactsService.addContact({ ...req.body, owner });
  res.json(result);
};

const updateContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsService.updateContactByFilter(
    { owner, _id: id },
    req.body
  );
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
