import {accounts} from "../schemas/accounts_schema.js";
import initializeDB from "../../config/db.js";
import {eq} from "drizzle-orm";
import bcrypt from "bcrypt";
import {generate} from "generate-password";

const db = await initializeDB();

export const addUser = async (req, res) => {

   const {password, initialRoom: room, ...restInformation} = req.body;

   const salt = bcrypt.genSaltSync(10);

   // password generator
   const passwordHash = bcrypt.hashSync(password, salt);

   // room id generator
   let initialRoom = generate({length: 10, numbers: true})
   const roomHash = bcrypt.hashSync(initialRoom, salt);

   try {
      await db.insert(accounts).values({
         ...restInformation,
         room: roomHash,
         password: passwordHash,
      });

      res.status(201).json({message: "User registered successfully", user: req.body});
   } catch (error) {
      res.status(500).json({message: "Error registering user", error});
   }

}

export const findUserById = async (requestedId) => {
   try {
      return db.query.accounts.findFirst({where: eq(accounts.id, requestedId)});
   } catch (error) {
      throw new Error(error.message || "Account does not exist");
   }
}

export const findUserByUserName = async (usernameInput) => {
   try {
      return await db.query.accounts.findFirst({where: eq(accounts.username, usernameInput)});
   } catch (error) {
      throw new Error(error.message || "Account does not exist");
   }
}

export const getUserRoomID = async (requestedUser) => {
   try {
      const user = await findUserByUserName(requestedUser);
      return user.room
   } catch (error) {
      throw new Error(error.message || "Account does not exist");
   }
}

export const verifyPassword = (userInput, databasePassword) => {
   return bcrypt.compare(userInput, databasePassword)
}


export const deleteUser = (res, req) => {

}

export const getUser = (req, res) => {

}