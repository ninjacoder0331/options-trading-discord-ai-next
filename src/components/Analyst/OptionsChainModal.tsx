import { FC, useState } from 'react';
import CustomAlert from '../Alert/CustomAlert';

interface OptionsChainModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  contractData: any;
  symbol: string;
  date: string;
  optionType: string;
  setStrikePrice: (strikePrice: string) => void;
  setOrderSymbol: (orderSymbol: string) => void;
  setEntryPrice: (entryPrice: string) => void;
}

const OptionsChainModal: FC<OptionsChainModalProps> = ({ isOpen, onClose, data, contractData, symbol, date, optionType, setStrikePrice, setOrderSymbol, setEntryPrice }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);

  if (!isOpen) return null;

  console.log("Modal Data:", data); // Add this to debug

  return (
    <>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
        ></div>

        {/* Changed width and height to 3/4 of screen */}
        <div className="relative z-[1001] h-[75vh] w-[75vw] rounded-lg bg-white shadow-xl dark:bg-gray-800">
          {/* Header */}
          <div className="border-b border-gray-200 p-4 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Options Chain Data
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                    {symbol}
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    {date}
                  </span>
                  <span className={`rounded-full px-3 py-1 font-medium 
                    ${optionType === 'CALL' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                    {optionType}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Table Container with fixed height */}
          <div className="h-[calc(75vh-8rem)] overflow-auto p-4">
            {data ? (
              <table className="w-full table-auto border-collapse">
                <thead className="sticky top-0 bg-white dark:bg-gray-800">
                  <tr>
                    <th className="border-b border-gray-200 bg-gray-100 px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                      Strike Price
                    </th>
                    <th className="border-b border-gray-200 bg-gray-100 px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                      Bid Price
                    </th>
                    <th className="border-b border-gray-200 bg-gray-100 px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                      Ask Price
                    </th>
                    <th className="border-b border-gray-200 bg-gray-100 px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                      Closed Price
                    </th>
                    <th className="border-b border-gray-200 bg-gray-100 px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                      Size
                    </th>
                    <th className="border-b border-gray-200 bg-gray-100 px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                      Name
                    </th>
                    <th className="border-b border-gray-200 bg-gray-100 px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                      Symbol
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {data.snapshots && Object.entries(data.snapshots)
                    .sort(([, a], [, b]) => {
                      // Convert strike prices to numbers for comparison
                      const strikeA = Number((a as { strike_price?: string })?.strike_price) || 0;
                      const strikeB = Number((b as { strike_price?: string })?.strike_price) || 0;
                      return strikeA - strikeB; // ascending order
                      // use return strikeB - strikeA; for descending order
                    })
                    .map(([key, quote]: [string, any]) => (
                      <tr 
                        key={key} 
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => {
                          setSelectedQuote(quote);
                          setEntryPrice(quote.askPrice);
                          setAlertOpen(true);
                        }}
                      >
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                          {quote.strike_price || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                          {quote.bidPrice || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                          {quote.askPrice || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                          {quote.close_price || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                          {quote.size || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                          {quote.name || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                          {quote.root_symbol || '-'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <div className="py-4 text-center text-gray-500 dark:text-gray-400">
                No data available
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 w-full border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <CustomAlert
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={() => {
          // Handle your confirmation logic here
          console.log('Selected option:', {
            symbol,
            date,
            optionType,
            strike_price: selectedQuote?.strike_price,
            bidPrice: selectedQuote?.bidPrice,
            askPrice: selectedQuote?.askPrice
          });
          setStrikePrice(selectedQuote?.strike_price);
          setOrderSymbol(selectedQuote?.symbol);
          setAlertOpen(false);
        }}
        title="Confirm Option Selection"
        message={`Do you want to select ${symbol} ${optionType} option with strike price ${selectedQuote?.strike_price}?`}
      />
    </>
  );
};

export default OptionsChainModal; 