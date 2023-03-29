import React from "react";

export default function NotebookSelect({
  notebooks,
  notebookId,
  setNotebookId,
}) {
  return (
    <div>
      <label htmlFor="notebook-select">Select a notebook:</label>
      <select
        id="notebook-select"
        value={notebookId}
        onChange={(e) => setNotebookId(parseInt(e.target.value))}
      >
        <option value="">Select a notebook</option>
        {Object.values(notebooks).length ? (
          Object.values(notebooks).map((notebook) => (
            <option key={notebook.id} value={notebook.id}>
              {notebook.name}
            </option>
          ))
        ) : (
          <option disabled>No notebooks available</option>
        )}
      </select>
    </div>
  );
}
