import React, { useState } from "react";
import { CircleDollarSign, Loader2, ExternalLink } from "lucide-react";
import { useWallet } from "@/context/WalletContext";

const DepositFunds = () => {
  const [amount, setAmount] = useState<string>("");
  const [currency, setCurrency] = useState<"RWF" | "USD">("RWF");
  const { depositFunds, isDepositLoading } = useWallet();

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    const depositAmount = parseFloat(amount);

    if (isNaN(depositAmount) || depositAmount <= 0) {
      return;
    }

    await depositFunds(depositAmount, currency);
    setAmount("");
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
          {/* Currency Selection */}
          <div>
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as "RWF" | "USD")}
              className="focus:ring-[#06347C] focus:border-[#06347C] block w-full sm:text-sm border-gray-300 rounded-md py-3 px-3"
              disabled={isDepositLoading}
            >
              <option value="RWF">RWF (Rwandan Franc)</option>
              <option value="USD">USD (US Dollar)</option>
            </select>
          </div>

          {/* Amount Input */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount ({currency})
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">
                  {currency === "RWF" ? "₣" : "$"}
                </span>
              </div>
              <input
                type="number"
                name="amount"
                id="amount"
                step="0.01"
                min="0"
                className="focus:ring-[#06347C] focus:border-[#06347C] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isDepositLoading}
                required
              />
            </div>
          </div>

          {/* Information Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex">
              <ExternalLink className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
              <div className="text-sm text-blue-700">
                <p className="font-medium">Payment Process:</p>
                <p className="mt-1">
                  After clicking "Deposit Funds", a payment link will open in a
                  new tab. Complete your payment there and return to see your
                  updated balance.
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isDepositLoading || !amount || parseFloat(amount) <= 0}
            className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-[#06347C] hover:bg-[#052a63] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#06347C] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDepositLoading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CircleDollarSign size={16} className="mr-2" />
                Deposit Funds
              </>
            )}
          </button>
        </form>

        {/* Status Information */}
        {isDepositLoading && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <div className="text-sm text-yellow-700">
              <p className="font-medium">Processing your deposit request...</p>
              <p className="mt-1">
                Please wait while we prepare your payment link.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositFunds;
