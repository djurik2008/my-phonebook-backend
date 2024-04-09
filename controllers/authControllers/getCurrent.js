import ctrlWrapper from "../../decorators/ctrlWrapper";

const getCurrent = async (req, res) => {
  const { username, email } = req.user;
  res.json({
    username,
    email,
  });
};

export default {
  getCurrent: ctrlWrapper(getCurrent),
};
