
import React from "react"

const OpenPosition = () => {
    return (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-primary/10 dark:bg-primary/5">
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Open Positions
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Call/Put
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Analyst
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Entry
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Current Price
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Time in
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Profit per Contract
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  ROI
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Positions Open
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Sell 1/3
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Sell Half
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Sell All
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">AAPL</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  C Feb 5 $223
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">WiseGuy</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$1.50</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$2.50</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">35 mins</td>
                <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400">$1.00</td>
                <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400">60%</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">100%</td>
                <td className="px-4 py-3 text-center">
                  <button className="rounded-lg bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600">
                    Sell 1/3
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="rounded-lg bg-orange-500 px-3 py-1 text-xs text-white hover:bg-orange-600">
                    Sell Half
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="rounded-lg bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700">
                    Sell All
                  </button>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
    )
}

export default OpenPosition;