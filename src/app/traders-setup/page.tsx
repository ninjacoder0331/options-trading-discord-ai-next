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
  

  return (
    <MyTable/>
  );
};

export default TradersSetup;