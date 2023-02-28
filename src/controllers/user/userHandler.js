
const { userCreate, getAllUsers, userByID } = require("../user/userController");

const postUserHanlder = async function (req, res) {

  try {
      const response = await userCreate(req.body);
      res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllUsersHandler = async function (req, res) {
  const { name } = req.query;
  try {
    if (!name) {
      const found = await getAllUsers();
      res.status(200).json(found);
    }else{
      const anUser = await getAllUserByName;
      res.status(200).json(anUser);
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
