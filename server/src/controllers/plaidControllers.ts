import { Request, Response } from 'express';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { plaidClient } from '../lib/plaid';
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { addFundingSource, createDwollaCustomer } from '../lib/dwolla';
import User from '../models/User';
import Bank from '../models/Bank';


export const createLinkToken = async (req: Request, res: Response): Promise<void> => {
  const { cognitoId } = req.body;
  const user = await User.findOne({ cognitoId });
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  } 

  const { given_name, family_name } = user;

  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: cognitoId },
      client_name: `${given_name} ${family_name}`,
      language: "en",
      products: ['auth'] as Products[],
      country_codes: ['US'] as CountryCode[],
    });

    res.json({ linkToken: response.data.link_token });
  } catch (err) {
    res.status(500).json({ error: "Could not create link token" });
  }
};

export const exchangePublicToken = async (req: Request, res: Response): Promise<void> => {
  const { _id, public_token } = req.body;

  try {
    const tokenResponse = await plaidClient.itemPublicTokenExchange({ public_token });
    const accessToken = tokenResponse.data.access_token;
    const itemId = tokenResponse.data.item_id;

    const accountsResponse = await plaidClient.accountsGet({ access_token: accessToken });
    const accountData = accountsResponse.data.accounts[0];

    // create a processor token for Dwolla
    const processorTokenResponse = await plaidClient.processorTokenCreate({
        access_token: accessToken,
        account_id: accountData.account_id,
        processor: ProcessorTokenCreateRequestProcessorEnum.Dwolla,
    });
    const processorToken = processorTokenResponse.data.processor_token;

    // get dwollaCustomerId from the database
    const user = await User.findById(_id);
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    const { dwollaCustomerId } = user;
    
    if (!dwollaCustomerId) {
        res.status(404).json({ error: "dwollaCustomerId not found" });
        return;
    }

    // create a funding source in Dwolla
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    if (!fundingSourceUrl) throw Error;

    // create bank account in database
    const bankAccount = new Bank({
      userId: _id,
      accountId: accountData.account_id,
      bankId: itemId,
      accessToken,
      fundingSourceUrl,
      shareableId: btoa(accountData.account_id),
    });

    try {
        await bankAccount.save();
    }
    catch (error: any) {
        res.status(500).json({ message: `Error saving bank account: ${error.message}` });
        return;
    }
    res.status(201).json({message: "Public token exchanged successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to exchange token" });
  }
};
