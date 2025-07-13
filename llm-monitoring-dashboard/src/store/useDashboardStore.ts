import { create } from "zustand";

interface WidgetConfig {
  id: string;
  type: "token" | "latency" | "cost";
  layout: { x: number; y: number; w: number; h: number };
}

interface DashboardState {
  widgets: WidgetConfig[];
  addWidget: (widget: WidgetConfig) => void;
  removeWidget: (id: string) => void;
  updateLayout: (id: string, layout: WidgetConfig["layout"]) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  widgets: [],
  addWidget: (widget) =>
    set((state) => ({ widgets: [...state.widgets, widget] })),
  removeWidget: (id) =>
    set((state) => ({
      widgets: state.widgets.filter((w) => w.id !== id),
    })),
  updateLayout: (id, layout) =>
    set((state) => ({
      widgets: state.widgets.map((w) =>
        w.id === id ? { ...w, layout } : w
      ),
    })),
}));