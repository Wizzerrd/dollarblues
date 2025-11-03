import React from 'react';
import {
    LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer
} from 'recharts';

type Entry = {
    date: string;
    official_buy: number;
    official_sell: number;
    blue_buy: number;
    blue_sell: number;
    difference_buy: number;
    difference_sell: number;
};

type Props = {
    data: Entry[];
};

export function ExchangeRateChart({ data }: Props) {
    return (
        <div style={{ width: '100%', height: '1200px' }}>
            <ResponsiveContainer width="90%" height="33%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis label={{ value: 'Price', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line dot={false} isAnimationActive={false} type="linear" dataKey="official_buy" stroke="#8884d8" name="Official Buy" />
                    <Line dot={false} isAnimationActive={false} type="linear" dataKey="official_sell" stroke="#82ca9d" name="Official Sell" />
                </LineChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="90%" height="33%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis label={{ value: 'Price', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line dot={false} isAnimationActive={false} type="linear" dataKey="blue_buy" stroke="#ff7300" name="Blue Buy" />
                    <Line dot={false} isAnimationActive={false} type="linear" dataKey="blue_sell" stroke="#ff0000" name="Blue Sell" />
                </LineChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="90%" height="33%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis label={{ value: '% Diff', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line dot={false} isAnimationActive={false} type="linear" dataKey="difference_buy" stroke="#0000ff" name="% Diff Buy" />
                    <Line dot={false} isAnimationActive={false} type="linear" dataKey="difference_sell" stroke="#008000" name="% Diff Sell" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
