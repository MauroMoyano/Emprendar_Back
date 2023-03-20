const {
  userCreate,
  getAllUsers,
  userByID,
  getAllUserByName,
  updateUser,
  deleteUser,
  confirmeUser,
  authUser,
<<<<<<< HEAD
  deleteUserByAdmin,
  getAllUserInfoAdmin
=======
  getAllUserInfoAdmin,
  resetPassword,
  comprobarToken,
<<<<<<< HEAD
  newPassword
>>>>>>> 3052e1ec3036011fca3e7ddce40ae24f0e850a5d
=======
  newPassword,
  changePassword
>>>>>>> 2073edbbf2c13f57eb22a91a489f86ae83924820
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
      const found = await getAllUsers(req.query);
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

const deleteUserByAdminHl = async function (req, res){
  try{
    const { id } = req.params
    const result = await deleteUserByAdmin(id)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

}



const resetPasswordHl = async (req, res) => {
  const { email } = req.body
  try {
    const response = await resetPassword(email)

    res.json(response)
  } catch (error) {
    console.log(error)
  }

}

const comprobarTokenHl = async (req, res) => {

  const { token } = req.params
  console.log(token)
  try {
    const response = await comprobarToken(token)
    res.status(200).json(response)
  } catch (error) {

    res.status(400).json({ error: error.message })
  }

}


const newPasswordHl = async (req, res) => {

  const { token } = req.params;

  const { password } = req.body

  try {
    const response = await newPassword(token, password)

    res.status(200).json(response)
  } catch (error) {
    res.status(400).json(error)
  }


}

const changePasswordHl = async (req,res) => {

  const {password, newPassword, verifyPassword} = req.body
  const {id}  = req.user
    try {
      const response = await changePassword(id,password, newPassword,verifyPassword)

      res.status(200).json(response)
    } catch (error) {
      res.status(400).json({error: error.message})
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
<<<<<<< HEAD
  deleteUserByAdminHl,
  authedUserhl
=======
  authedUserhl,
  resetPasswordHl,
  newPasswordHl,
<<<<<<< HEAD
  comprobarTokenHl
>>>>>>> 3052e1ec3036011fca3e7ddce40ae24f0e850a5d
=======
  comprobarTokenHl,
  changePasswordHl
>>>>>>> 2073edbbf2c13f57eb22a91a489f86ae83924820
};
// {}
