import './App.css'
import { useBluelyticsAPI } from './hooks/useBluelyticsAPI'
import { ExchangeRateChart } from './ExchangeRateChart'
import { useEffect, useState } from 'react'

function daysElapsed() {
  const today = new Date()
  const currentYear = today.getFullYear()
  const firstOfYear = new Date(currentYear, 0)
  return Math.floor((today.getTime() - firstOfYear.getTime()) / 86400000)
}

function App() {
  const { data, dataLoading, error } = useBluelyticsAPI()
  const [displayDays, setDisplayDays] = useState(30)

  // ✅ plain JS version of theme state (no TS generic)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  })

  // update HTML attribute + persist theme
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  if (dataLoading) return <p>Loading...</p>
  if (error) return <p>Error loading data</p>

  return (
    <>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}
      >
        <h1>Dollar Blues</h1>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </header>

      <h2>
        The "blue dollar" in Argentina is the unofficial exchange rate for USD,
        often higher than the official rate due to currency controls and
        inflation.
        <br />
        <br />
        When the blue dollar aligns with the official rate, it signals reduced
        currency market distortions and can indicate improved economic stability
        and access to foreign exchange.
        <br />
        <br />
        When the blue dollar and official rate match, it can indicate more
        stability for the peso. It suggests that fewer people are rushing to buy
        dollars on the unofficial market, likely because they feel less need to
        protect their money from losing value in pesos.
      </h2>

      <div className="button-group">
        <button onClick={() => setDisplayDays(7)}>1 Week</button>
        <button onClick={() => setDisplayDays(30)}>1 Month</button>
        <button onClick={() => setDisplayDays(180)}>6 Months</button>
        <button onClick={() => setDisplayDays(daysElapsed())}>YTD</button>
        <button onClick={() => setDisplayDays(365)}>1 Year</button>
        <button onClick={() => setDisplayDays(1825)}>5 Years</button>
        <button onClick={() => setDisplayDays(data.length)}>Max</button>
      </div>

      <ExchangeRateChart
        data={data.slice(Math.max(0, data.length - displayDays))}
      />
    </>
  )
}

export default App
