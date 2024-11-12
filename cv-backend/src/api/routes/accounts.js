import {Router} from "express";
import registerUser from "./v1/account/controllers/register/index.js";
import passport from "passport";
import jwt from "jsonwebtoken";

export default () => {
   const api = Router()

   api.post('/register', registerUser)

   api.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
      res.json({
         message: 'You did it!',
      })
   })

   api.post('/login', (req, res, next) => {
      passport.authenticate('local', {session: false}, (err, user) => {
         if (err) {
            return next(err);
         }
         if (!user) {
            return res.status(401).json({message: 'Authentication failed'});
         }

         req.logIn(user, {session: false}, (err) => {
            if (err) {
               return next(err);
            }

            const body = {_id: user._id, email: user.email, username: user.username}
            const token = jwt.sign({user: body}, 'secret')

            return res.status(200).json({token: token, username: user.username, admin: true});
         });

      })(req, res, next);
   });

   api.get("/status", passport.authenticate("jwt", {session: false}), (request, response) => {
      return request.user ? response.send(request.user) : response.status(401);
   });

   api.post("/logout", (request, response) => {
      if (!request.user) return response.send(401);
      request.logout(() => {
         response.send(200)
      });
   });


   return api
}