import React from "react";
import { useDashboardStore } from "../store/useDashboardStore";
import { v4 as uuidv4 } from "uuid";
import WidgetContainer from "./WidgetContainer";
import GridLayout from 'react-grid-layout'
const Dashboard = () => {
  const { widgets, addWidget, updateLayout } = useDashboardStore();

  const layout = widgets.map((w) => ({
    i: w.id,
    x: w.layout.x,
    y: w.layout.y,
    w: w.layout.w,
    h: w.layout.h,
  }));

  const handleAdd = (type: "token" | "latency" | "cost") => {
    addWidget({
      id: uuidv4(),
      type,
      layout: { x: 0, y: Infinity, w: 4, h: 4 },
    });
  };

  return (
    <div>
      <div className="mb-4 space-x-2">
        <button
          className="bg-blue-500 text-white px-3 py-1"
          onClick={() => handleAdd("token")}
        >
          Add Token Widget
        </button>
        <button
          className="bg-green-500 text-white px-3 py-1"
          onClick={() => handleAdd("latency")}
        >
          Add Latency Widget
        </button>
        <button
          className="bg-purple-500 text-white px-3 py-1"
          onClick={() => handleAdd("cost")}
        >
          Add Cost Widget
        </button>
      </div>
      <GridLayout
        className="layout"
        cols={12}
        rowHeight={120}
        width={1400}
        layout={layout}
        onLayoutChange={(newLayout) => {
          newLayout.forEach((item) => {
            updateLayout(item.i, {
              x: item.x,
              y: item.y,
              w: item.w,
              h: item.h,
            });
          });
        }}
      >
        {widgets.map((w) => (
          <div key={w.id} data-grid={w.layout}>
            <WidgetContainer id={w.id} type={w.type} />
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default Dashboard;