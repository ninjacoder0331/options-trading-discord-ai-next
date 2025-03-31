'use client';

import apiClient from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AnalystSetup = () => {
    const [analysts, setAnalysts] = useState([]);
    const [analystName, setAnalystName] = useState("");
    const [analystType, setAnalystType] = useState("");
    const [analystId, setAnalystId] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getAnalysts = () => {
        setIsLoading(true);
        apiClient.get("/api/analyst/getAnalysts").then((res) => {
            setAnalysts(res.data);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getAnalysts();
    }, [])

    useEffect(() => {
        if (analystName === "" && analystType === "") {
            setIsEditing(false);
        }
    }, [analystName, analystType])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleRowClick = (analyst) => {
        setIsEditing(true);
        setAnalystName(analyst.name);
        setAnalystType(analyst.type);
        setAnalystId(analyst._id);
    }

    const handleSaveChanges = () => {
        if(analystName === "" || analystType === "") {
            toast.error("Please enter a valid analyst name and type");
            return;
        }
        apiClient.post("/api/analyst/updateAnalyst", {
            name: analystName,
            type: analystType,
            currentId: analystId
        }).then((res) => {
            console.log(res);
            getAnalysts();
            setIsEditing(false);
            setAnalystName("");
            setAnalystType("");
            setAnalystId("");
            toast.success("Analyst updated successfully");
        }).catch((err) => {
            console.log(err);
            toast.error("Failed to update analyst");
        })
    }

    const handleDeleteAnalyst = () => {
        if(analystId === "") {
            toast.error("Please select an analyst to delete");
            return;
        }
        apiClient.post("/api/analyst/deleteAnalyst", {
            currentId: analystId
        }).then((res) => {
            console.log(res);
            setAnalystId("");
            setAnalystName("");
            setAnalystType("");
            getAnalysts();
            toast.success("Analyst deleted successfully");
        }).catch((err) => {
            console.log(err);
            toast.error("Failed to delete analyst");
        })
    }

    const handleCancelChanges = () => {
        setIsEditing(false);
        setAnalystName("");
        setAnalystType("");
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Analyst Setup</h1>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-dark">
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {analysts.map((analyst, index) => (
                                <tr 
                                    key={analyst._id}
                                    className="transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                                    onClick={() => handleRowClick(analyst)}
                                >
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{index + 1}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{analyst.name}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{analyst.type}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{analyst.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700">
                    <div className="p-6">
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                            <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>You can edit the analyst type by clicking on the analyst name.</span>
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="analystName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Analyst Name
                                </label>
                                <input 
                                    type="text" 
                                    id="analystName" 
                                    value={analystName}
                                    onChange={(e) => setAnalystName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                             transition-colors duration-200
                                             placeholder-gray-400 dark:placeholder-gray-500" 
                                    placeholder="Enter analyst name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="analystType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Analyst Type
                                </label>
                                <input 
                                    type="text" 
                                    id="analystType" 
                                    value={analystType}
                                    onChange={(e) => setAnalystType(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                             transition-colors duration-200
                                             placeholder-gray-400 dark:placeholder-gray-500" 
                                    placeholder="Enter analyst type"
                                />
                            </div>
                        </div>
                        
                        <div className="mt-6 flex justify-end gap-4">
                            <button 
                                className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg
                                             hover:bg-green-700
                                             transition-colors duration-200
                                             dark:focus:ring-offset-gray-800
                                             flex items-center gap-2"
                                onClick={handleCancelChanges}
                            >
                                
                                Clear Changes
                            </button>
                            <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg
                                             hover:bg-blue-700 
                                             transition-colors duration-200
                                             dark:focus:ring-offset-gray-800
                                             flex items-center gap-2"
                                onClick={handleSaveChanges}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                {!isEditing ? "Save Changes" : "Edit Analyst"}
                            </button>
                            <button className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg
                                             hover:bg-red-700
                                             transition-colors duration-200
                                             dark:focus:ring-offset-gray-800
                                             flex items-center gap-2"
                                onClick={handleDeleteAnalyst}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Delete Analyst
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalystSetup;
