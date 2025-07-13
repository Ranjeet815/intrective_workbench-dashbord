import React from 'react'
import './App.css'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <>
     <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">LLM Monitoring Dashboard</h1>
      <Dashboard />
    </div>
    </>
  )
}

export default App
