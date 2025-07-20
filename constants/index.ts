import bitcoin from "@/assets/icons/bitcoin.png";
import chat from "@/assets/icons/chat.png";
import down from "@/assets/icons/down.png";
import home from "@/assets/icons/home.png";
import homeOutline from "@/assets/icons/homeOutline.png";
import info from "@/assets/icons/info.png";
import bell from "@/assets/icons/notification-bell.png";
import profile from "@/assets/icons/profile.png";
import qrcode from "@/assets/icons/qrcode.png";
import scan from "@/assets/icons/scan.png";
import send from "@/assets/icons/send.png";
import starOutline from "@/assets/icons/star-outline.png";
import star from "@/assets/icons/star.png";
import topUp from "@/assets/icons/topUp.png";
import user from "@/assets/icons/user.png";
import userOutline from "@/assets/icons/userOutline.png";
import usergroups from "@/assets/icons/usergroups.png";
import usergroupsOutline from "@/assets/icons/usergroupsOutline.png";
import BlackLogo from "@/assets/images/BlackLogo.png";
import GreenLogo from "@/assets/images/GreenLogo.png";
import QRCode from "@/assets/images/QRCode.png";
import applepay from "@/assets/images/applepay.jpg";
import clipboard from "@/assets/images/clipboard.png";
import googlepay from "@/assets/images/googlepay.jpg";
import mastercard from "@/assets/images/mastercard.jpg";
import nature from "@/assets/images/nature.jpg";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import paypal from "@/assets/images/paypal.jpg";
import visa from "@/assets/images/visa.jpg";
import countries from "world-countries";

export const images = {
  BlackLogo,
  GreenLogo,
  onboarding1,
  onboarding2,
  onboarding3,
  visa,
  googlepay,
  paypal,
  applepay,
  mastercard,
  QRCode,
  clipboard,
  nature,
};

export const icons = {
  chat,
  homeOutline,
  profile,
  home,
  user,
  userOutline,
  usergroups,
  usergroupsOutline,
  bitcoin,
  scan,
  qrcode,
  bell,
  info,
  send,
  down,
  topUp,
  star,
  starOutline,
};


export const onboarding = [
  {
    id: 1,
    title: "Send Money Across Borders With Ease",
    description:
      "Say goodbye to costly fees and complicated processes. Let's get started on simplifying your international transactions!",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "Safe and Secure Transactions",
    description:
      "Your financial data is encrypted and stored securely, ensuring that your money is in safe hands.",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Manage and Track Your Money in One Place",
    description:
      "Need to send money urgently? No problem! With FinTra, you can transfer funds quickly and conveniently, even on the go.",
    image: images.onboarding3,
  },
];

export const data = {
  onboarding,
};

export const formattedCountries = countries.map((country) => ({
  name: country.name.common,
  flag: `https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`,
  code: country.cca2,
}));

export const PaymentMethods = [
  {
    id: "1",
    name: "Paypal",
    status: "Connected",
    image: images.paypal,
  },
  { id: "2", name: "Google Pay", status: "Connected", image: images.googlepay },

  { id: "3", name: "Apple Pay", status: "Connected", image: images.applepay },
  {
    id: "4",
    name: "Mastercard",
    number: "**** **** **** 4679",
    status: "Connected",
    image: images.mastercard,
  },
  {
    id: "5",
    name: "Visa",
    number: "**** **** **** 5567",
    status: "Connected",
    image: images.visa,
  },
];

export function generateTransactionId() {
  return Date.now().toString();
}

export function generateReferenceId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length: 8 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

