import './App.css'
import { useBluelyticsAPI } from './hooks/useBluelyticsAPI'
import { ExchangeRateChart } from './ExchangeRateChart'
import { useEffect, useState } from 'react'

function daysElapsed() {
  const today = new Date();
  const currentYear = today.getFullYear()
  const firstOfYear = new Date(currentYear, 0)
  return Math.floor((today - firstOfYear) / 86400000)
}

function App() {
  const { data, dataLoading, error } = useBluelyticsAPI()
  const [displayDays, setDisplayDays] = useState(30)

  if (dataLoading) return (
    <>
      Loading
    </>
  )

  return (
    <>
      <ExchangeRateChart data={data.slice(data.length - displayDays, data.length)} />
      <button onClick={() => setDisplayDays(7)}>1 Week</button>
      <button onClick={() => setDisplayDays(30)}>1 Month</button>
      {/* <button onClick={() => setDisplayDays(30)}>3 Months</button> */}
      <button onClick={() => setDisplayDays(180)}>6 Months</button>
      <button onClick={() => setDisplayDays(daysElapsed())}>YTD</button>
      <button onClick={() => setDisplayDays(365)}>1 Year</button>
      <button onClick={() => setDisplayDays(1825)}>5 Years</button>
      <button onClick={() => setDisplayDays(data.length)}>Max</button>
    </>
  )
}

export default App
