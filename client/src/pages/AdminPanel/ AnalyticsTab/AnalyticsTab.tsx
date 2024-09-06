import React, { useEffect, useState } from "react";
import { useOceanRequest } from "../../../Hooks/UseOceanRequest";
import { getTotalProductsByCategory } from "../../../Requests/Product/GetTotalProductsByCategory";
import { getSalesOverTime } from "../../../Requests/Order/GetSalesOverTime";
import {
  OrderSalesOverTime,
  TotalProductsByCategory,
} from "../../../DataModel/Objects/Analytics";
import TotalProductsByCategoryChart from "./TotalProductsByCategoryChart";
import OrderSalesOverTimeChart from "./OrderSalesOverTimeChart";
import { RawText } from "../../../components/RawText/RawText";
import { Shimmer } from "../../../components/Shimmer/Shimmer";

export const AnalyticsTab: React.FC = () => {
  const [totalProductsByCategory, setTotalProductsByCategory] =
    useState<Array<TotalProductsByCategory>>();
  const [salesOverTime, setSalesOverTime] =
    useState<Array<OrderSalesOverTime>>();
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);

  const getTotalProductsByCategoryRequest = useOceanRequest({
    request: getTotalProductsByCategory,
  });

  const getSalesOverTimeRequest = useOceanRequest({
    request: getSalesOverTime,
  });

  const fetchAnalyticsData = () => {
    setIsLoadingAnalytics(true);
    Promise.all([
      getTotalProductsByCategoryRequest(null),
      getSalesOverTimeRequest(null),
    ])
      .then(([totalProductsByCategoryResponse, salesOverTimeResponse]) => {
        setTotalProductsByCategory(totalProductsByCategoryResponse);
        setSalesOverTime(salesOverTimeResponse);
      })
      .catch((err) => {
        console.error(err);
        setTotalProductsByCategory([]);
        setSalesOverTime([]);
      })
      .finally(() => {
        setIsLoadingAnalytics(false);
      });
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  if (isLoadingAnalytics) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingBlock: "16px",
        paddingInline: "32px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <RawText text="Analytics" fontSize={28} fontWeight={700} />
      </div>
      {isLoadingAnalytics ? (
        <Shimmer height="30px" width="60px" />
      ) : (
        <div>
          <TotalProductsByCategoryChart
            data={totalProductsByCategory as TotalProductsByCategory[]}
          />
          <OrderSalesOverTimeChart
            data={salesOverTime as OrderSalesOverTime[]}
          />
        </div>
      )}
    </div>
  );
};
