import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEnumString(str: string) {
  return str.replace(/([A-Z])/g, " $1").trim();
}

export function formatPriceValue(value: number | null, isMin: boolean) {
  if (value === null || value === 0)
    return isMin ? "Any Min Price" : "Any Max Price";
  if (value >= 1000) {
    const kValue = value / 1000;
    return isMin ? `$${kValue}k+` : `<$${kValue}k`;
  }
  return isMin ? `$${value}+` : `<$${value}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cleanParams(params: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(params).filter(
      (
        [_, value] // eslint-disable-line @typescript-eslint/no-unused-vars
      ) =>
        value !== undefined &&
        value !== "any" &&
        value !== "" &&
        (Array.isArray(value) ? value.some((v) => v !== null) : value !== null)
    )
  );
}

type MutationMessages = {
  success?: string;
  error: string;
};

export const withToast = async <T>(
  mutationFn: Promise<T>,
  messages: Partial<MutationMessages>
) => {
  const { success, error } = messages;

  try {
    const result = await mutationFn;
    if (success) toast.success(success);
    return result;
  } catch (err) {
    if (error) toast.error(error);
    throw err;
  }
};

export const createNewUserInDatabase = async (
  user: any,
  idToken: any,
  fetchWithBQ: any
) => {
  const createUserResponse = await fetchWithBQ({
    url: "/users",
    method: "POST",
    body: {
      cognitoId: user.userId,
      given_name: idToken?.payload?.given_name || "",
      family_name: idToken?.payload?.family_name || "",
      email: idToken?.payload?.email || "",
      address: idToken?.payload?.address || "",
      dateOfBirth: idToken?.payload?.birthdate || "",
      dwollaCustomerUrl: "",
      dwollaCustomerId: "",
    },
  });

  if (createUserResponse.error) {
    throw new Error("Failed to create user record");
  }

  return createUserResponse;
};

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export function countTransactionCategories(
  transactions: Transaction[]
): CategoryCount[] {
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  // Iterate over each transaction
  transactions &&
    transactions.forEach((transaction) => {
      // Extract the category from the transaction
      const category = transaction.category;

      // If the category exists in the categoryCounts object, increment its count
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      } else {
        // Otherwise, initialize the count to 1
        categoryCounts[category] = 1;
      }

      // Increment total count
      totalCount++;
    });

  // Convert the categoryCounts object to an array of objects
  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  // Sort the aggregatedCategories array by count in descending order
  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}