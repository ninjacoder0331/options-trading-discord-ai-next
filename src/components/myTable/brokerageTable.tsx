'use client';

import { useState } from 'react';
import apiClient from '@/lib/axios';

interface Brokerage {
  id: string;
  brokerageName: string;
  brokerage: string;
  loginName: string;
  password: string;
  accountNumber: string;
  apiInfo: string;
  apiLink: string;
}

const BrokerageTable = () => {
  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/api/brokerage/${id}`);
      // Refresh table data after deletion
    } catch (error) {
      console.error('Error deleting brokerage:', error);
    }
  };

  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-primary/10 dark:bg-primary/5">
          <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
            Brokerage Name
          </th>
          <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
            Brokerage
          </th>
          <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
            Login Name
          </th>
          <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
            PW
          </th>
          <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
            Account #
          </th>
          <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
            Other API Info
          </th>
          <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
            API link
          </th>
          <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">TS1</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Tradestation</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">MW123@!</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">MWLoginPW</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">58934852935</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"></td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"></td>
          <td className="px-4 py-3">
            <button
              onClick={() => handleDelete('ts1-id')}
              className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">TS2</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Tradestation</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">MW123!</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">MWLoginPW</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">127417821</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"></td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"></td>
          <td className="px-4 py-3">
            <button
              onClick={() => handleDelete('ts2-id')}
              className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Tradier1</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Tradier</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">MWTR321</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">MWTradierPW</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">096489068923</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"></td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"></td>
          <td className="px-4 py-3">
            <button
              onClick={() => handleDelete('tradier1-id')}
              className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">TT1</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Tasty Trade</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">MW123!!!</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">TTMWPW123!</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">92319853</td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"></td>
          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"></td>
          <td className="px-4 py-3">
            <button
              onClick={() => handleDelete('tt1-id')}
              className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BrokerageTable;
