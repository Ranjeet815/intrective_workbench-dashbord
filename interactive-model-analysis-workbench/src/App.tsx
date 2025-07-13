import React from 'react' 
import './App.css'
import NotebookList from './components/NotebookList'
import Notebook from './components/Notebook'

function App() {
  return (
    <>
     <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Interactive Model Workbench</h1>
      <NotebookList />
      <Notebook />
    </div>
    </>
  )
}

export default App
