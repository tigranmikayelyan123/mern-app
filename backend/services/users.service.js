const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../database');

const getUserByEmail = async (userEmail) => {
  const user = await User.findOne({ email: userEmail });

  return user;
};

const addCityToUser = async (userId, cityName) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $push: { cities: cityName } },
    { new: true },
  );
  return user;
};

const findUserCities = async (userId) => {
  const user = await User.findById(userId);
  return user.cities;
};

const createHashedPassword = async (userPassword) => bcrypt.hash(userPassword, 12);

const createAndSaveUser = async (userName, userEmail, userHashedPassword) => {
  const user = new User({
    name: userName,
    email: userEmail,
    password: userHashedPassword,
  });

  await user.save();

  return user;
};

const createToken = async (user) => {
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' },
  );

  return token;
};

const comparePasswords = async (user, userPassword) => bcrypt.compare(userPassword, user.password);

module.exports = {
  getUserByEmail,
  createHashedPassword,
  createAndSaveUser,
  createToken,
  comparePasswords,
  addCityToUser,
  findUserCities,
};