export function formatDate(date: Date) {
  return (
    date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    " · " +
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
}

export interface FormattedTransaction {
  id: string;
  name: string;
  time: string;
  amount: number;
  type: string;
  email: string;
  avatar?: string;
  transactionId: string;
  referenceId: string;
  status: string | undefined;
  date: string;
  category?: "Sent" | "Incoming Request" | "Income";
}
export interface TransactionSection {
  sectionTitle: string;
  data: FormattedTransaction[];
}

export const mockTransactions = [
  {
    id: "1",
    sender: "Alice",
    receiver: "Bob",
    note: "For pizza 🍕",
    amount: 12.5,
    time: "2h ago",

    email: "david@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    transactionId: generateTransactionId(),
    referenceId: generateReferenceId(),
    date: formatDate(new Date()),
    category: "Sent",
    status: "",
  },
  {
    id: "2",
    sender: "David",
    receiver: "Emily",
    note: "Rent",
    amount: 300,
    time: "1d ago",
    email: "david@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    transactionId: generateTransactionId(),
    referenceId: generateReferenceId(),
    date: formatDate(new Date()),
    category: "Income",
    status: "",
  },
  {
    id: "3",
    sender: "Mary",
    receiver: "Tim",
    note: "Food",
    amount: 500,
    time: "4d ago",

    email: "david@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    transactionId: generateTransactionId(),
    referenceId: generateReferenceId(),
    date: formatDate(new Date()),
    category: "Income",
    status: "",
  },
  {
    id: "4",
    sender: "Alex",
    receiver: "John",
    note: "woodwork",
    amount: 700,
    time: "6d ago",

    email: "david@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    transactionId: generateTransactionId(),
    referenceId: generateReferenceId(),
    date: formatDate(new Date()),
    category: "Incoming Request",
    status: "Unpaid",
  },
  {
    id: "5",
    sender: "Lily",
    receiver: "Susan",
    note: "Flowers",
    amount: 500,
    time: "3d ago",

    email: "david@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    transactionId: generateTransactionId(),
    referenceId: generateReferenceId(),
    date: formatDate(new Date()),
    category: "Incoming Request",
    status: "Declined",
  },
  {
    id: "6",
    sender: "John",
    receiver: "Martha",
    note: "Groceries",
    amount: 120,
    time: "1d ago",

    email: "david@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    transactionId: generateTransactionId(),
    referenceId: generateReferenceId(),
    date: formatDate(new Date()),
    category: "Sent",
  },
  {
    id: "7",
    sender: "Ronald Richards",
    receiver: "Mark",
    note: "Dinner",
    amount: 75,
    time: "5h ago",

    email: "david@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=4",
    transactionId: generateTransactionId(),
    referenceId: generateReferenceId(),
    date: formatDate(new Date()),
    category: "Income",
    status: "",
  },
  {
    id: "8",
    sender: "Michael",
    receiver: "Diana",
    note: "Taxi fare",
    amount: 15,
    time: "2d ago",

    email: "david@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    transactionId: generateTransactionId(),
    referenceId: generateReferenceId(),
    date: formatDate(new Date()),
    category: "Sent",
    status: "",
  },
  {
    id: "9",
    sender: "Emma",
    receiver: "Lucas",
    note: "Concert Tickets",
    amount: 300,
    time: "6h ago",
    email: "david@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=6",
    transactionId: generateTransactionId(),
    referenceId: generateReferenceId(),
    date: formatDate(new Date()),
    category: "Incoming Request",
    status: "Paid",
  },
  {
    id: "10",
    sender: "Oliver",
    receiver: "Sophia",
    note: "Birthday Gift",
    amount: 200,
    time: "4d ago",

    email: "david@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=7",
    transactionId: generateTransactionId(),
    referenceId: generateReferenceId(),
    date: formatDate(new Date()),
    category: "Sent",
    status: "",
  },
];
const allowedCategories = [
  "Sent",
  "Income",
  "Incoming Request",
  "Outgoing Request",
  "Top Up",
  "Withdraw",
] as const;

function getValidCategory(
  cat: string | undefined
): FormattedTransaction["category"] {
  return allowedCategories.includes(cat as any)
    ? (cat as FormattedTransaction["category"])
    : "Sent";
}
export const formatTransactions = (): TransactionSection[] => {
  const todayTransactions: FormattedTransaction[] = [];
  const yesterdayTransactions: FormattedTransaction[] = [];
  const olderTransactions: FormattedTransaction[] = [];

  mockTransactions.forEach((transaction) => {
    const category = getValidCategory(transaction.category);

    /* if (category === "Income") {
      amountStr = `+₵ ${transaction.amount.toFixed(2)}`;
    } else if (category === "Sent") {
      amountStr = `-₵ ${transaction.amount.toFixed(2)}`;
    } else if (category === "Incoming Request") {
      amountStr = `₵ ${transaction.amount.toFixed(2)}`;
    } */

    const formattedTransaction: FormattedTransaction = {
      id: transaction.id,
      name: transaction.sender,
      time: transaction.time,
      amount: transaction.amount,
      type: transaction.note,
      email: transaction.email,
      avatar: transaction.avatar,
      transactionId: transaction.transactionId,
      referenceId: transaction.referenceId,
      date: transaction.date,
      status: transaction.status,
      category,
    };

    if (transaction.time.includes("h ago")) {
      todayTransactions.push(formattedTransaction);
    } else if (transaction.time.includes("1d ago")) {
      yesterdayTransactions.push(formattedTransaction);
    } else {
      olderTransactions.push(formattedTransaction);
    }
  });

  const sections: TransactionSection[] = [];

  if (todayTransactions.length > 0) {
    sections.push({
      sectionTitle: "Today",
      data: todayTransactions,
    });
  }

  if (yesterdayTransactions.length > 0) {
    sections.push({
      sectionTitle: "Yesterday",
      data: yesterdayTransactions,
    });
  }

  if (olderTransactions.length > 0) {
    sections.push({
      sectionTitle: "Earlier",
      data: olderTransactions,
    });
  }

  return sections;
};

type Contact = {
  id: string;
  name: string;
  email: string;
  avatar: any;
  favorite: boolean;
};

const allContacts: Contact[] = [
  {
    id: "1",
    name: "Alexia Hershey",
    email: "alexia.hershey@gmail.com",
    avatar: "",
    favorite: true,
  },
  {
    id: "2",
    name: "Alfonzo Schuessler",
    email: "alfonzo.schuessler@gmail.com",
    avatar: "",
    favorite: false,
  },
  {
    id: "3",
    name: "Augustina Midgett",
    email: "augustina.midgett@gmail.com",
    avatar: "",
    favorite: true,
  },
  {
    id: "4",
    name: "Charlotte Hanlin",
    email: "charlotte.hanlin@gmail.com",
    avatar: "",
    favorite: false,
  },
  {
    id: "5",
    name: "Darron Kulikowski",
    email: "darron.kulikowski@gmail.com",
    avatar: "",
    favorite: false,
  },
  {
    id: "6",
    name: "Florencio Dorrance",
    email: "florencio.dorrance@gmail.com",
    avatar: "",
    favorite: true,
  },
  {
    id: "7",
    name: "Geoffrey Mott",
    email: "geoffrey.mott@gmail.com",
    avatar: "",
    favorite: false,
  },
  {
    id: "8",
    name: "Maryland Winkles",
    email: "maryland.winkles@gmail.com",
    avatar: "",
    favorite: false,
  },
  {
    id: "9",
    name: "Ines Carlisle",
    email: "ines.carlisle@gmail.com",
    avatar: "",
    favorite: true,
  },
  {
    id: "10",
    name: "Travis Redmond",
    email: "travis.redmond@gmail.com",
    avatar: "",
    favorite: false,
  },
  {
    id: "11",
    name: "Nia Riddle",
    email: "nia.riddle@gmail.com",
    avatar: "",
    favorite: false,
  },
  {
    id: "12",
    name: "Kareem Newton",
    email: "kareem.newton@gmail.com",
    avatar: "",
    favorite: true,
  },
  {
    id: "13",
    name: "Jolie Mathews",
    email: "jolie.mathews@gmail.com",
    avatar: "",
    favorite: false,
  },
  {
    id: "14",
    name: "Brycen Simmons",
    email: "brycen.simmons@gmail.com",
    avatar: "",
    favorite: false,
  },
];

export default allContacts;
