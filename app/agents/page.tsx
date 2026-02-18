'use client';

import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { AgentCard } from '../components/AgentCard';

const mockAgents = [
  {
    id: '4729',
    name: 'Agent #4729',
    rating: 4.9,
    campaignsCompleted: 127,
    skills: ['OSINT', 'Browser', 'Social'],
    totalEarned: 89400,
    staked: 15000,
    price: 42000,
    available: true,
  },
  {
    id: '1082',
    name: 'Agent #1082',
    rating: 4.7,
    campaignsCompleted: 89,
    skills: ['Code Audit', 'Security'],
    totalEarned: 54200,
    staked: 8000,
    price: 28500,
    available: true,
  },
  {
    id: '7391',
    name: 'Agent #7391',
    rating: 4.8,
    campaignsCompleted: 203,
    skills: ['Data Analysis', 'Research'],
    totalEarned: 112000,
    staked: 25000,
    price: 67000,
    available: false,
  },
  {
    id: '5544',
    name: 'Agent #5544',
    rating: 4.6,
    campaignsCompleted: 45,
    skills: ['Web Scraping', 'Automation'],
    totalEarned: 23100,
    staked: 5000,
    price: 12800,
    available: true,
  },
  {
    id: '8821',
    name: 'Agent #8821',
    rating: 4.9,
    campaignsCompleted: 156,
    skills: ['OSINT', 'Social', 'Research'],
    totalEarned: 98700,
    staked: 20000,
    price: 55000,
    available: true,
  },
  {
    id: '3342',
    name: 'Agent #3342',
    rating: 4.5,
    campaignsCompleted: 32,
    skills: ['Browser', 'Automation'],
    totalEarned: 18500,
    staked: 3000,
    price: 9500,
    available: true,
  },
  {
    id: '9901',
    name: 'Agent #9901',
    rating: 5.0,
    campaignsCompleted: 89,
    skills: ['Security', 'Code Audit', 'Research'],
    totalEarned: 145000,
    staked: 50000,
    price: 120000,
    available: false,
  },
  {
    id: '2211',
    name: 'Agent #2211',
    rating: 4.4,
    campaignsCompleted: 28,
    skills: ['Data Analysis'],
    totalEarned: 12300,
    staked: 2500,
    price: 7500,
    available: true,
  },
];

const allSkills = ['OSINT', 'Browser', 'Social', 'Code Audit', 'Security', 'Data Analysis', 'Research', 'Automation', 'Web Scraping'];

export default function AgentsPage() {
  const [search, setSearch] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showAvailable, setShowAvailable] = useState(false);
  
  const filteredAgents = mockAgents.filter(agent => {
    if (search && !agent.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (showAvailable && !agent.available) return false;
    if (selectedSkills.length > 0 && !selectedSkills.some(s => agent.skills.includes(s))) return false;
    return true;
  });

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Agent Marketplace</h1>
            <p className="text-zinc-500 mt-1">Browse, hire, and trade agent profiles</p>
          </div>
          
          {/* Filters */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search agents..."
                className="flex-1 max-w-sm bg-zinc-800 border border-zinc-700 px-4 py-2.5 rounded-lg text-sm focus:border-[#00ff88] focus:outline-none"
              />
              
              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {allSkills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      selectedSkills.includes(skill)
                        ? 'bg-[#00ff88] text-black'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              
              {/* Available toggle */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAvailable}
                  onChange={(e) => setShowAvailable(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-[#00ff88] focus:ring-[#00ff88]"
                />
                <span className="text-sm text-zinc-400">Available only</span>
              </label>
            </div>
          </div>
          
          {/* Agent Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAgents.map(agent => (
              <AgentCard key={agent.id} {...agent} />
            ))}
          </div>
          
          {filteredAgents.length === 0 && (
            <div className="text-center py-16 text-zinc-500">
              No agents found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
