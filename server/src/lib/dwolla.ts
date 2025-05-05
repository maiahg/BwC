import { Client } from "dwolla-v2";

const getEnvironment = (): "production" | "sandbox" => {
  const environment = process.env.DWOLLA_ENV;

  switch (environment) {
    case "sandbox":
      return "sandbox";
    case "production":
      return "production";
    default:
      throw new Error(
        "Dwolla environment should either be set to `sandbox` or `production`"
      );
  }
};

const dwollaClient = new Client({
  environment: getEnvironment(),
  key: process.env.DWOLLA_KEY as string,
  secret: process.env.DWOLLA_SECRET as string,
});

export const createFundingSource = async ({
    customerId,
    fundingSourceName,
    plaidToken,
    _links,
}: {
    customerId: string;
    fundingSourceName: string;
    plaidToken: string;
    _links: object;
}) => {
  try {
    return await dwollaClient
      .post(`customers/${customerId}/funding-sources`, {
        name: fundingSourceName,
        plaidToken: plaidToken,
      })
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Creating a Funding Source Failed: ", err);
  }
};

export const createOnDemandAuthorization = async () => {
  try {
    const onDemandAuthorization = await dwollaClient.post(
      "on-demand-authorizations"
    );
    const authLink = onDemandAuthorization.body._links;
    return authLink;
  } catch (err) {
    console.error("Creating an On Demand Authorization Failed: ", err);
  }
};


export const createDwollaCustomer = async ({
  firstName,
  lastName,
  email,
  address1,
  city,
  state,
  postalCode,
  dateOfBirth,
  ssn,
  type,
}: {
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  type: "personal" | "business";
}) => {
  try {
    console.log("address1", address1);
    const response = await dwollaClient.post("customers", {
      firstName,
      lastName,
      email,
      address1,
      city,
      state,
      postalCode,
      dateOfBirth,
      ssn,
      type,
    });

    return response.headers.get("location");
  } catch (error) {
    console.error("Error creating Dwolla customer:", error);
  }
};

export const addFundingSource = async ({
    dwollaCustomerId,
    processorToken,
    bankName,
}: {
    dwollaCustomerId: string;
    processorToken: string;
    bankName: string;
}) => {
    try {
        const dwollaAuthLinks = await createOnDemandAuthorization();

        const fundingSourceOptions = {
            customerId: dwollaCustomerId,
            fundingSourceName: bankName,
            plaidToken: processorToken,
            _links: dwollaAuthLinks,
        };
        return await createFundingSource(fundingSourceOptions);
    } catch (error) {
        console.error("Error adding funding source:", error);
    }
};

