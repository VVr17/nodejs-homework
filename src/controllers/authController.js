import {
  setErrorResponse,
  setSuccessResponse,
} from '../helpers/setResponse.js';
import {
  login,
  signup,
  logout,
  getCurrentUser,
  updateSubscription,
} from '../services/authService.js';

export const signupController = async (req, res) => {
  const { email, password, subscription } = req.body;

  const newUser = await signup({ email, password, subscription });

  res.status(201).json(setSuccessResponse(201, newUser));
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const userData = await login(email, password);

  if (!userData) {
    return res
      .status(401)
      .json(setErrorResponse(401, 'Email or password is wrong'));
  }

  res.json(setSuccessResponse(200, userData));
};

export const logoutController = async (req, res) => {
  const { id: userId } = req.user;
  const user = await logout(userId);

  if (!user) {
    return res.status(401).json(setErrorResponse(401, 'Not authorized'));
  }

  res.status(204).send();
};

export const getCurrentUserController = async (req, res) => {
  const { id: userId } = req.user;
  const user = await getCurrentUser(userId);

  if (!user) {
    return res.status(401).json(setErrorResponse(401, 'Not authorized'));
  }

  res.json(setSuccessResponse(200, user));
};

// ! additional
export const updateSubscriptionController = async (req, res) => {
  await updateSubscription();
};
