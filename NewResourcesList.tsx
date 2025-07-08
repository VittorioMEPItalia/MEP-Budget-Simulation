import React from 'react';
import { NewResource, Heading } from '../types';

interface NewResourcesListProps {
    resources: NewResource[];
    headings: Heading[];
}

const NewResourcesList: React.FC<NewResourcesListProps> = ({ resources, headings }) => {
    
    const getHeadingName = (headingId: number) => {
        return headings.find(h => h.id === headingId)?.name || 'Unknown';
    };

    if (resources.length === 0) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-dashed border-slate-300 text-center">
                <h3 className="text-lg font-medium text-slate-600">No new own resources have been added yet.</h3>
                <p className="text-sm text-slate-400 mt-1">Use the form above to add new resources to a heading.</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-100">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            Proposing Committee
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            Amount Added (B MEP€)
                        </th>
                         <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            Target Heading
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {resources.map(resource => (
                        <tr key={resource.id} className="even:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-slate-900">{resource.committee}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    {resource.amount.toFixed(2)}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                               H{resource.headingId}: {getHeadingName(resource.headingId)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NewResourcesList;