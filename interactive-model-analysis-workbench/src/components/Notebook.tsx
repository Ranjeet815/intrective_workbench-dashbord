import React from "react";
import { useNotebookStore } from "../store/useNotebookStore";

const Notebook = () => {
  const { notebooks, selectedNotebookId, addCell, updateCell } =
    useNotebookStore();
  const notebook = notebooks.find((nb) => nb.id === selectedNotebookId);

  if (!notebook) return <div>Select a notebook to view.</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{notebook.name}</h2>
      <button
        className="mb-4 bg-green-500 text-white px-4 py-2"
        onClick={() => addCell(notebook.id)}
      >
        Add Cell
      </button>
      {notebook.cells.map((cell) => (
        <div key={cell.id} className="mb-2">
          <textarea
            value={cell.code}
            onChange={(e) => updateCell(notebook.id, cell.id, e.target.value)}
            className="w-full h-24 border p-2"
          />
        </div>
      ))}
    </div>
  );
};

export default Notebook;