'use client'
import React, { useEffect } from "react"
import { useState } from "react";
import apiClient from "@/lib/axios";
import BrokerageTable from "@/components/myTable/brokerageTable";

interface BrokerageForm {
  brokerageName: string;
  brokerage: string;
  loginName: string;
  password: string;
  accountNumber: string;
  apiInfo: string;
  apiLink: string;
}

const BrokerageSetup = () => {

  const [brokerage, setBrokerage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<BrokerageForm>({
    brokerageName: '',
    brokerage: '',
    loginName: '',
    password: '',
    accountNumber: '',
    apiInfo: '',
    apiLink: ''
  });

  // Method 1: Using .then()
  useEffect(() => {
    setIsLoading(true);
    apiClient.get('/api/brokerage/getBrokerages')
    .then(response => {
      // Handle success
      setBrokerage(response.data);
      setIsLoading(false);
      console.log(response.data);
      
    })
    .catch(error => {
      // Handle error
      setIsLoading(false);
      console.error('Error:', error);
    });
  }, []);

  const handleSubmit = async () => {
    try {
      await apiClient.post('/api/brokerage/create', formData);
    } catch (error) {
      console.error('Error creating brokerage:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

    return (
      <div className="space-y-6">
        {/* Add Brokerage Form */}
        <div className="rounded-lg bg-white p-6 shadow-1 dark:bg-gray-dark">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Add New Brokerage</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Brokerage Name
              </label>
              <input
                type="text"
                value={formData.brokerageName}
                onChange={(e) => setFormData({...formData, brokerageName: e.target.value})}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="TS1"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Brokerage
              </label>
              <input
                type="text"
                value={formData.brokerage}
                onChange={(e) => setFormData({...formData, brokerage: e.target.value})}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="Tradestation"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Login Name
              </label>
              <input
                type="text"
                value={formData.loginName}
                onChange={(e) => setFormData({...formData, loginName: e.target.value})}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="MW123@!"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="Enter password"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Account Number
              </label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="Enter account number"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                API Info
              </label>
              <input
                type="text"
                value={formData.apiInfo}
                onChange={(e) => setFormData({...formData, apiInfo: e.target.value})}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="Optional API info"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                API Link
              </label>
              <input
                type="text"
                value={formData.apiLink}
                onChange={(e) => setFormData({...formData, apiLink: e.target.value})}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="Optional API link"
              />
            </div>

            <div className="col-span-2">
              <button
                onClick={handleSubmit} 
                className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Add Brokerage
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg bg-white p-6 shadow-1 dark:bg-gray-dark w-full" >
          <BrokerageTable />
        </div>
      </div>
    )
}

export default BrokerageSetup;
