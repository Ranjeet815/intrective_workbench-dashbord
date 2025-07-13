import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchTokenUsage,
  fetchLatencyDistribution,
  fetchCostAnalysis,
} from "../services/mockApi";
import { useDashboardStore } from "../store/useDashboardStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell as RechartCell,
  Legend,
} from "recharts";

// Define types for better safety
interface TokenUsage {
  timestamp: string;
  tokens: number;
}

interface LatencyDistribution {
  latency_ms: number;
  request_count: number;
}

interface CostAnalysis {
  model_name: string;
  cost: number;
}

const WidgetContainer = ({ id, type }: { id: string; type: string }) => {
  const removeWidget = useDashboardStore((state) => state.removeWidget);

  const { data, isLoading, error } = useQuery<TokenUsage[] | LatencyDistribution[] | CostAnalysis[]>({
    queryKey: ["widget", id],
    queryFn: () => {
      if (type === "token") return fetchTokenUsage();
      if (type === "latency") return fetchLatencyDistribution();
      if (type === "cost") return fetchCostAnalysis();
      return Promise.resolve([]);
    },
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="border p-2 rounded shadow bg-white h-full overflow-auto">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold capitalize">{type} Widget</h2>
        <button
          onClick={() => removeWidget(id)}
          className="text-red-500 font-bold"
        >
          ✕
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error loading data</p>}

      {!isLoading && type === "token" && Array.isArray(data) && (
        <LineChart width={400} height={400} data={data as TokenUsage[]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="tokens" stroke="#8884d8" />
        </LineChart>
      )}

      {!isLoading && type === "latency" && Array.isArray(data) && (
        <BarChart width={400} height={400} data={data as LatencyDistribution[]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="latency_ms" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="request_count" fill="#82ca9d" />
        </BarChart>
      )}

      {!isLoading && type === "cost" && Array.isArray(data) && (
        <PieChart width={400} height={400}>
          <Pie
            data={data as CostAnalysis[]}
            dataKey="cost"
            nameKey="model_name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {(data as CostAnalysis[]).map((entry, index) => (
              <RechartCell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
};

export default WidgetContainer;