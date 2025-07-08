import React from 'react';
import { Proposal, Heading } from '../types';

interface ProposalListProps {
    proposals: Proposal[];
    headings: Heading[];
}

const ProposalList: React.FC<ProposalListProps> = ({ proposals, headings }) => {
    
    const getHeadingName = (headingId: number) => {
        return headings.find(h => h.id === headingId)?.name || 'Unknown';
    };

    if (proposals.length === 0) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-dashed border-slate-300 text-center">
                <h3 className="text-lg font-medium text-slate-600">No proposals have been submitted yet.</h3>
                <p className="text-sm text-slate-400 mt-1">Use the form above to add the first financial proposal.</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-100">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            Proposal / Justification
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            Committee
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            Cost (B MEP€)
                        </th>
                         <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            Funded From
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {proposals.map(proposal => (
                        <tr key={proposal.id} className="even:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-slate-900">{proposal.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-slate-700">{proposal.committee}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    {proposal.cost.toFixed(2)}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                               H{proposal.headingId}: {getHeadingName(proposal.headingId)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProposalList;