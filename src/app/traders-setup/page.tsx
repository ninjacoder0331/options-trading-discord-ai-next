'use client'
import React, { useEffect, useState } from "react";
import { TopChannels } from "@/components/Tables/top-channels";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { Metadata } from "next";
import { Suspense } from "react";
import apiClient from "@/lib/axios";
import MyTable from "@/components/myTable";


// export const metadata: Metadata = {
//   title: "traders-setup",
// };

const TradersSetup = () => {
  const [traders, setTraders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Method 1: Using .then()
  useEffect(() => {
    setIsLoading(true);
    apiClient.get('/api/trader/getTraders')
    .then(response => {
      // Handle success
      setTraders(response.data);
      setIsLoading(false);
      console.log(response.data);
      
    })
    .catch(error => {
      // Handle error
      setIsLoading(false);
      console.error('Error:', error);
    });
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
      <Suspense fallback={<TopChannelsSkeleton />}>
        <MyTable traders={traders} />
      </Suspense>
  );
};

export default TradersSetup;