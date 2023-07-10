const HttpError = require('../utils/http-error');
const userService = require('../services/users.service');

const addCity = async (req, res, next) => {
  const { name } = req.body;
  const { userId } = req.userData;

  try {
    await userService.addCityToUser(userId, name);
  } catch (err) {
    const error = new HttpError(
      'Adding the city failed, please try again later.',
      500,
    );
    return next(error);
  }

  res.json({
    name,
  });
};

const getCities = async (req, res, next) => {
  const { userId } = req.userData;
  let cities;

  try {
    cities = await userService.findUserCities(userId);
  } catch (err) {
    const error = new HttpError(
      'Getting cities failed, please try again later.',
      500,
    );
    return next(error);
  }

  if (!cities) {
    const error = new HttpError(
      'Could not find cities. Check your credentials',
      403,
    );
    return next(error);
  }

  res.json({
    cities,
  });
};

module.exports = {
  addCity,
  getCities,
};
