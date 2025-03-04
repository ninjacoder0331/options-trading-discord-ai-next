
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const MyTable = ({ traders }: { traders: any }) => {
  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white pl-5 pt-5">
        Traders Setup
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center">
            <TableHead className="!text-left">User</TableHead>
            <TableHead>Login</TableHead>
            <TableHead>PW</TableHead>
            <TableHead>Trade Amt$</TableHead>
            <TableHead>Analyst 1</TableHead>
            <TableHead>Analyst 2</TableHead>
            <TableHead>Analyst 3</TableHead>
            <TableHead>Analyst 4</TableHead>
            <TableHead>Stop Loss %</TableHead>
            <TableHead>Profit Taking %</TableHead>
            <TableHead>Brokerage Account</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {traders.map((trader, i) => (
            <TableRow
            key={i}
              className="text-center text-base font-medium text-dark dark:text-white"
            >
              <TableCell className="!text-left">{trader.name}</TableCell>
              <TableCell>{trader.email}</TableCell>
              <TableCell>{trader.password}</TableCell>
              <TableCell>${trader.tradeAmt}</TableCell>
              <TableCell>{trader.analyst1}</TableCell>
              <TableCell>{trader.analyst2}</TableCell>
              <TableCell>{trader.analyst3}</TableCell>
              <TableCell>{trader.analyst4}</TableCell>
              <TableCell className="text-red-500">{trader.stopLoss}%</TableCell>
              <TableCell className="text-green-500">{trader.profitTaking}%</TableCell>
              <TableCell className="text-blue-500">
                {trader.brokerageAccount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
  )
}

export default MyTable;
