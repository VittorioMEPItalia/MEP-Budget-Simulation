import React, { useState, useMemo } from 'react';
import { Heading, Proposal, Committee } from '../types';
import { COMMITTEES } from '../constants';

interface ProposalFormProps {
    headings: Heading[];
    onSubmit: (proposal: Omit<Proposal, 'id' | 'headingId'>, headingId: number) => void;
}

const ProposalForm: React.FC<ProposalFormProps> = ({ headings, onSubmit }) => {
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [committee, setCommittee] = useState<Committee>(COMMITTEES[0]);
    const [headingId, setHeadingId] = useState<string>(headings.length > 0 ? headings[0].id.toString() : '');
    const [error, setError] = useState<string | null>(null);

    const remainingBudget = useMemo(() => {
        const selectedHeading = headings.find(h => h.id.toString() === headingId);
        if (!selectedHeading) return 0;
        const spent = selectedHeading.proposals.reduce((sum, p) => sum + p.cost, 0);
        return selectedHeading.negotiableBudget - spent;
    }, [headingId, headings]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const costValue = parseFloat(cost);

        if (!name || !cost || !committee || !headingId) {
            setError('All fields are required.');
            return;
        }
        if (isNaN(costValue) || costValue <= 0) {
            setError('Cost must be a positive number.');
            return;
        }
        if (costValue > remainingBudget) {
            setError(`Cost exceeds remaining negotiable budget of ${remainingBudget.toFixed(2)} B MEP€ for this heading.`);
            return;
        }
        
        onSubmit({ name, cost: costValue, committee }, parseInt(headingId));
        setName('');
        setCost('');
        setError(null);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 h-full">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Submit Financial Proposal</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="proposalName" className="block text-sm font-medium text-slate-700">Proposal Name / Justification</label>
                    <input
                        id="proposalName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., New fund for green tech"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-eu-blue focus:border-eu-blue"
                    />
                </div>
                <div>
                    <label htmlFor="committee" className="block text-sm font-medium text-slate-700">Submitting Committee</label>
                    <select
                        id="committee"
                        value={committee}
                        onChange={(e) => setCommittee(e.target.value as Committee)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-1 focus:ring-eu-blue focus:border-eu-blue sm:text-sm rounded-md"
                    >
                        {COMMITTEES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="headingId" className="block text-sm font-medium text-slate-700">Funding From Heading</label>
                    <select
                        id="headingId"
                        value={headingId}
                        onChange={(e) => setHeadingId(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-1 focus:ring-eu-blue focus:border-eu-blue sm:text-sm rounded-md"
                    >
                        {headings.map(h => <option key={h.id} value={h.id}>{`H${h.id}: ${h.name}`}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="cost" className="block text-sm font-medium text-slate-700">Estimated Cost (in Billion MEP€)</label>
                    <input
                        id="cost"
                        type="number"
                        step="0.01"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        placeholder="e.g., 5.5"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-eu-blue focus:border-eu-blue"
                    />
                    {headingId && <p className="text-sm text-slate-500 mt-2">Remaining in this heading: <span className="font-semibold text-green-600">{remainingBudget.toFixed(2)} B MEP€</span></p>}
                </div>

                {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
                
                <button
                    type="submit"
                    className="w-full bg-eu-blue text-white font-bold py-2.5 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eu-blue transition duration-150 ease-in-out"
                >
                    Submit Proposal
                </button>
            </form>
        </div>
    );
};

export default ProposalForm;