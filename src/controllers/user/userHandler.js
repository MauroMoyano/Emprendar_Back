const { userCreate, getAllUsers, userByID } = require("../user/userController");

const postUserHanlder = async function (req, res) {
  const { name, email, password, profile_img } = req.body;

  try {
    if (name && email && password && profile_img) {
      const response = await userCreate(name, email, password, profile_img);
      res.status(200).send(response);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllUsersHandler = async function (req, res) {
  const { name } = req.query;
  try {
    if (name) {
      const found = await getAllUsers();
      res.status(200).send(found);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllUserByIdHandler = async function (req, res) {
  const { id } = req.params;
  try {
    const found = await userByID(id);
    res.status(200).send(found);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  postUserHanlder,
  getAllUsersHandler,
  getAllUserByIdHandler,
};
// {}
