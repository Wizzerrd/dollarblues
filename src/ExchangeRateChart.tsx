import React from 'react';
import {
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';

// 🧩 Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-button-border)',
          borderRadius: '8px',
          padding: '8px',
          fontSize: '0.9rem'
        }}
      >
        <strong>{label}</strong>
        <br />
        {payload.map((entry, index) => (
          <div key={index}>
            <span style={{ color: entry.color }}>● </span>
            {entry.name}: {entry.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function ExchangeRateChart({ data }) {
  return (
    <div
      style={{
        width: '100%',
        height: '1200px',
        maxWidth: '100vw',
        overflow: 'hidden',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}
    >
      <ResponsiveContainer width="100%" height="33%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: 'Price', angle: -90, position: 'insideLeft' }} />
          <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
          <Legend />
          <Line dot={false} isAnimationActive={false} type="linear" dataKey="official_buy" stroke="#8884d8" name="Official Buy" />
          <Line dot={false} isAnimationActive={false} type="linear" dataKey="official_sell" stroke="#82ca9d" name="Official Sell" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height="33%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: 'Price', angle: -90, position: 'insideLeft' }} />
          <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
          <Legend />
          <Line dot={false} isAnimationActive={false} type="linear" dataKey="blue_buy" stroke="#ff7300" name="Blue Buy" />
          <Line dot={false} isAnimationActive={false} type="linear" dataKey="blue_sell" stroke="#ff0000" name="Blue Sell" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height="33%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: '% Diff', angle: -90, position: 'insideLeft' }} />
          <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
          <Legend />
          <Line dot={false} isAnimationActive={false} type="linear" dataKey="difference_buy" stroke="#0000ff" name="% Diff Buy" />
          <Line dot={false} isAnimationActive={false} type="linear" dataKey="difference_sell" stroke="#008000" name="% Diff Sell" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
