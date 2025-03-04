'use client'
import React, { useEffect, useState } from "react"
import apiClient from "@/lib/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

interface FormErrors {
  brokerageName?: string;
  brokerage?: string;
  loginName?: string;
  password?: string;
  accountNumber?: string;
}

const BrokerageSetup = () => {

  const [brokerage, setBrokerage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded , setIsLoaded] = useState(false);
  const [formData, setFormData] = useState<BrokerageForm>({
    brokerageName: '',
    brokerage: '',
    loginName: '',
    password: '',
    accountNumber: '',
    apiInfo: '',
    apiLink: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Change this from a direct Promise to a function
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

  if(isLoaded){
    setIsLoading(false);
    getBrokerages();
  }

  useEffect(() => {
    setIsLoading(true);
    getBrokerages();
  }, []);

  const validateForm = (): boolean => {

    // Check required fields
    if (!formData.brokerageName.trim()) {

      toast.error('Brokerage name is required');
      return false;
    }

    if (!formData.brokerage.trim()) {
      toast.error('Brokerage is required');
      return false;
    }

    if (!formData.loginName.trim()) {
      toast.error('Login name is required');
      return false;
    }

    if (!formData.password.trim()) {
      toast.error('Password is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!validateForm()) {
        setIsSubmitting(false);
        return;
      }
      console.log(formData);
      // Submit form if validation passes
      await apiClient.post('/api/brokerage/create', formData);
      toast.success("Brokerage created successfully");
      getBrokerages();
      // Reset form after successful submission
      setFormData({
        brokerageName: '',
        brokerage: '',
        loginName: '',
        password: '',
        accountNumber: '',
        apiInfo: '',
        apiLink: ''
      });

    } catch (error) {
      console.error('Error creating brokerage:', error);
      toast.error("Error creating brokerage");
    } finally {
      setIsSubmitting(false);
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
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Brokerage Name *
              </label>
              <input
                type="text"
                value={formData.brokerageName}
                onChange={(e) => {
                  setFormData({...formData, brokerageName: e.target.value});
                  if (errors.brokerageName) {
                    setErrors(prev => ({ ...prev, brokerageName: undefined }));
                  }
                }}
                className={`w-full rounded-lg border ${
                  errors.brokerageName ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                placeholder="TS1"
              />
              {errors.brokerageName && (
                <p className="text-sm text-red-500">{errors.brokerageName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Brokerage *
              </label>
              <input
                type="text"
                value={formData.brokerage}
                onChange={(e) => {
                  setFormData({...formData, brokerage: e.target.value});
                  if (errors.brokerage) {
                    setErrors(prev => ({ ...prev, brokerage: undefined }));
                  }
                }}
                className={`w-full rounded-lg border ${
                  errors.brokerage ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                placeholder="Tradestation"
              />
              {errors.brokerage && (
                <p className="text-sm text-red-500">{errors.brokerage}</p>
              )}
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

            <div className="col-span-2 flex items-center justify-between">
              <p className="text-sm text-gray-500">* Required fields</p>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`rounded-lg bg-primary px-4 py-2 text-white transition-all ${
                  isSubmitting 
                    ? 'cursor-not-allowed opacity-70'
                    : 'hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50'
                }`}
              >
                {isSubmitting ? 'Adding...' : 'Add Brokerage'}
              </button>
            </div>
          </form>
        </div>

        <div className="overflow-x-auto rounded-lg bg-white p-6 shadow-1 dark:bg-gray-dark w-full" >
          <BrokerageTable data = {brokerage} setIsLoaded = {setIsLoaded} />
        </div>
      </div>
    )
}

export default BrokerageSetup;
