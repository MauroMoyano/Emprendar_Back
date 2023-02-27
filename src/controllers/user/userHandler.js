const { userCreate } = require("../user/userController");

const postUser = async function (req, res) {
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

module.exports = {
  postUser,
};
// {}
