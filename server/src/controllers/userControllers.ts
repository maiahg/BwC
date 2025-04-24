import { Request, Response } from "express";
import User from "../models/User";

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const user = await User.findOne({ cognitoId });

    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving user: ${error.message}` });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, name, email, address, dateOfBirth } = req.body;

    const user = new User({
        cognitoId,
        name,
        email,
        address: address.formatted,
        dateOfBirth,
        dwollaCustomerUrl: "",
        dwollaCustomerId: "",
    });

    await user.save();
    res.status(201).json(user);

  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating user: ${error.message}` });
  }
};