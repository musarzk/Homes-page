import { OAuth2Client } from "google-auth-library";

import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const auth = async (req, res, next) => {

    try{

        const token = req.headers.authorization.split(' ')[1]
        const googleToken = token.length > 1000;
        if(googleToken) {
            const ticket = await client.verify({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            req.user = {id: payload.sub, name: payload.name, photoURL: payload.picture};

        }else{
            //to use the custom jwt verification
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const {id, name, photoURL} = decodedToken;
            req.user = {id, name, photoURL};



        }
        next();

    } catch (error) {
        console.log(error);
        res
          .status(404)
          .json({
            success: false,
            message: 'Oh something is wrong with your authorization!'
          })



    }
}

export default auth