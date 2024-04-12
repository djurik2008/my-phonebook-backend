import ctrlWrapper from "../../decorators/ctrlWrapper";
import { addContact } from "../../services/contactsServices";

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await addContact({ ...req.body, owner });
  res.json(result);
};

export default {
  createContact: ctrlWrapper(createContact),
};
