'use client';

import { useState } from 'react';
import apiClient from '@/lib/axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
interface Brokerage {
  _id: string;
  brokerageName: string;
  brokerage: string;
  loginName: string;
  password: string;
  accountNumber: string;
  apiInfo: string;
  apiLink: string;
}

const BrokerageTable = ({ data , setIsLoaded }: { data: Brokerage[] , setIsLoaded: (isLoaded: boolean) => void }) => {
  const router = useRouter();
  const handleDelete = async (brokerage: string) => {
    try {
      console.log("brokerage id", brokerage);
      await apiClient.post("/api/brokerage/deleteBrokerage", {brokerageId: brokerage});
      toast.success("Brokerage deleted successfully");
      // setIsLoaded(true);
      window.location.reload();
      // Refresh table data after deletion
    } catch (error) {
      toast.error("Error deleting brokerage");
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
        {
          data.map((brokerage , index) => (
          <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{brokerage.brokerageName}</td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{brokerage.brokerage}</td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{brokerage.loginName}</td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{brokerage.password}</td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{brokerage.accountNumber}</td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{brokerage.apiInfo}</td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{brokerage.apiLink}</td>
            <td className="px-4 py-3">
              <button
                onClick={() => handleDelete(brokerage._id)}
                className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/50"
              >
                Delete
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
