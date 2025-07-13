import { create } from "zustand";
import { nanoid } from "nanoid";

interface Cell {
  id: string;
  code: string;
  output?: string;
}

interface Notebook {
  id: string;
  name: string;
  cells: Cell[];
}

interface NotebookState {
  notebooks: Notebook[];
  selectedNotebookId: string | null;
  addNotebook: (name: string) => void;
  addCell: (notebookId: string) => void;
  updateCell: (notebookId: string, cellId: string, code: string) => void;
  selectNotebook: (id: string) => void;
}

export const useNotebookStore = create<NotebookState>((set) => ({
  notebooks: [],
  selectedNotebookId: null,
  addNotebook: (name) =>
    set((state) => ({
      notebooks: [
        ...state.notebooks,
        { id: nanoid(), name, cells: [] },
      ],
    })),
  addCell: (notebookId) =>
    set((state) => {
      const updated = state.notebooks.map((nb) => {
        if (nb.id === notebookId) {
          return {
            ...nb,
            cells: [...nb.cells, { id: nanoid(), code: "" }],
          };
        }
        return nb;
      });
      return { notebooks: updated };
    }),
  updateCell: (notebookId, cellId, code) =>
    set((state) => {
      const updated = state.notebooks.map((nb) => {
        if (nb.id === notebookId) {
          return {
            ...nb,
            cells: nb.cells.map((cell) =>
              cell.id === cellId ? { ...cell, code } : cell
            ),
          };
        }
        return nb;
      });
      return { notebooks: updated };
    }),
  selectNotebook: (id) => set({ selectedNotebookId: id }),
}));