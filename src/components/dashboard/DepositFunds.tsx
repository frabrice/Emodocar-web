import React, { useState } from 'react';
import { CircleDollarSign} from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

const DepositFunds = () => {
  const [amount, setAmount] = useState<string>('');
  const { depositFunds } = useWallet();
  
  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const depositAmount = parseFloat(amount);
    
    if (isNaN(depositAmount) || depositAmount <= 0) {
      return;
    }
    
    depositFunds(depositAmount);
    setAmount('');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Deposit Funds</h2>
          <div className="h-10 w-10 rounded-full bg-[#06347C]/10 flex items-center justify-center text-[#06347C]">
            <CircleDollarSign size={20} />
          </div>
        </div>
        
        <form onSubmit={handleDeposit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (USD)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                name="amount"
                id="amount"
                className="focus:ring-[#06347C] focus:border-[#06347C] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-[#06347C] hover:bg-[#052a63] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#06347C] transition-colors duration-200"
          >
            <CircleDollarSign size={16} className="mr-2" />
            Deposit Funds
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepositFunds;