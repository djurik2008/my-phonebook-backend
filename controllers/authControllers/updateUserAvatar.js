import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";
import HttpError from "../../helpers/HttpError.js";
import { updateUser } from "../../services/authServices.js";

const avatarPath = path.resolve("public", "avatars");

const { PROJECT_URL } = process.env;

export const updateUserAvatar = async (req, res) => {
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
  const avatarUrl = `${PROJECT_URL}/${avatar}`;

  await updateUser({ _id: id }, { avatarUrl });

  res.json({
    avatarURL: avatarUrl,
  });
};
