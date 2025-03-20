import { FC, useState, useRef, useEffect } from 'react';
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
  currentPrice: number;
  setMidPrice: (midPrice: number) => void;
}

const OptionsChainModal: FC<OptionsChainModalProps> = ({ isOpen, onClose, data, contractData, symbol, date, optionType, setStrikePrice, setOrderSymbol, setEntryPrice, currentPrice, setMidPrice }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const targetRowRef = useRef<HTMLTableRowElement>(null);
  const [optionsData, setOptionsData] = useState<any>(null);

  useEffect(() => {
    if (targetRowRef.current && tableContainerRef.current) {
      const container = tableContainerRef.current;
      const targetRow = targetRowRef.current;
      
      // Calculate the scroll position to center the target row
      const containerHeight = container.clientHeight;
      const rowPosition = targetRow.offsetTop;
      const rowHeight = targetRow.clientHeight;
      const scrollPosition = rowPosition - (containerHeight / 2) + (rowHeight / 2);
      
      container.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });

      setOptionsData(data);
    }
  }, [data]); // Scroll when data changes

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
        <div className="relative z-[1001] h-[75vh] w-[40vw] rounded-lg bg-white shadow-xl dark:bg-gray-800">
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
                  <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    Current Price: {currentPrice.toFixed(2)}
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
          <div className="h-[calc(75vh-8rem)] overflow-auto p-4" ref={tableContainerRef}>
            {data ? (
              <table className="w-full table-auto border-collapse">
                <thead className="sticky top-0 bg-white dark:bg-gray-800">
                  <tr>
                    <th className="border-b border-gray-200 bg-gray-100 px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                      Strike Price
                    </th>
                    <th className="border-b border-gray-200 bg-gray-100 px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                      Mid Price
                    </th>
                    <th className="border-b border-gray-200 bg-gray-100 px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                      Bid Price
                    </th>
                    <th className="border-b border-gray-200 bg-gray-100 px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                      Ask Price
                    </th>
                    <th className="border-b border-gray-200 bg-gray-100 px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                      Symbol
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {data.snapshots && Object.entries(data.snapshots)
                    .sort(([, a], [, b]) => {
                      const strikeA = Number((a as { strike_price?: string })?.strike_price) || 0;
                      const strikeB = Number((b as { strike_price?: string })?.strike_price) || 0;
                      return strikeA - strikeB;
                    })
                    .map(([key, quote]: [string, any], index) => {
                      const strikePrice = Number(quote.strike_price) || 0;
                      const isNearCurrentPrice = Math.abs(strikePrice - currentPrice) <= 5;
                      
                      return (
                        <tr 
                          key={key} 
                          ref={isNearCurrentPrice ? targetRowRef : null}
                          className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                            quote.askPrice > currentPrice ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                          onClick={() => {
                            setSelectedQuote(quote);
                            setEntryPrice(quote.askPrice);
                            setMidPrice((quote.bidPrice + quote.askPrice)/2);
                            setStrikePrice(quote.strike_price);
                            setOrderSymbol(quote.symbol);
                            onClose()
                            // setAlertOpen(true);
                          }}
                        >
                          <td className="px-6 py-4 text-sm text-emerald-500 dark:text-emerald-400 font-bold">
                            {quote.strike_price || '-'}
                          </td>
                          <td className="px-6 py-4 text-sm text-rose-500 dark:text-rose-400 font-bold">
                            {((quote.bidPrice + quote.askPrice)/2).toFixed(2) || '-'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                            {quote.bidPrice || '-'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                            {quote.askPrice || '-'}
                          </td>
                          
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                            {quote.root_symbol || '-'}
                          </td>
                        </tr>
                      );
                    })}
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
          onClose();
        }}
        title="Confirm Option Selection"
        message={`Do you want to select ${symbol} ${optionType} option with strike price ${selectedQuote?.strike_price}?`}
      />
    </>
  );
};

export default OptionsChainModal; 