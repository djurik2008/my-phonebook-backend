import { listContacts, countContacts } from "../../services/contactsServices";
import ctrlWrapper from "../../decorators/ctrlWrapper";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const filter = req.query.favorite;
  const result = filter
    ? await listContacts({ owner, favorite: filter }, { skip, limit })
    : await listContacts({ owner }, { skip, limit });

  const total = filter
    ? await countContacts({ owner, favorite: filter })
    : await countContacts({ owner });
  res.json({
    result,
    total,
  });
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
};
