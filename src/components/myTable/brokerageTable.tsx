'use client';

import { useState } from 'react';
interface Brokerage {
  _id: string;
  brokerageName: string;
  brokerage: string;
  loginName: string;
  password: string;
  accountNumber: string;
  apiInfo: string;
  apiLink: string;
  name?: string;
  email?: string;
  API_KEY?: string;
  SECRET_KEY?: string;
  liveTrading?: boolean;
}

const BrokerageTable = ({ data , SelectTrader }: { data: Brokerage[] , SelectTrader: (trader: any) => void}) => {
  

  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-primary/10 dark:bg-primary/5">
          <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
            No
          </th>
          <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
            Brokerage Name
          </th>
          <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
            API Key
          </th>
          <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
            Secret Key
          </th>
          <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
            Live Trading
          </th>
          <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((brokerage , index) => (
          <tr key={index} className="border-b cursor-pointer border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <td className="px-4 py-3 text-sm text-center text-gray-700 dark:text-gray-300">{index + 1}</td>
            <td className="px-4 py-3 text-sm text-center text-gray-700 dark:text-gray-300">{brokerage.brokerageName}</td>
            <td className="px-4 py-3 text-sm text-center text-gray-700 dark:text-gray-300">{brokerage.API_KEY || ""}</td>
            <td className="px-4 py-3 text-sm text-center text-gray-700 dark:text-gray-300">{brokerage.SECRET_KEY || ""}</td>
            <td className="px-4 py-3 text-sm text-center text-gray-700 dark:text-gray-300">
              <div className="flex items-center justify-center">
                <div className={`w-4 h-4 rounded-full ${brokerage.liveTrading ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="ml-2">{brokerage.liveTrading ? "Enabled" : "Disabled"}</span>
              </div>
            </td>
            <td className="px-4 py-3 text-center">
              <button
                className="rounded-lg bg-red-500 px-3 py-1 text-sm text-center text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                onClick={() => SelectTrader(brokerage)}
              >
                Update
              </button>
            </td>
          </tr>
          ))
        }
        
      </tbody>
    </table>
  );
};

export default BrokerageTable;
