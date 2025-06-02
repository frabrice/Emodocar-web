import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Transaction, WalletState } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';

interface WalletContextType {
  walletState: WalletState;
  depositFunds: (amount: number) => void;
  transferFunds: (userEmail: string, amount: number, note: string) => boolean;
  getTransactionHistory: () => Transaction[];
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const { currentUser } = useAuth();
  const { addNotification } = useNotification();
  
  // Initial state with mock data
  const [walletState, setWalletState] = useState<WalletState>({
    balance: 5000, // Initial balance in USD
    transactions: [
      {
        id: uuidv4(),
        date: new Date(2023, 5, 15),
        userEmail: 'user1@example.com',
        amount: 300,
        note: 'Monthly transfer',
        adminId: '1',
        type: 'transfer'
      },
      {
        id: uuidv4(),
        date: new Date(2023, 5, 10),
        userEmail: 'admin@emodocar.com',
        amount: 1000,
        note: 'Initial deposit',
        adminId: '1',
        type: 'deposit'
      }
    ]
  });

  const depositFunds = (amount: number) => {
    if (amount <= 0) {
      addNotification('error', 'Amount must be greater than zero');
      return;
    }

    const newTransaction: Transaction = {
      id: uuidv4(),
      date: new Date(),
      userEmail: currentUser?.email || 'admin@emodocar.com',
      amount,
      note: 'Admin wallet deposit',
      adminId: currentUser?.id || '1',
      type: 'deposit'
    };

    setWalletState(prev => ({
      balance: prev.balance + amount,
      transactions: [newTransaction, ...prev.transactions]
    }));

    addNotification('success', `Successfully deposited $${amount.toFixed(2)}`);
  };

  const transferFunds = (userEmail: string, amount: number, note: string): boolean => {
    if (amount <= 0) {
      addNotification('error', 'Amount must be greater than zero');
      return false;
    }

    if (amount > walletState.balance) {
      addNotification('error', 'Insufficient funds in admin wallet');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      addNotification('error', 'Invalid email format');
      return false;
    }

    const newTransaction: Transaction = {
      id: uuidv4(),
      date: new Date(),
      userEmail,
      amount,
      note: note || 'Transfer to user',
      adminId: currentUser?.id || '1',
      type: 'transfer'
    };

    setWalletState(prev => ({
      balance: prev.balance - amount,
      transactions: [newTransaction, ...prev.transactions]
    }));

    addNotification('success', `Successfully transferred $${amount.toFixed(2)} to ${userEmail}`);
    return true;
  };

  const getTransactionHistory = () => {
    return walletState.transactions;
  };

  return (
    <WalletContext.Provider value={{ walletState, depositFunds, transferFunds, getTransactionHistory }}>
      {children}
    </WalletContext.Provider>
  );
};