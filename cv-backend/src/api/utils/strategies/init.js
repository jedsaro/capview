import passport from 'passport';
import {findUserById, findUserByUserName, verifyPassword} from "../../services/user-service.js";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import LocalStrategy from 'passport-local';

passport.use(new LocalStrategy(
   {
      usernameField: "username",
      passwordField: "password"
   },
   function (username, password, done) {
      findUserByUserName(username)
         .then(findUser => {
            if (!findUser) throw new Error("User not found");
            if (!verifyPassword(password, findUser.password)) throw new Error("Bad Credentials");
            done(null, findUser);
         });
   }
));


const opts = {
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: "secret",
};

passport.use('jwt', new JwtStrategy(
opts, async (token, done) => {
   try {
      return done(null, token.user)
   } catch (e) {
      done(e)
   }
}));



//session only
// passport.serializeUser((user, done) => {
//    done(null, user.id);
// });
//
// passport.deserializeUser(async (id, done) => {
//    const user = await findUserById(id);
//    done(null, user);
// });
