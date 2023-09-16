import { Request, Response } from "express";
import { message } from "../../dictionary";
import {createTransport} from 'nodemailer'
import dotenv from 'dotenv'

const sendConfirmEmail = async (req:Request, res:Response) => {
  dotenv.config()

    var transporter = createTransport({
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT as string),
        auth: {
          user: process.env.MAIL_AUTH_USER,
          pass: process.env.MAIL_AUTH_PASS
        }
      });
    const mailOptions = {
        from: 'teste@gmail.com', // sender address
        to: 'teste@hotmail.com', // receiver (use array of string for a list)
        subject: 'Subject of your email', // Subject line
        html: '<p>Your html here</p>'
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
};

export default sendConfirmEmail;

