import React from 'react';
import {
    LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer
} from 'recharts';

type Entry = {
    date: string;  // ISO dates
    official_buy: number;
    official_sell: number;
    blue_buy: number;
    blue_sell: number;
    difference_buy: number;   // % value
    difference_sell: number;  // % value
};

type Props = {
    data: Entry[];
};

export function ExchangeRateChart({ data }: Props) {
    console.log("Hello Data: ", data)
    return (
        <ResponsiveContainer width="80%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" label={{ value: 'Price', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: '% Difference', angle: -90, position: 'insideRight' }} />
                <Tooltip allowEscapeViewBox={{ x: true, y: true }} />
                <Legend />
                <Line dot={false} isAnimationActive={false} yAxisId="left" type="linear" dataKey="official_buy" stroke="#8884d8" name="Official Buy" />
                <Line dot={false} isAnimationActive={false} yAxisId="left" type="linear" dataKey="blue_buy" stroke="#ff7300" name="Blue Buy" />
                <Line dot={false} isAnimationActive={false} yAxisId="right" type="linear" dataKey="difference_buy" stroke="#0000ff" name="% Diff Buy" />
            </LineChart>
        </ResponsiveContainer>

    );
}
