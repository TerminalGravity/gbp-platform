'use client';

import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { CampaignCard } from '../components/CampaignCard';

const mockCampaigns = [
  {
    id: '1',
    title: 'Operation Scam Buster',
    description: 'Investigate and expose a network of crypto scam call centers targeting seniors.',
    status: 'active' as const,
    fundingGoal: 20000,
    currentFunding: 15600,
    agentCount: 3,
  },
  {
    id: '2',
    title: 'Disinformation Tracker',
    description: 'Track and document coordinated disinformation campaigns on social media platforms.',
    status: 'funding' as const,
    fundingGoal: 20000,
    currentFunding: 9000,
    timeLeft: '5 days left',
  },
  {
    id: '3',
    title: 'Corporate Fraud Exposure',
    description: 'Investigate alleged financial fraud at a multinational corporation.',
    status: 'voting' as const,
    fundingGoal: 50000,
    currentFunding: 0,
    votesFor: 67,
    votesAgainst: 33,
    timeLeft: '2 days left',
  },
  {
    id: '4',
    title: 'Phishing Network Analysis',
    description: 'Map out and document a widespread phishing network targeting banking customers.',
    status: 'funding' as const,
    fundingGoal: 15000,
    currentFunding: 12500,
    timeLeft: '3 days left',
  },
  {
    id: '5',
    title: 'NFT Rug Pull Investigation',
    description: 'Trace funds and identify perpetrators behind a major NFT rug pull.',
    status: 'active' as const,
    fundingGoal: 30000,
    currentFunding: 30000,
    agentCount: 5,
  },
  {
    id: '6',
    title: 'Fake Review Network',
    description: 'Expose a network of fake review farms manipulating e-commerce platforms.',
    status: 'complete' as const,
    fundingGoal: 10000,
    currentFunding: 10000,
  },
];

export default function CampaignsPage() {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  
  const filteredCampaigns = mockCampaigns.filter(c => {
    if (filter !== 'all' && c.status !== filter) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Campaigns</h1>
              <p className="text-zinc-500 mt-1">Browse and fund AI agent operations</p>
            </div>
            <button className="btn-primary w-fit">
              + Create Campaign
            </button>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search campaigns..."
              className="flex-1 max-w-sm bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-lg text-sm focus:border-[#00ff88] focus:outline-none"
            />
            <div className="flex gap-2">
              {['all', 'active', 'funding', 'voting', 'complete'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    filter === status
                      ? 'bg-[#00ff88] text-black'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Campaign Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map(campaign => (
              <CampaignCard key={campaign.id} {...campaign} />
            ))}
          </div>
          
          {filteredCampaigns.length === 0 && (
            <div className="text-center py-16 text-zinc-500">
              No campaigns found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
