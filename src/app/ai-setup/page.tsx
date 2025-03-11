'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/lib/axios';

interface AISetup {
  strategyName: string;
  brokerageAccount: string;
  startingValue: number;
  maxTradeAmount: number;
  openPositions: number;
  maxDaysToHold: number;
  runAnalysis: '1min' | '5min' | '10min' | '30min';
  tradeType: 'Day' | 'Swing';
  instrumentType: 'Stocks' | 'Options';
  historicalStartDate: string;
  historicalEndDate: string;
  maxDaysHoldTrade: number;
  tradeDirection: 'Long' | 'Short' | 'Both';
  stopLoss: number;
  profitTaking: number;
}

export default function AISetup() {
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
  }, [])

  if(isLoading){
    return <div>Loading...</div>
  }
    return (
    <>
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">AI Setup</h1>
      
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
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">AI Strategy Name</td>
              <td className="px-6 py-4">
                <input type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Brokerage Account To Trade</td>
              <td className="px-6 py-4">
                <select className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                <option value="">Select Brokerage</option>
                  {brokerage.map((item: any , index: number) => (
                    <option key={index} className="text-sm text-gray-700 dark:text-gray-300" value={item.id}>
                        {item.brokerage}
                    </option>
                  ))}
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
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Max # of Days to Hold Each Trade</td>
              <td className="px-6 py-4">
                <input type="number" className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="#" />
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Run Analysis How Often?</td>
              <td className="px-6 py-4">
                <select className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                  <option value="1min">1min</option>
                  <option value="5min">5min</option>
                  <option value="10min">10min</option>
                  <option value="30min">30min</option>
                </select>
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Day or Swing Trade?</td>
              <td className="px-6 py-4">
                <select className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                  <option value="day">Day Trade</option>
                  <option value="swing">Swing Trade</option>
                </select>
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
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Historical Start Date</td>
              <td className="px-6 py-4">
                <input type="date" className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Historical End Date</td>
              <td className="px-6 py-4">
                <input type="date" className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Max Days to Hold Trade</td>
              <td className="px-6 py-4">
                <input type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="0 is day trade, 1+ is multiple days" readOnly />
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Long or Short or Both</td>
              <td className="px-6 py-4">
                <select className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                  <option value="long">Long</option>
                  <option value="short">Short</option>
                  <option value="both">Both</option>
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
              <td colSpan={2} className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">AI Comments to Feed In</td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Tickers To Trade</td>
              <td className="px-6 py-4">
                <input type="text" 
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
                  placeholder="Ie: All 500 stocks in the S&P 500" 
                />
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Technical Analysis</td>
              <td className="px-6 py-4">
                <textarea 
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
                  placeholder="Ie: look at the 5 minute, 1 day, 30 day and 50 day SMA, EMA and RSI to determine strategies for each Ticker" 
                />
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">News</td>
              <td className="px-6 py-4">
                <textarea 
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
                  placeholder="Scan Yahoo News to understand the sentiment of each stock that we're looking" 
                />
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">How Often to Check News</td>
              <td className="px-6 py-4">
                <input 
                  type="text" 
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
                  placeholder="Every 5 minutes on trading days" 
                />
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Other Notes to AI</td>
              <td className="px-6 py-4">
                <textarea 
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
                  placeholder="Ie: Examine the GAP UPS and GAP DOWNS overnight to determine when to enter/exit" 
                />
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Scan Internet On</td>
              <td className="px-6 py-4">
                <textarea className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="(specific trading techniques to tell AI to scan and understand)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        </div>
        
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">[SUBMIT FOR HISTORICAL] button</h2>
          <div className="overflow-x-auto rounded-lg bg-white shadow-md dark:bg-gray-800">
            <table className="w-full">
              <thead>
                <tr className="bg-primary/10 dark:bg-primary/5">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">Description</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">[will use the data to the left to provide instructions to AI]</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300"># of Trades</td>
                  <td className="px-6 py-4">
                    <input 
                      type="number" 
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
                      placeholder="#" 
                    />
                  </td>
                </tr>

                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300"># of Wins</td>
                  <td className="px-6 py-4">
                    <input 
                      type="number" 
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
                      placeholder="#" 
                    />
                  </td>
                </tr>

                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300"># of Loses</td>
                  <td className="px-6 py-4">
                    <input 
                      type="number" 
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
                      placeholder="#" 
                    />
                  </td>
                </tr>

                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Total P&L</td>
                  <td className="px-6 py-4">
                    <input 
                      type="number" 
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
                      placeholder="$#" 
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <button 
              className="rounded-lg bg-primary px-6 py-2 text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Submit Historical Data
            </button>
          </div>
        </div>
      </>
  );
}
