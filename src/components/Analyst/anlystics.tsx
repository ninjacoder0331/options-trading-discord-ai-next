import React from "react"

const Anlystics = () => {
    return (
        <div className="overflow-x-auto rounded-lg bg-white p-6 shadow-1 dark:bg-gray-dark w-full" >
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-primary/10 dark:bg-primary/5">
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Analyst
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Total Trades
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Exit
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Profit
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  ROI
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Analyst
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">TSLA</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$1.50</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$2.20</td>
                <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400">$0.70</td>
                <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400">68%</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Tommy</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">ORCL</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$2.00</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$3.00</td>
                <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400">$1.00</td>
                <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400">50%</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Johnny</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">NVDA</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$0.60</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$1.20</td>
                <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400">$0.60</td>
                <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400">200%</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">WiseGuy</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                <td className="px-4 py-3 text-sm italic text-gray-500" colSpan={6}>
                  Keeps on going...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    )
}

export default Anlystics;