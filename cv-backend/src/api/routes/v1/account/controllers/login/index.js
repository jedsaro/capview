import {loginValidator} from "../../../../../utils/validators/user-validator.js";

const loginUser = async (req, res) => {
   try {
      loginValidator.validate({...req.body});
   } catch (error) {
      res.status(400).json({error: error.message || "Validation failed"});
   }
}

export default loginUser