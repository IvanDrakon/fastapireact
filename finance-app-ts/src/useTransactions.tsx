import { useState, useEffect } from "react";
import api from "./api";

type Transaction = {
  id: number;
  amount: string;
  category: string;
  description: string;
  is_income: number;
  date: string;
};

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions/");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error to fetch transactions: ", error);
    }
  };

  const deleteTransaction = async (id: number) => {
    try {
      await api.delete(`/transactions/${id}`);
      await fetchTransactions();
    } catch (error) {
      console.error("Error to delete transaction:", error);
    }
  };

  const createTransaction = async (data: Transaction) => {
    try {
      await api.post("/transactions/", data);
      await fetchTransactions();
    } catch (error) {
      console.error("Error to create transaction:", error);
    }
  };

  const updateTransaction = async (id: number, data: Transaction) => {
    try {
      await api.put(`/transactions/${id}`, data);
      await fetchTransactions();
    } catch (error) {
      console.error("Error to uptade the transaction:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    fetchTransactions,
    deleteTransaction,
    createTransaction,
    updateTransaction,
  };
};
