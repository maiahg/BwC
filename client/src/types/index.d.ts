import { AuthUser } from "aws-amplify/auth";

declare global {
  type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };

  type User = {
    cognitoInfo: AuthUser;
    userInfo: UserInfo;
  };

  type UserInfo = {
    _id: string;
    cognitoId: string;
    given_name: string;
    family_name: string;
    dwollaCustomerUrl: string;
    dwollaCustomerId: string;
    email: string;
    address: string;
    dateOfBirth: string;
  };

  type Account = {
    id: string;
    availableBalance: number;
    currentBalance: number;
    officialName: string;
    mask: string;
    institutionId: string;
    name: string;
    type: string;
    subtype: string;
    appwriteItemId: string;
    sharableId: string;
  };

  type Transaction = {
    id: string;
    $id: string;
    name: string;
    paymentChannel: string;
    type: string;
    accountId: string;
    amount: number;
    pending: boolean;
    category: string;
    date: string;
    image: string;
    $createdAt: string;
    channel: string;
    senderBankId: string;
    receiverBankId: string;
  };

  type Bank = {
    _id: string;
    accountId: string;
    bankId: string;
    accessToken: string;
    fundingSourceUrl: string;
    userId: string;
    sharableId: string;
  };

  type AccountTypes = "depository" | "credit" | "loan " | "investment" | "other";
  type Category = "Food and Drink" | "Travel" | "Transfer";

  type CategoryCount = {
    name: string;
    count: number;
    totalCount: number;
  };

  type Receiver = {
    firstName: string;
    lastName: string;
  };

  type TransferParams = {
    sourceFundingSourceUrl: string;
    destinationFundingSourceUrl: string;
    amount: string;
  };

  type AddFundingSourceParams = {
    dwollaCustomerId: string;
    processorToken: string;
    bankName: string;
  };

  type NewDwollaCustomerParams = {
    firstName: string;
    lastName: string;
    email: string;
    type: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string;
    ssn: string;
  };

  interface CreditCardProps {
    account: Account;
    userName: string;
    showBalance?: boolean;
  }

  interface BankInfoProps {
    account: Account;
    appwriteItemId?: string;
    type: "full" | "card";
  }

  interface HeaderBoxProps {
    type?: "title" | "greeting";
    title: string;
    subtext: string;
    user?: string;
  }

  interface MobileNavProps {
    user: UserInfo;
  }

  interface PageHeaderProps {
    topTitle: string;
    bottomTitle: string;
    topDescription: string;
    bottomDescription: string;
    connectBank?: boolean;
  }

  interface PaginationProps {
    page: number;
    totalPages: number;
  }

  interface PlaidLinkProps {
    user: UserInfo;
    variant?: "primary" | "ghost";
    dwollaCustomerId?: string;
  }

  interface AuthFormProps {
    type: "sign-in" | "sign-up";
  }

  interface BankDropdownProps {
    accounts: Account[];
    setValue?: UseFormSetValue<any>;
    otherStyles?: string;
  }

  interface BankTabItemProps {
    account: Account;
    appwriteItemId?: string;
  }

  interface TotalBalanceBoxProps {
    accounts: Account[];
    totalBanks: number;
    totalCurrentBalance: number;
  }

  interface FooterProps {
    user: UserInfo;
  }

  interface RightSidebarProps {
    user: UserInfo;
    transactions: Transaction[];
    banks: Bank[] & Account[];
  }

  interface SiderbarProps {
    user: UserInfo;
  }

  interface RecentTransactionsProps {
    accounts: Account[];
    transactions: Transaction[];
    appwriteItemId: string;
    page: number;
  }

  interface TransactionHistoryTableProps {
    transactions: Transaction[];
    page: number;
  }

  interface CategoryBadgeProps {
    category: string;
  }

  interface TransactionTableProps {
    transactions: Transaction[];
  }

  interface CategoryProps {
    category: CategoryCount;
  }

  interface DoughnutChartProps {
    accounts: Account[];
  }

  interface PaymentTransferFormProps {
    accounts: Account[];
  }

  interface getAccountsProps {
    userId: string;
  }

  interface getAccountProps {
    appwriteItemId: string;
  }

  interface getInstitutionProps {
    institutionId: string;
  }

  interface getTransactionsProps {
    accessToken: string;
  }

  interface CreateFundingSourceOptions {
    customerId: string;
    fundingSourceName: string;
    plaidToken: string;
    _links: object;
  }

  interface CreateTransactionProps {
    name: string;
    amount: string;
    senderId: string;
    senderBankId: string;
    receiverId: string;
    receiverBankId: string;
    email: string;
  }

  interface getTransactionsByBankIdProps {
    bankId: string;
  }

  interface signInProps {
    email: string;
    password: string;
  }

  interface getUserInfoProps {
    userId: string;
  }

  interface exchangePublicTokenProps {
    publicToken: string;
    user: UserInfo;
  }

  interface createBankAccountProps {
    accessToken: string;
    userId: string;
    accountId: string;
    bankId: string;
    fundingSourceUrl: string;
    sharableId: string;
  }

  interface getBanksProps {
    userId: string;
  }

  interface getBankProps {
    documentId: string;
  }

  interface getBankByAccountIdProps {
    accountId: string;
  }
}

export {};