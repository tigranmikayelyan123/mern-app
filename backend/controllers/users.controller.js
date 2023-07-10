const { validationResult } = require('express-validator');
const HttpError = require('../utils/http-error');
const userService = require('../services/users.service');

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422),
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await userService.getUserByEmail(email);
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500,
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422,
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await userService.createHashedPassword(password);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500,
    );
    return next(error);
  }

  let createdUser;

  try {
    createdUser = await userService.createAndSaveUser(name, email, hashedPassword);
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500,
    );
    return next(error);
  }

  let token;
  try {
    token = await userService.createToken(createdUser);
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500,
    );
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await userService.getUserByEmail(email);
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500,
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403,
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await userService.comparePasswords(existingUser, password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500,
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403,
    );
    return next(error);
  }

  let token;
  try {
    token = await userService.createToken(existingUser);
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500,
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token,
  });
};

module.exports = {
  signup,
  login,
};
