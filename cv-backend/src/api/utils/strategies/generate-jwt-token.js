import jwt from 'jsonwebtoken'

export const accessTokenGenerator = (user) => {
   return jwt.sign(
      {
         id: user.id,
      },
      "secret",
      {expiresIn: "1d"}
   )
}