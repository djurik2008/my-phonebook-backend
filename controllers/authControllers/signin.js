import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUser, updateUser } from "../../services/authServices";
import ctrlWrapper from "../../decorators/ctrlWrapper";
import HttpError from "../../helpers/HttpError";

const { JWT_SECRET } = process.env;

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUser({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const { _id: id } = user;
  const payload = {
    id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  await updateUser({ _id: id }, { token });

  res.json({
    token: token,
    user: {
      username: user.username,
      email: user.email,
      subscription: user.subscription,
      avatarUrl: user.avatarUrl,
    },
  });
};

export default {
  signin: ctrlWrapper(signin),
};
