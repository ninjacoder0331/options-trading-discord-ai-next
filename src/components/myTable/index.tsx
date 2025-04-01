'use client'
import { useEffect } from "react";
import apiClient from "@/lib/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authService } from "@/services/auth.service";

// Add this interface if you don't have it
interface Brokerage {
  brokerageName: string;
  _id: string;
}

const TraderTable = () => {

  const [brokerage, setBrokerage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrokerage, setSelectedBrokerage] = useState('');
  const [tradeAmt, setTradeAmt] = useState('');
  const [editTraderId, setEditTraderId] = useState('');
  const [analysts, setAnalysts] = useState([]);
  const [traders, setTraders] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    login: '',
    password: '',
    tradeAmt: '',
    amount: '',
    stopLoss: '',
    profitTaking: ''
  });

  // Method 1: Using .then()
  useEffect(() => {
    setIsLoading(true);
    getBrokerages();
    getTraders();
    getAnalysts();
  }, []);

  const getTraders = () => {
    return apiClient.get('/api/trader/getTraders')
      .then(response => {
        setTraders(response.data);
        setIsLoading(false);
        // console.log(response.data);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error:', error);
      });
  }

  const getAnalysts = () => {
    return apiClient.get('/api/trader/getAnalysts')
      .then(response => {
        setAnalysts(response.data);
        setIsLoading(false);
        // console.log("analysts",response.data);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error:', error);
    });
  }


  const getBrokerages = () => {
    return apiClient.get('/api/brokerage/getBrokerages')
      .then(response => {
        setBrokerage(response.data);
        setIsLoading(false);
        // console.log(response.data);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error:', error);
      });
  };

  const handleBrokerageChange = (traderId: string, brokerageName: string) => {
    setSelectedBrokerage(brokerageName);
    console.log(traderId, brokerageName);
    apiClient.post("/api/trader/updateBrokerage", {
      traderId: traderId,
      brokerageName: brokerageName
    })
    .then(response => {
      toast.success("Brokerage updated successfully");
      console.log(response.data);
      getTraders();
    })
    .catch(error => {
      toast.error("Error updating brokerage");
      console.error('Error:', error);
    });
  };

  const handleAnalystChange = (traderId: string, analystId: string, analystNumber: number) => {
    // setSelectedAnalyst(analystId);
    console.log(traderId, analystId);
    apiClient.post("/api/trader/updateAnalyst", {
      traderId: traderId,
      analystId: analystId,
      analystNumber: analystNumber
    })
    .then(response => {
      toast.success("Analyst"+analystNumber+" updated successfully");
      console.log(response.data);
      getTraders();
    })
    .catch(error => {
      toast.error("Error updating analyst");
      console.error('Error:', error);
    });
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
      const email = newUser.login;
      const password = newUser.password;
      const name = newUser.name;

      if(email === '' || password === '' || name === ''){
        toast.error('Please fill all the fields');
        return;
      }

    if(editTraderId !== ""){
      const amount = newUser.amount;
      const stopLoss = newUser.stopLoss;
      const profitTaking = newUser.profitTaking;
      const traderId = editTraderId;
      const payload = {
        email,
        password,
        name,
        amount,
        stopLoss,
        profitTaking,
        traderId
      }

      console.log(payload)

      apiClient.post("/api/auth/updateTrader", payload)
      .then(response => {
        toast.success("Trader updated successfully");
        console.log(response.data);
        getTraders();
      })
      
    }
    else{
    try {
      // console.log(newUser);
      await authService.signup({
        email,
        password,
        name,
      });
      
      toast.success('User created successfully');
      getTraders();
      setNewUser({ name: '', login: '', password: '', tradeAmt: '', amount: '', stopLoss: '', profitTaking: '' }); // Reset form
    } catch (error) {
      toast.error('Failed to create user');
        console.error('Error:', error);
      }
    }
  };

  const handleDeleteTrader = async (traderId: string) => {
    if(editTraderId !== ""){
      setEditTraderId('');
    }
    else{
    try {
      console.log(traderId);
      await apiClient.post('/api/trader/deleteTrader', {
        traderId: traderId
      })
      toast.success('Trader deleted successfully');
      // Refresh the traders list
      getTraders();
      setEditTraderId('');
    } catch (error) {
      toast.error('Failed to delete trader');
      console.error('Error:', error);
    }}
  };

  const editTrader = (trader: any) => {
    if(!trader.stopLoss || !trader.profitTaking){
      setNewUser({ name: trader.name, login: trader.email, password: trader.password, tradeAmt: "1", amount: trader.amount, stopLoss: "0", profitTaking: "0" });
    }
    else{
      setNewUser({ name: trader.name, login: trader.email, password: trader.password, tradeAmt: "1", amount: trader.amount, stopLoss: trader.stopLoss, profitTaking: trader.profitTaking });
    }
    setEditTraderId(trader._id);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6">
      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-dark">
        <div className="min-w-[1000px]"> {/* Minimum width for table content */}
          <table className="w-full table-auto cursor-pointer border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="bg-primary/10 dark:bg-primary/5">
                <th className="whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-800 dark:text-gray-200 w-24">
                  User
                </th>
                <th className="whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-800 dark:text-gray-200 w-24">
                  Login
                </th>
                <th className="whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-800 dark:text-gray-200 w-20">
                  PW
                </th>
                <th className="whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-800 dark:text-gray-200 w-20">
                  Trade
                </th>
                <th className="whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-800 dark:text-gray-200 w-20">
                  Stop%
                </th>
                <th className="whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-800 dark:text-gray-200 w-20">
                  Profit%
                </th>
                <th className="whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-800 dark:text-gray-200 w-32">
                  Brokerage
                </th>
                <th className="whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-800 dark:text-gray-200 w-20">
                  Analyst1
                </th>
                <th className="whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-800 dark:text-gray-200 w-20">
                  Analyst2
                </th>
                <th className="whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-800 dark:text-gray-200 w-20">
                  Analyst3
                </th>
                <th className="whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-800 dark:text-gray-200 w-20">
                  Analyst4
                </th>
                <th className="whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-800 dark:text-gray-200 w-20">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {traders.map((trader, i) => (
                <tr key={i} 
                  onClick={()=>editTrader(trader)}
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-2 py-2 text-sm text-gray-700 dark:text-gray-300">{trader.name}</td>
                  <td className="px-2 py-2 text-sm text-gray-700 dark:text-gray-300">{trader.email}</td>
                  <td className="px-2 py-2 text-sm text-gray-700 dark:text-gray-300">{trader.password}</td>
                  <td className="px-2 py-2 text-sm text-gray-700 dark:text-gray-300">${(trader.amount).toFixed(1)}</td>
                  <td className="px-2 py-2 text-sm text-red-500">{trader.stopLoss}%</td>
                  <td className="px-2 py-2 text-sm text-green-500">{trader.profitTaking}%</td>
                  <td className="px-2 py-2 text-sm">
                    <select
                      value={trader.brokerageName || ''}
                      onChange={(e) => handleBrokerageChange(trader._id, e.target.value)}
                      className="w-full rounded-md border border-gray-300 bg-white px-1 py-0.5 text-blue-500 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                    >
                      <option value="">Select</option>
                      {brokerage?.map((item, index) => (
                        <option key={index} value={item._id}>{item.brokerageName}</option>
                      ))}
                    </select>
                  </td>

                  <td className="px-2 py-2 text-sm">
                    <select
                      value={trader.analyst1 || ''}
                      onChange={(e) => handleAnalystChange(trader._id, e.target.value , 1)}
                      className="w-full rounded-md border border-gray-300 bg-white px-1 py-0.5 text-blue-500 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                    >
                      <option value="">Select</option>
                      {analysts?.map((item, index) => (
                        <option key={index} value={item._id}>{item.name}</option>
                      ))}
                    </select>
                  </td>

                  <td className="px-2 py-2 text-sm">
                    <select
                      value={trader.analyst2 || ''}
                      onChange={(e) => handleAnalystChange(trader._id, e.target.value , 2)}
                      className="w-full rounded-md border border-gray-300 bg-white px-1 py-0.5 text-blue-500 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                    >
                      <option value="">Select</option>
                      {analysts?.map((item, index) => (
                        <option key={index} value={item._id}>{item.name}</option>
                      ))}
                    </select>
                  </td>

                  <td className="px-2 py-2 text-sm">
                    <select
                      value={trader.analyst3 || ''}
                      onChange={(e) => handleAnalystChange(trader._id, e.target.value , 3)}
                      className="w-full rounded-md border border-gray-300 bg-white px-1 py-0.5 text-blue-500 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                    >
                      <option value="">Select</option>
                      {analysts?.map((item, index) => (
                        <option key={index} value={item._id}>{item.name}</option>
                      ))}
                    </select>
                  </td>

                  <td className="px-2 py-2 text-sm">
                    <select
                      value={trader.analyst4 || ''}
                      onChange={(e) => handleAnalystChange(trader._id, e.target.value , 4)}
                      className="w-full rounded-md border border-gray-300 bg-white px-1 py-0.5 text-blue-500 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                    >
                      <option value="">Select</option>
                      {analysts?.map((item, index) => (
                        <option key={index} value={item._id}>{item.name}</option>
                      ))}
                    </select>
                  </td>
                  
                  <td className="px-2 py-2 text-sm">
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this trader?')) {
                          handleDeleteTrader(trader._id);
                        }
                      }}
                      className="rounded-lg bg-red-500 px-2 py-1 text-white text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Form Container */}
      <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow-md dark:bg-gray-800">
        <div className="min-w-[600px]"> {/* Minimum width for form content */}
          <div className="p-4 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Create New User</h2>
            <div onSubmit={handleCreateUser} className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="w-full">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">Name</p>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="Name"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="w-full">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">Login</p>
                <input
                  type="text"
                  value={newUser.login}
                  onChange={(e) => setNewUser({...newUser, login: e.target.value})}
                  placeholder="Login"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="w-full">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">Password</p>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  placeholder="Password"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="w-full">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">Trade Amount</p>
                <input
                  type="text"
                  value={newUser.amount}
                  onChange={(e) => setNewUser({...newUser, amount: e.target.value})}
                  placeholder="Trade Amount"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="w-full">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">Stop Loss</p>
                <input
                  type="text"
                  value={newUser.stopLoss}
                  onChange={(e) => setNewUser({...newUser, stopLoss: e.target.value})}
                  placeholder="Stop Loss"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="w-full">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">Profit Taking</p>
                <input
                  type="text"
                  value={newUser.profitTaking}
                  onChange={(e) => setNewUser({...newUser, profitTaking: e.target.value})}
                  placeholder="Profit Taking"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              

              <div className="sm:col-span-2 lg:col-span-4">
                <button
                  onClick={handleCreateUser}
                  className="w-full rounded-lg bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {editTraderId !== "" ? "Update User" : "Create User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default TraderTable;
