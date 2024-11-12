import {addUser, findUserById} from "../../../../../services/user-service.js";
import accountValidator from "../../../../../utils/validators/user-validator.js";

const registerUser = async (req, res) => {
   try {
      await accountValidator.validateAsync({ ...req.body });
   } catch (error) {
      res.status(400).json({ error: error.message || "Validation failed" });
   }

   await addUser(req, res);
};

export default registerUser;
