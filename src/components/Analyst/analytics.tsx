const aggregatePositions = (positions) => {
  return Object.values(positions.reduce((acc, position) => {
    const analyst = position.analyst;
    const profit = (position.closePrice - position.entryPrice) * position.quantity;

    if (!acc[analyst]) {
      acc[analyst] = {
        _id: `${analyst}_combined`, // unique ID for combined record
        analyst: analyst,
        totalQuantity: 0,
        totalProfit: 0,
        trades: 0,
        symbols: new Set(), // track unique symbols
        firstDate: position.created_at,
        lastDate: position.created_at
      };
    }

    acc[analyst].totalQuantity += position.quantity;
    acc[analyst].totalProfit += profit;
    acc[analyst].trades += 1;
    acc[analyst].symbols.add(position.symbol);
    
    // Track date range

    return acc;
  }, {})).map(analyst => ({
    ...analyst,
    symbols: Array.from(analyst.symbols), // convert Set back to array
    averageProfit: analyst.totalProfit / analyst.trades
  }));
};

// Usage example:
const combinedPositions = aggregatePositions(closePositions);

// Example of how to display the data:
<table className="w-full">
  <thead>
    <tr>
      <th className="px-4 py-3 text-left">Analyst</th>
      <th className="px-4 py-3 text-left">Total Profit/Loss</th>
      <th className="px-4 py-3 text-left">Total Trades</th>
      <th className="px-4 py-3 text-left">Avg Profit/Trade</th>
      <th className="px-4 py-3 text-left">Symbols Traded</th>
      <th className="px-4 py-3 text-left">Date Range</th>
    </tr>
  </thead>
  <tbody>
    {combinedPositions.map((position) => (
      <tr key={position._id}>
        <td className="px-4 py-3">{position.analyst}</td>
        <td className={`px-4 py-3 ${position.totalProfit >= 0 
          ? 'text-green-600 dark:text-green-400' 
          : 'text-red-600 dark:text-red-400'}`}>
          ${position.totalProfit.toFixed(2)}
        </td>
        <td className="px-4 py-3">{position.trades}</td>
        <td className={`px-4 py-3 ${position.averageProfit >= 0 
          ? 'text-green-600 dark:text-green-400' 
          : 'text-red-600 dark:text-red-400'}`}>
          ${position.averageProfit.toFixed(2)}
        </td>
        <td className="px-4 py-3">{position.symbols.join(', ')}</td>
        <td className="px-4 py-3">
          {new Date(position.firstDate).toLocaleDateString()} - 
          {new Date(position.lastDate).toLocaleDateString()}
        </td>
      </tr>
    ))}
  </tbody>
</table> 