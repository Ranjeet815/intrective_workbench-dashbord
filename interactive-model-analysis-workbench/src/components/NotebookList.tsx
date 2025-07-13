import React, { useState } from "react";
import { useNotebookStore } from "../store/useNotebookStore";

const NotebookList = () => {
    const { notebooks, addNotebook, selectNotebook, selectedNotebookId } =
        useNotebookStore();
    const [name, setName] = useState("");

    return (
        <div className="mb-4">
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 mr-2"
                placeholder="Notebook name"
            />
            <button
                onClick={() => {
                    if (name.trim()) addNotebook(name);
                    setName("");
                }}
                className="bg-blue-500 text-white px-4 py-2"
            >
                Add Notebook
            </button>
            <ul className="mt-4 space-y-2">
                {notebooks.map((nb) => (
                    <li
                        key={nb.id}
                        onClick={() => selectNotebook(nb.id)}
                        className={`cursor-pointer p-2 border rounded ${selectedNotebookId === nb.id ? "bg-blue-100" : ""
                            }`}
                    >
                        {nb.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotebookList;