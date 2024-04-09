import bcrypt from "bcrypt";
import gravatar from "gravatar";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import HttpError from "../../helpers/HttpError.js";
import { findUser, signup } from "../../services/authServices.js";

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser({ email });

  if (user) {
    throw HttpError(409, "Email is alredy in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const userAvatar = gravatar.url(email, { s: "250", d: "wavatar" });

  const newUser = await signup({
    ...req.body,
    avatarUrl: userAvatar,
    password: hashPassword,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export default {
  signup: ctrlWrapper(signup),
};
