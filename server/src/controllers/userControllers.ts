import { Request, Response } from "express";
import User from "../models/User";
import { createDwollaCustomer } from "../lib/dwolla";

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
    const { cognitoId, given_name, family_name, email, address, dateOfBirth } = req.body;

    const dwollaCustomerUrl = await createDwollaCustomer({
      firstName: given_name,
      lastName: family_name,
      email,
      address: address.formatted,
      dateOfBirth,
      type: 'personal',
    });

    if (!dwollaCustomerUrl) {
      res.status(500).json({ message: "Error creating Dwolla customer" });
      return;
    }

    const dwollaCustomerId = dwollaCustomerUrl.split("/").pop();

    const user = new User({
      cognitoId,
      given_name,
      family_name,
      email,
      address: address.formatted,
      dateOfBirth,
      dwollaCustomerUrl,
      dwollaCustomerId,
    });

    try {
      await user.save();
    }
    catch (error: any) {
      res.status(500).json({ message: `Error saving user: ${error.message}` });
      return;
    }

    res.status(201).json(user);

  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating user: ${error.message}` });
  }
};