import { CreditCard } from 'lucide-react';

interface WalletOverviewProps {
  balance: number;
}

const WalletOverview = ({ balance }: WalletOverviewProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Admin Wallet Overview</h2>
          <div className="h-10 w-10 rounded-full bg-[#06347C]/10 flex items-center justify-center text-[#06347C]">
            <CreditCard size={20} />
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-gray-500">Current Balance</p>
          <p className="text-3xl font-bold text-gray-900">${balance.toFixed(2)}</p>
        </div>
        
        <div className="text-sm text-gray-500">
          <p>Last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default WalletOverview;