import React, { useState, useMemo } from 'react';
import { Heading, Proposal, Committee, NewResource } from './types';
import { INITIAL_HEADINGS, Logo } from './constants';
import HeadingCard from './components/HeadingCard';
import ProposalForm from './components/ProposalForm';
import ProposalList from './components/ProposalList';
import NewResourcesForm from './components/NewResourcesForm';
import NewResourcesList from './components/NewResourcesList';

const App: React.FC = () => {
    const [headings, setHeadings] = useState<Heading[]>(INITIAL_HEADINGS);
    const [newResources, setNewResources] = useState<NewResource[]>([]);

    const handleAddProposal = (proposal: Omit<Proposal, 'id' | 'headingId'>, headingId: number) => {
        setHeadings(prevHeadings => {
            const newHeadings = [...prevHeadings];
            const headingIndex = newHeadings.findIndex(h => h.id === headingId);
            if (headingIndex === -1) return prevHeadings;

            const targetHeading = { ...newHeadings[headingIndex] };
            
            const spentInHeading = targetHeading.proposals.reduce((sum, p) => sum + p.cost, 0);
            const remainingInHeading = targetHeading.negotiableBudget - spentInHeading;

            if (proposal.cost > remainingInHeading) {
                alert(`Error: Cost exceeds remaining negotiable budget of ${remainingInHeading.toFixed(2)} B MEP€ for this heading.`);
                return prevHeadings;
            }

            const newProposal: Proposal = {
                ...proposal,
                id: `prop-${Date.now()}`,
                headingId: headingId,
            };

            targetHeading.proposals = [...targetHeading.proposals, newProposal];
            newHeadings[headingIndex] = targetHeading;
            
            return newHeadings;
        });
    };
    
    const handleAddResources = (amount: number, headingId: number, committee: Committee) => {
        const newResource: NewResource = {
            id: `res-${Date.now()}`,
            amount,
            committee,
            headingId
        };
        setNewResources(prev => [...prev, newResource].sort((a,b) => b.id.localeCompare(a.id)));

        setHeadings(prevHeadings => 
            prevHeadings.map(h => 
                h.id === headingId 
                ? { ...h, negotiableBudget: h.negotiableBudget + amount } 
                : h
            )
        );
    };

    const handleExportCSV = () => {
        const getHeadingName = (id: number) => headings.find(h => h.id === id)?.name || 'Unknown';

        const escapeCsvCell = (cell: any): string => {
            const cellStr = String(cell);
            if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
                return `"${cellStr.replace(/"/g, '""')}"`;
            }
            return cellStr;
        };

        const toCsvRow = (row: any[]): string => row.map(escapeCsvCell).join(',');

        let csvContent = "MEP Budget Simulation Report\n\n";

        // Section 1: Budget Summary
        csvContent += "Budget Headings Summary\n";
        const summaryHeaders = ['ID', 'Heading Name', 'Total Budget (B)', 'Initial Negotiable (B)', 'New Resources Added (B)', 'Current Negotiable (B)', 'Spent (B)', 'Remaining Negotiable (B)'];
        csvContent += toCsvRow(summaryHeaders) + '\n';
        
        headings.forEach(h => {
            const spent = h.proposals.reduce((sum, p) => sum + p.cost, 0);
            const remaining = h.negotiableBudget - spent;
            const newResTotal = newResources.filter(r => r.headingId === h.id).reduce((sum, r) => sum + r.amount, 0);
            const row = [
                `H${h.id}`,
                h.name,
                h.totalBudget.toFixed(2),
                h.initialNegotiable.toFixed(2),
                newResTotal.toFixed(2),
                h.negotiableBudget.toFixed(2),
                spent.toFixed(2),
                remaining.toFixed(2),
            ];
            csvContent += toCsvRow(row) + '\n';
        });

        csvContent += "\n\n";

        // Section 2: Submitted Proposals
        csvContent += "Submitted Financial Implication Forms\n";
        const proposalHeaders = ['Proposal Name', 'Submitting Committee', 'Cost (B)', 'Funding From Heading'];
        csvContent += toCsvRow(proposalHeaders) + '\n';

        allProposals.forEach(p => {
            const row = [
                p.name,
                p.committee,
                p.cost.toFixed(2),
                `H${p.headingId}: ${getHeadingName(p.headingId)}`
            ];
            csvContent += toCsvRow(row) + '\n';
        });

        csvContent += "\n\n";

        // Section 3: New Own Resources
        csvContent += "New Own Resources Added\n";
        const resourceHeaders = ['Proposing Committee', 'Amount Added (B)', 'Target Heading'];
        csvContent += toCsvRow(resourceHeaders) + '\n';

        newResources.forEach(r => {
            const row = [
                r.committee,
                r.amount.toFixed(2),
                `H${r.headingId}: ${getHeadingName(r.headingId)}`
            ];
            csvContent += toCsvRow(row) + '\n';
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "mep_budget_report.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const allProposals = useMemo(() => headings.flatMap(h => h.proposals).sort((a,b) => b.id.localeCompare(a.id)), [headings]);

    const totalInitialNegotiable = useMemo(() => INITIAL_HEADINGS.reduce((sum, h) => sum + h.initialNegotiable, 0), []);
    const totalCurrentNegotiable = useMemo(() => headings.reduce((sum, h) => sum + h.negotiableBudget, 0), [headings]);
    const totalSpent = useMemo(() => allProposals.reduce((sum, p) => sum + p.cost, 0), [allProposals]);
    const totalRemaining = totalCurrentNegotiable - totalSpent;
    const totalNewResources = useMemo(() => newResources.reduce((sum, r) => sum + r.amount, 0), [newResources]);

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
            <header className="bg-white border-b border-slate-200">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Logo />
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-eu-blue">MEP Alumni</h1>
                            <p className="text-sm sm:text-md text-slate-600 font-medium">INTEGRATING THE EU BUDGET IN MEP</p>
                        </div>
                    </div>
                     <div className="flex-shrink-0">
                        <button
                            onClick={handleExportCSV}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Download CSV Report
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {/* Global Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm text-center">
                        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Initial Negotiable</h3>
                        <p className="text-3xl font-bold text-eu-blue mt-1">{totalInitialNegotiable.toFixed(0)} B</p>
                    </div>
                     <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm text-center">
                        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Spent</h3>
                        <p className="text-3xl font-bold text-red-600 mt-1">{totalSpent.toFixed(2)} B</p>
                    </div>
                     <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm text-center">
                        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Remaining</h3>
                        <p className="text-3xl font-bold text-green-600 mt-1">{totalRemaining.toFixed(2)} B</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm text-center">
                        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">New Resources</h3>
                        <p className="text-3xl font-bold text-yellow-500 mt-1">{totalNewResources.toFixed(2)} B</p>
                    </div>
                </div>

                {/* Forms Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <ProposalForm headings={headings} onSubmit={handleAddProposal} />
                    <NewResourcesForm headings={headings} onSubmit={handleAddResources} />
                </div>
                
                {/* Headings Dashboard */}
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6">Budget Headings Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {headings.map(heading => (
                            <HeadingCard key={heading.id} heading={heading} />
                        ))}
                    </div>
                </div>

                {/* Data Lists Section */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <div>
                         <h2 className="text-2xl font-bold text-slate-800 mb-6">Financial Implication Forms (Submitted)</h2>
                        <ProposalList proposals={allProposals} headings={headings}/>
                    </div>
                    <div>
                         <h2 className="text-2xl font-bold text-slate-800 mb-6">"New Own Resources" Log</h2>
                        <NewResourcesList resources={newResources} headings={headings}/>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;