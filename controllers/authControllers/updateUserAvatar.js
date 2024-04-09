import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";
import fs from "fs/promises";
import HttpError from "../../helpers/HttpError";
import { updateUser } from "../../services/authServices";
import ctrlWrapper from "../../decorators/ctrlWrapper";

const avatarPath = path.resolve("public", "avatars");

const updateUserAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "File was not uploaded");
  }

  const { _id: id } = req.user;
  const { path: oldPath, filename } = req.file;

  const resizeAvatar = await Jimp.read(oldPath);
  resizeAvatar.resize(250, 250);

  await resizeAvatar.writeAsync(oldPath);

  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);

  const avatar = path.join("avatars", filename);

  await updateUser({ _id: id }, { avatarUrl: avatar });

  res.json({
    avatarURL: avatar,
  });
};

export default {
  updateUserAvatar: ctrlWrapper(updateUserAvatar),
};
