const {
  userCreate,
  getAllUsers,
  userByID,
  getAllUserByName,
  updateUser,
  deleteUser,
  confirmeUser,
  authUser,
  getAllUserInfoAdmin,
  resetPassword,
  comprobarToken,
  newPassword
} = require("../user/userController");

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
    } else {
      const anUser = await getAllUserByName(name);
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

const putUserHandler = async function (req, res) {
  const { id } = req.params;
  try {
    const response = await updateUser(id, req.body);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUserHandler = async function (req, res) {
  const { id } = req.params;
  try {
    const response = await deleteUser(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const confirmeUserHl = async function (req, res) {
  const { token } = req.params

  try {
    const response = await confirmeUser(token)

    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}


const authUserHl = async function (req, res) {


  try {
    const response = await authUser(req.body)

    res.status(200).json(response)
  } catch (error) {

    res.status(400).json({ message: error.message })
  }

}

const authedUserhl = async function (req, res) {

    res.json(req.user)

}



/* handler de ADMIN. */

const getAllUserDataAdmin = async function (req, res) {
  try {
    let result = await getAllUserInfoAdmin()
    res.status(201).json(result)
  } catch (error) {
    res.status(406).json({ error: error.message })
  }
}



const resetPasswordHl =  async( req,res) => {
  const {email} = req.body
    try {
      const response = await resetPassword(email)

      res.json(response)
    } catch (error) {
      console.log(error)
    }

}

const comprobarTokenHl =  async( req,res) => {

    const {token} = req.params
    console.log(token)
    try {
      const response = await comprobarToken(token)
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }

}


const newPasswordHl =  async( req,res) => {

  const {token} = req.params;

const {password} = req.body

  try {
     const response = await newPassword(token,password)

     res.status(200).json(response)
  } catch (error) {
      console.log(error)
  }


}

module.exports = {
  postUserHanlder,
  getAllUsersHandler,
  getAllUserByIdHandler,
  putUserHandler,
  deleteUserHandler,
  confirmeUserHl,
  authUserHl,
  /* handlers ADMINS. */
  getAllUserDataAdmin,
  authedUserhl,
  resetPasswordHl,
  newPasswordHl,
  comprobarTokenHl
};
// {}
