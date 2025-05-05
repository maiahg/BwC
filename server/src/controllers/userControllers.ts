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
    const { cognitoId, email } = req.body;

    const user = new User({
      cognitoId,
      email,
    });

    try {
      await user.save();
    }
    catch (error: any) {
      console.log(error);
      res.status(500).json({ message: `Error saving user: ${error.message}` });
      return;
    }

    res.status(201).json(user);

  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Error creating user: ${error.message}` });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const { given_name, family_name, address, city, state, postalCode, dateOfBirth, ssn } = req.body;

    const user = await User.findOne({ cognitoId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const email = user.email;

    let dwollaCustomerUrl = user.dwollaCustomerUrl;
    let dwollaCustomerId = user.dwollaCustomerId;

    if (!user.dwollaCustomerUrl) {
      dwollaCustomerUrl = await createDwollaCustomer({
      firstName: given_name,
      lastName: family_name,
      email,
      address1: address,
      city,
      state,
      postalCode,
      dateOfBirth,
      ssn,
      type: 'personal',
    });

    if (!dwollaCustomerUrl) {
      res.status(500).json({ message: "Error creating Dwolla customer" });
      return;
    }
      dwollaCustomerId = dwollaCustomerUrl.split("/").pop();

      user.dwollaCustomerUrl = dwollaCustomerUrl;
      user.dwollaCustomerId = dwollaCustomerId;
    }

    user.given_name = given_name;
    user.family_name = family_name;
    user.address = address;
    user.city = city;
    user.state = state;
    user.postalCode = postalCode;
    user.dateOfBirth = dateOfBirth;
    user.ssn = ssn;

    // if account status is pending, and all required fields are filled, set account status to active
    if (user.accountStatus === "pending" && user.given_name && user.family_name && user.address && user.city && user.state && user.postalCode && user.dateOfBirth && user.ssn && user.dwollaCustomerId && user.dwollaCustomerUrl) {
      user.accountStatus = "active";
    }

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
      .json({ message: `Error updating user: ${error.message}` });
  }
};