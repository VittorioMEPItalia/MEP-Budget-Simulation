import React, { useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
import { Heading } from '../types';

interface HeadingCardProps {
    heading: Heading;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/80 backdrop-blur-sm p-3 border border-slate-300 rounded-lg shadow-lg">
                <p className="font-bold text-slate-800">{`${label}`}</p>
                <p style={{ color: payload[0].color }}>{`${payload[0].name}: ${payload[0].value.toFixed(2)} B MEP€`}</p>
                 {payload[1] && <p style={{ color: payload[1].color }}>{`${payload[1].name}: ${payload[1].value.toFixed(2)} B MEP€`}</p>}
            </div>
        );
    }
    return null;
};


const HeadingCard: React.FC<HeadingCardProps> = ({ heading }) => {
    const spentAmount = useMemo(() => {
        return heading.proposals.reduce((sum, p) => sum + p.cost, 0);
    }, [heading.proposals]);

    const remainingNegotiable = heading.negotiableBudget - spentAmount;
    const committedBudget = heading.totalBudget - heading.initialNegotiable;

    const chartData = [
        {
            name: heading.name,
            Spent: spentAmount,
            Remaining: remainingNegotiable,
        }
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
            <h3 className="text-base font-bold text-eu-blue mb-1">Heading {heading.id}</h3>
            <p className="text-lg font-semibold text-slate-800 mb-4 h-14">{heading.name}</p>
            
            <div className="mb-4 h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" hide />
                        <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(238, 242, 255, 0.7)'}} />
                        <Legend wrapperStyle={{fontSize: '14px', paddingTop: '10px'}}/>
                        <Bar dataKey="Spent" stackId="a" fill="#ef4444" name="Spent" />
                        <Bar dataKey="Remaining" stackId="a" fill="#22c55e" name="Remaining Negotiable" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            <div className="space-y-3 text-sm mt-auto">
                <div className="flex justify-between items-center border-t pt-3">
                    <span className="font-medium text-slate-600">Total Budget:</span>
                    <span className="font-semibold text-slate-900">{heading.totalBudget.toFixed(0)} B MEP€</span>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-600">Committed:</span>
                    <span className="font-semibold text-slate-500">{committedBudget < 0 ? 0 : committedBudget.toFixed(0)} B MEP€</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-600">Total Negotiable:</span>
                    <span className="font-semibold text-slate-900">{heading.negotiableBudget.toFixed(0)} B MEP€</span>
                </div>
                 <div className="flex justify-between items-center text-green-600">
                    <span className="font-semibold">Remaining Negotiable:</span>
                    <span className="font-bold">{remainingNegotiable.toFixed(2)} B MEP€</span>
                </div>
                <div className="flex justify-between items-center text-red-600">
                    <span className="font-semibold">Spent:</span>
                    <span className="font-bold">{spentAmount.toFixed(2)} B MEP€</span>
                </div>
            </div>
        </div>
    );
};

export default HeadingCard;