import { updateUser } from "../../services/authServices";
import ctrlWrapper from "../../decorators/ctrlWrapper";

const signout = async (req, res) => {
  const { _id } = req.user;
  await updateUser({ _id }, { token: "" });
  res.status(204).json();
};

export default {
  signout: ctrlWrapper(signout),
};
