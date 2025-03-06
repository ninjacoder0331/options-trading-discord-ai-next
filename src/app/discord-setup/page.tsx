'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/lib/axios';

interface DiscordSetup {
  discordName: string;
  brokerageAccount: string;
  startingValue: number;
  maxTradeAmount: number;
  openPositions: number;
  instrumentType: 'Stocks' | 'Options';
  discordLink: string;
  tradeType: 'Day' | 'Swing';
  stopLoss: number;
  profitTaking: number;
  enterComments: string;
  exitComments: string;
  otherComments1: string;
  otherComments2: string;
}

export default function DiscordSetup() {

  const [brokerage, setBrokerage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getBrokerages = () => {
    return apiClient.get('/api/brokerage/getBrokerages')
      .then(response => {
        setBrokerage(response.data);
        setIsLoading(false);
        console.log(response.data);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    getBrokerages();
  })

  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Discord Setup</h1>
      
      <div className="overflow-x-auto rounded-lg bg-white shadow-md dark:bg-gray-800">
        <table className="w-full">
          <thead>
            <tr className="bg-primary/10 dark:bg-primary/5">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">Input</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Discord Name</td>
              <td className="px-6 py-4">
                <input type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
              </td>
            </tr>
            
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Brokerage Account To Trade</td>
              <td className="px-6 py-4">
                <select className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                  <option value="">Select Brokerage</option>
                  {/* Add your brokerage options here */}
                </select>
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Account Starting Value</td>
              <td className="px-6 py-4">
                <input type="number" className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="$" />
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Max Amount per Trade</td>
              <td className="px-6 py-4">
                <input type="number" className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="$" />
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Number of Open Positions At a Time</td>
              <td className="px-6 py-4">
                <input type="number" className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="#" />
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Stocks or Options</td>
              <td className="px-6 py-4">
                <select className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                  <option value="stocks">Stocks</option>
                  <option value="options">Options</option>
                </select>
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Link To Discord</td>
              <td className="px-6 py-4">
                <input type="url" className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="Weblink" />
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Day or Swing Trade</td>
              <td className="px-6 py-4">
                <select className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                  <option value="day">Day Trade</option>
                  <option value="swing">Swing Trade</option>
                </select>
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Stop Loss</td>
              <td className="px-6 py-4">
                <input type="number" className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="%" />
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Profit Taking</td>
              <td className="px-6 py-4">
                <input type="number" className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="%" />
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">AI Enter Comments</td>
              <td className="px-6 py-4">
                <textarea className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="Enter instructions" />
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">AI Exit Comments</td>
              <td className="px-6 py-4">
                <textarea className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="Exit instructions" />
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">AI Other Comments #1</td>
              <td className="px-6 py-4">
                <textarea className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">AI Other Comments #2</td>
              <td className="px-6 py-4">
                <textarea className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
