'use client'
import React, { useEffect, useState } from "react"
import apiClient from "@/lib/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BrokerageTable from "@/components/myTable/brokerageTable";

const BrokerageSetup = () => {

  const [brokerage, setBrokerage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTraderId, setSelectedTraderId] = useState("");
  const [apiKey, setApiKey] = useState("")
  const [secretKey, setSecretKey] = useState("")
  const [brokerageName, setBrokerageName] = useState("")
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDelConfirmModal , setDelConfirmModal] = useState(false)
  const [liveTrading, setLiveTrading] = useState(false);

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

  const handleCreateBrokerage = () => {
    if(brokerageName == ""){
      toast.info("Please enter brokerage name");
      return;
    }
    apiClient.post("/api/brokerage/createBrokerageTrader", {
      brokerageName: brokerageName,
      API_KEY: apiKey,
      SECRET_KEY: secretKey,
      liveTrading: liveTrading,
    })
    .then(response => {
      toast.success("Brokerage created successfully");
      getBrokerages();
    })
    .catch(error => {
      toast.error("Error creating brokerage.");
      console.error('Error:', error);
    });
  }

  const updateTrader = () => {
    if(selectedTraderId){
      console.log("selectedTraderId" , selectedTraderId)
      apiClient.post("/api/auth/updateBrokerageTrader", {
        traderId: selectedTraderId,
        brokerageName: brokerageName,
        API_KEY: apiKey,
        SECRET_KEY: secretKey,
        liveTrading: liveTrading,
      })
      .then(response => {
        toast.success("Brokerage updated successfully");
        setShowConfirmModal(false)
        handleCancelUpdate();
        getBrokerages();
      })
      .catch(error => {
        toast.error("Error updating brokerage.");
        console.error('Error:', error);
      });
    }
  }

  const deleteBrokerage = () =>{
    if(selectedTraderId){
      apiClient.post("/api/auth/deleteBrokerage", {
        traderId : selectedTraderId
      }).then(
        response => {
          toast.success("Brokerage deleted successfully");
          setDelConfirmModal(false)
          handleCancelUpdate()
          getBrokerages()
        }).catch(
          error => {
            toast.error("Error deleting brokerage.")
          }
        );
    }
  }

  const SelectTrader = (trader: any) => {
    if(trader._id){
      setSelectedTraderId(trader._id)
      if(trader.API_KEY) setApiKey(trader.API_KEY)
      else setApiKey("")
      if(trader.SECRET_KEY) setSecretKey(trader.SECRET_KEY)
      else setSecretKey("")
      if(trader.brokerageName) setBrokerageName(trader.brokerageName)
      else setBrokerageName("")
      if(trader.liveTrading) setLiveTrading(trader.liveTrading)
      else setLiveTrading(false)
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getBrokerages();
  }, []);

  const handleUpdateClick = () => {
    setShowConfirmModal(true);
  };

  const handleDeleteClick = () =>{
    setDelConfirmModal(true)
  }

  const handleConfirmUpdate = () => {
    setShowConfirmModal(false);
    updateTrader();
  };

  const handleDelCancelUpdate = () =>{
    setDelConfirmModal(false)
  }

  const handleCancelUpdate = () => {
    setShowConfirmModal(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

    return (
      <div className="space-y-4 md:space-y-8 w-full mx-auto px-2 sm:px-4 lg:px-8">
       
        <div className="overflow-x-auto rounded-lg bg-white p-4 sm:p-6 shadow-1 dark:bg-gray-dark w-full" >
          <BrokerageTable data = {brokerage} SelectTrader = {SelectTrader}/>
        </div>
        
        <div className="flex flex-col w-full bg-white p-4 sm:p-6 md:p-8 shadow-lg dark:bg-gray-dark rounded-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
            <div className="flex flex-col space-y-2">
              <label htmlFor="brokerageName" className="text-sm font-medium text-gray-700 dark:text-gray-300">Brokerage Name</label>
              <input 
                type="text" 
                id="brokerageName"
                value={brokerageName} 
                onChange={(e) => setBrokerageName(e.target.value)} 
                className="w-full rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:border-blue-500" 
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="apiKey" className="text-sm font-medium text-gray-700 dark:text-gray-300">API Key</label>
              <input 
                type="text" 
                id="apiKey"
                value={apiKey} 
                onChange={(e) => setApiKey(e.target.value)} 
                className="w-full rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:border-blue-500" 
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="secretKey" className="text-sm font-medium text-gray-700 dark:text-gray-300">Secret Key</label>
              <input 
                type="text" 
                id="secretKey"
                value={secretKey} 
                onChange={(e) => setSecretKey(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:border-blue-500" 
              />
            </div>
            <div className="flex flex-col space-y-2 items-center">
              <label htmlFor="liveTrading" className="text-sm font-medium text-gray-700 dark:text-gray-300">Live Trading</label>
              <div className="relative flex items-center h-full">
                <input 
                  type="checkbox" 
                  id="liveTrading"
                  checked={liveTrading}
                  onChange={(e) => setLiveTrading(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-primary dark:checked:border-primary transition-colors duration-200" 
                />
              </div>
            </div>
          </div>
          <div className="flex gap-6 justify-center mt-6 sm:mt-8">
            <button 
              onClick={handleCreateBrokerage}
              className="inline-flex items-center justify-center rounded-lg bg-rose-600 px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Create Brokerage
            </button>
            <button 
              onClick={handleUpdateClick}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Update Brokerage
            </button>
            <button
              onClick={handleDeleteClick}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Delete Brokerage
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 max-w-md w-full mx-4 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Confirm Update
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Before update the API key and Secret key, please make sure that there is no open position.

                And if you are doing live trading or paper trading, please make sure that the API key and Secret key are correct.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCancelUpdate}
                  className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500/50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={updateTrader}
                  className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  Confirm Update
                </button>
              </div>
            </div>
          </div>
        )}

        {showDelConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 max-w-md w-full mx-4 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Confirm Deletion
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete this brokerage? This action cannot be undone.

                Please make sure that there are no open positions before deleting the brokerage.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleDelCancelUpdate}
                  className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500/50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteBrokerage}
                  className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                >
                  Delete Brokerage
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
}

export default BrokerageSetup;
