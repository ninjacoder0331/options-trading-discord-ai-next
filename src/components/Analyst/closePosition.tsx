import React from "react"

const ClosePosition = ({closePositions}) => {
    return (
        <div className="overflow-x-auto rounded-lg bg-white p-6 shadow-1 dark:bg-gray-dark w-full" >
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-primary/10 dark:bg-primary/5">
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Closed Positions
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Entry
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
                {
                  closePositions.map((position , index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{position.symbol}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{position.entryPrice}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{position.closePrice}</td>
                      <td className={`px-4 py-3 text-sm ${(position.closePrice - position.entryPrice) >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'}`}>
                        {(position.closePrice - position.entryPrice).toFixed(2)}
                      </td>
                      <td className={`px-4 py-3 text-sm ${(position.closePrice - position.entryPrice) >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'}`}>
                        {((position.closePrice - position.entryPrice) / position.entryPrice * 100).toFixed(2)}%
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{position.analyst}</td>
                    </tr>
                  ))
                }
            </tbody>
          </table>
        </div>
    )
}

export default ClosePosition;