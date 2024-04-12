import { updateUser } from "../../services/authServices";
import HttpError from "../../helpers/HttpError";
import ctrlWrapper from "../../decorators/ctrlWrapper";

const updateUserSubscription = async (req, res, next) => {
  const { subscription: newSubscription } = req.body;
  const { subscription, _id: id } = req.user;
  if (newSubscription === subscription) {
    return next(HttpError(409, "Already on current subscription"));
  }
  await updateUser({ _id: id }, { subscription: newSubscription });

  res.json(`Success, your subscription has update to ${newSubscription}`);
};

export default {
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
};
