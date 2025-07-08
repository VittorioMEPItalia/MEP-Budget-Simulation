import React, { useState } from 'react';
import { Heading, Committee } from '../types';
import { COMMITTEES } from '../constants';

interface NewResourcesFormProps {
    headings: Heading[];
    onSubmit: (amount: number, headingId: number, committee: Committee) => void;
}

const NewResourcesForm: React.FC<NewResourcesFormProps> = ({ headings, onSubmit }) => {
    const [amount, setAmount] = useState('');
    const [committee, setCommittee] = useState<Committee>(COMMITTEES[0]);
    const [headingId, setHeadingId] = useState<string>(headings.length > 0 ? headings[0].id.toString() : '');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const amountValue = parseFloat(amount);

        if (!amount || !headingId || !committee) {
            setError('All fields are required.');
            return;
        }
        if (isNaN(amountValue) || amountValue <= 0) {
            setError('Amount must be a positive number.');
            return;
        }
        
        onSubmit(amountValue, parseInt(headingId), committee);
        setAmount('');
        setError(null);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 h-full">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Introduce "New Own Resources"</h2>
            <p className="text-sm text-slate-500 mb-4">Budgetary Authority Action: Add new funds to a specific heading's negotiable envelope.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="resource-committee" className="block text-sm font-medium text-slate-700">Proposing Committee</label>
                    <select
                        id="resource-committee"
                        value={committee}
                        onChange={(e) => setCommittee(e.target.value as Committee)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 sm:text-sm rounded-md"
                    >
                        {COMMITTEES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                 <div>
                    <label htmlFor="resource-headingId" className="block text-sm font-medium text-slate-700">Target Heading</label>
                    <select
                        id="resource-headingId"
                        value={headingId}
                        onChange={(e) => setHeadingId(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 sm:text-sm rounded-md"
                    >
                        {headings.map(h => <option key={h.id} value={h.id}>{`H${h.id}: ${h.name}`}</option>)}
                    </select>
                </div>
                 <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-slate-700">Amount to Add (in Billion MEP€)</label>
                    <input
                        id="amount"
                        type="number"
                        step="0.1"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g., 50"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
                    />
                </div>

                {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
                
                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full bg-slate-800 text-white font-bold py-2.5 px-4 rounded-md hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800 transition duration-150 ease-in-out"
                    >
                        Add Resources
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewResourcesForm;