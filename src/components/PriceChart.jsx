import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { year: '2022', value: 3.2 },
  { year: '2023', value: 3.4 },
  { year: '2024', value: 3.8 },
  { year: '2025', value: 4.1 },
  { year: '2026', value: 4.5 },
];

const PriceChart = ({ basePrice }) => {
  // Generate mock trend based on base price
  const trendData = data.map(d => ({
    year: d.year,
    value: (basePrice * (d.value / 4.5)).toFixed(0)
  }));

  const formatCurrency = (val) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    return `$${(val / 1000).toFixed(0)}k`;
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
      <h3 className="mb-md">Property Value Trend (5 Years)</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="year" stroke="var(--color-text-muted)" />
            <YAxis tickFormatter={formatCurrency} stroke="var(--color-text-muted)" width={80} />
            <Tooltip 
              formatter={(value) => [new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value), 'Estimated Value']}
              contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
            />
            <Line type="monotone" dataKey="value" stroke="var(--color-secondary)" strokeWidth={3} dot={{ r: 6, fill: 'var(--color-accent)' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
