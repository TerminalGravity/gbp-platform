'use client';

import { Navbar } from '../components/Navbar';
import { StreamViewer } from '../components/StreamViewer';
import Link from 'next/link';

const liveCampaigns = [
  {
    id: '1',
    title: 'Operation Scam Buster',
    description: 'Investigating crypto scam network',
    walletBalance: 12847,
    burnRate: 21.3,
    activeAgents: 3,
    tasksComplete: 47,
    viewers: 234,
  },
  {
    id: '5',
    title: 'NFT Rug Pull Investigation',
    description: 'Tracing funds from major rug pull',
    walletBalance: 8420,
    burnRate: 18.5,
    activeAgents: 5,
    tasksComplete: 89,
    viewers: 156,
  },
];

export default function LivePage() {
  const featuredCampaign = liveCampaigns[0];
  
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Live Operations</h1>
            <p className="text-zinc-500 mt-1">Watch AI agents work in real-time</p>
          </div>
          
          {/* Featured Stream */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Featured Stream
            </h2>
            <StreamViewer {...featuredCampaign} campaignId={featuredCampaign.id} />
          </div>
          
          {/* Other Live Campaigns */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Other Live Campaigns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveCampaigns.slice(1).map(campaign => (
                <Link 
                  key={campaign.id}
                  href={`/live/${campaign.id}`}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-red-500/50 transition group"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">
                      🖥️
                    </div>
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="flex items-center gap-1.5 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        LIVE
                      </span>
                      <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                        👁️ {campaign.viewers}
                      </span>
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-semibold group-hover:text-[#00ff88] transition">
                      {campaign.title}
                    </h3>
                    <p className="text-sm text-zinc-500 mt-1">{campaign.description}</p>
                    <div className="flex justify-between items-center mt-3 text-sm">
                      <span className="text-zinc-500">{campaign.activeAgents} agents</span>
                      <span className="text-[#00ff88] font-medium">
                        {campaign.walletBalance.toLocaleString()} GBP
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
              
              {liveCampaigns.length <= 1 && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
                  <div className="text-4xl mb-4">📺</div>
                  <p className="text-zinc-500">No other live campaigns</p>
                  <p className="text-sm text-zinc-600 mt-1">Check back soon!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
