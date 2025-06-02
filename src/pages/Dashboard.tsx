import WalletOverview from '@/components/dashboard/WalletOverview';
import DepositFunds from "@/components/dashboard/DepositFunds";
import TransferFunds from "@/components/dashboard/TransferFunds";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import Bookings from "@/components/dashboard/Bookings";
import { useWallet } from '@/context/WalletContext';

const Dashboard = () => {
  const { walletState } = useWallet();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WalletOverview balance={walletState.balance} />
        <DepositFunds />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Bookings />
        <TransferFunds />
        <TransactionHistory />
      </div>
    </div>
  );
};

export default Dashboard;