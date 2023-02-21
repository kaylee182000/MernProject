import { RequestHandler } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import UserModel from "../models/user";

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) {
      return next(createHttpError(400, "Parameter missing"));
    }

    const existingName = await UserModel.findOne({ username: username }).exec();
    if (existingName) {
      throw createHttpError(409, "Username already in use");
    }

    const existingEmail = await UserModel.findOne({ email: email }).exec();
    if (existingEmail) {
      throw createHttpError(409, "Email already in use");
    }

    //hased password
    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    });

    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const signIn: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const passwordHashed = req.body.password;
  try {
    const userExis = await UserModel.findOne({ email: email }).exec();
    if (!userExis) {
      throw createHttpError(422, "User not found");
    } else {
      const doMatch = await bcrypt.compare(passwordHashed, userExis.password);
      if (!doMatch) {
        throw createHttpError(422, "Password mismatch");
      } else {
        res.redirect("/");
      }
    }
  } catch (error) {
    next(error);
  }
};
