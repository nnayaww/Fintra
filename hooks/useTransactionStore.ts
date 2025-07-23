// hooks/useTransactionStore.ts
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Transaction = {
  id: number;
  reference: string;
  userId: number;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
};

export const useTransactionStore = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      if (!token || !userId) return;

      const response = await fetch(
        `https://fintra-1.onrender.com/api/transactions/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: Transaction[] = await response.json();

      const successTransactions = data.filter((tx) => tx.status === "SUCCESS");
      const sorted = successTransactions.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setTransactions(sorted);
    } catch (e) {
      console.error("Transaction fetch failed", e);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    transactions,
    recentTransactions: transactions.slice(0, 10),
    loading,
    fetchTransactions,
  };
};
