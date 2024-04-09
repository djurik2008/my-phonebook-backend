import HttpError from "../../helpers/HttpError";
import ctrlWrapper from "../../decorators/ctrlWrapper";
import { getContactByFilter } from "../../services/contactsServices";

const getOneContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await getContactByFilter({ owner, _id: id });
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};

export default {
  getOneContact: ctrlWrapper(getOneContact),
};
