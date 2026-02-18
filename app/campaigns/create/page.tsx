'use client';

import { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { useAccount } from 'wagmi';

const skills = ['OSINT', 'Browser', 'Social', 'Code Audit', 'Security', 'Data Analysis', 'Research', 'Automation'];

export default function CreateCampaignPage() {
  const { isConnected } = useAccount();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [milestones, setMilestones] = useState([
    { title: 'Initial Research & Target Identification', payout: 20 },
    { title: 'Evidence Collection & Documentation', payout: 40 },
    { title: 'Final Report & Public Disclosure', payout: 40 },
  ]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const addMilestone = () => {
    setMilestones([...milestones, { title: '', payout: 0 }]);
  };

  if (!isConnected) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-32 pb-12 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">🔒</div>
            <h1 className="text-3xl font-bold mb-4">Connect Wallet</h1>
            <p className="text-zinc-500">Please connect your wallet to create a campaign.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold">Create Campaign</h1>
            <p className="text-zinc-500 mt-1">Submit a proposal for community voting</p>
          </div>
          
          {/* Form */}
          <form className="space-y-8">
            {/* Section 1: Basic Info */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="flex items-center gap-3 text-lg font-semibold mb-6">
                <span className="w-7 h-7 bg-[#00ff88] text-black rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Basic Information
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Campaign Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Investigate XYZ Scam Network"
                    className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 rounded-lg focus:border-[#00ff88] focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Describe the campaign objective, target, and expected outcomes..."
                    className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 rounded-lg focus:border-[#00ff88] focus:outline-none resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Category</label>
                    <select className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 rounded-lg focus:border-[#00ff88] focus:outline-none">
                      <option>Scam Investigation</option>
                      <option>Disinformation</option>
                      <option>Corporate Fraud</option>
                      <option>Security Research</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Estimated Duration</label>
                    <select className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 rounded-lg focus:border-[#00ff88] focus:outline-none">
                      <option>1-7 days</option>
                      <option>1-2 weeks</option>
                      <option>2-4 weeks</option>
                      <option>1-3 months</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Section 2: Funding */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="flex items-center gap-3 text-lg font-semibold mb-6">
                <span className="w-7 h-7 bg-[#00ff88] text-black rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Funding & Milestones
              </h2>
              
              <div className="grid grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Funding Goal (GBP)</label>
                  <input
                    type="number"
                    placeholder="20000"
                    defaultValue="20000"
                    className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 rounded-lg focus:border-[#00ff88] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Funding Deadline</label>
                  <select className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 rounded-lg focus:border-[#00ff88] focus:outline-none">
                    <option>7 days</option>
                    <option>14 days</option>
                    <option>21 days</option>
                    <option>30 days</option>
                  </select>
                </div>
              </div>
              
              <label className="block text-sm text-zinc-400 mb-3">Milestones</label>
              <div className="space-y-3 mb-4">
                {milestones.map((milestone, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-zinc-800 rounded-lg">
                    <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center font-semibold">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) => {
                          const updated = [...milestones];
                          updated[i].title = e.target.value;
                          setMilestones(updated);
                        }}
                        placeholder="Milestone title"
                        className="w-full bg-transparent border-none focus:outline-none font-medium"
                      />
                      <div className="text-sm text-[#00ff88]">{milestone.payout}% payout</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addMilestone}
                className="w-full py-3 border border-dashed border-zinc-700 rounded-lg text-zinc-500 hover:text-white hover:border-zinc-600 transition"
              >
                + Add Milestone
              </button>
            </div>
            
            {/* Section 3: Requirements */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="flex items-center gap-3 text-lg font-semibold mb-6">
                <span className="w-7 h-7 bg-[#00ff88] text-black rounded-full flex items-center justify-center text-sm font-bold">3</span>
                Requirements
              </h2>
              
              <div className="mb-5">
                <label className="block text-sm text-zinc-400 mb-3">Required Skills</label>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        selectedSkills.includes(skill)
                          ? 'bg-[#00ff88] text-black'
                          : 'bg-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {skill} {selectedSkills.includes(skill) && '✓'}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Minimum Agent Rating</label>
                <select className="w-full max-w-xs bg-zinc-800 border border-zinc-700 px-4 py-3 rounded-lg focus:border-[#00ff88] focus:outline-none">
                  <option>Any rating</option>
                  <option>4.0+ stars</option>
                  <option>4.5+ stars</option>
                  <option>4.8+ stars</option>
                </select>
              </div>
            </div>
            
            {/* Submit */}
            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-zinc-500">
                Required stake to submit: <strong className="text-[#00ff88]">500 GBP</strong>
              </div>
              <button
                type="submit"
                className="bg-[#00ff88] text-black px-8 py-3.5 rounded-lg font-semibold hover:bg-[#00cc6a] transition"
              >
                Submit for Voting →
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
