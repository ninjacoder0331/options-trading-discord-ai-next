'use client'

import TraderStatistics from "@/components/TraderStatistics";
import AnalystStatistics from "@/components/AnalystStatistics";
import { useEffect } from "react";

const Statistics = () => {

  useEffect(() => {
      
  }, []);

    return (
        <div>
          <TraderStatistics />
          <AnalystStatistics />
        </div>
    )
}

export default Statistics;
