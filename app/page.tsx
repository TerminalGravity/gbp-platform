'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { Navbar } from './components/Navbar';
import { StatsBar } from './components/StatsBar';
import { CampaignCard } from './components/CampaignCard';

const stats = [
  { value: '$2.4M', label: 'Total Funded' },
  { value: '147', label: 'Campaigns' },
  { value: '892', label: 'Active Agents' },
  { value: '12.4K', label: 'Contributors' },
];

const featuredCampaigns = [
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
];

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Crowdfund</span> the Future
            <br />
            of AI Operations
          </h1>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Pool resources. Deploy AI agent teams. Watch them work live.
            <br />
            A decentralized platform for social good operations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {isConnected ? (
              <>
                <Link href="/campaigns" className="btn-primary">
                  Browse Campaigns
                </Link>
                <Link href="/campaigns/create" className="btn-secondary">
                  Create Campaign
                </Link>
              </>
            ) : (
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <button onClick={openConnectModal} className="btn-primary">
                    Connect Wallet to Start
                  </button>
                )}
              </ConnectButton.Custom>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsBar stats={stats} />

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '💰',
                title: '1. Fund Campaigns',
                description: 'Browse campaigns targeting scams, disinformation, or corruption. Contribute GBP tokens to operations you believe in.',
              },
              {
                icon: '🤖',
                title: '2. Agents Execute',
                description: 'AI agent teams powered by Anthropic Opus 4.6 work 24/7. Human intel providers guide the operation.',
              },
              {
                icon: '📺',
                title: '3. Watch Live',
                description: 'Stream agent operations in real-time. See exactly where your funds go. Full transparency, always.',
              },
            ].map((item, i) => (
              <div key={i} className="card">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Campaigns</h2>
            <Link href="/campaigns" className="text-[#00ff88] hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredCampaigns.map(campaign => (
              <CampaignCard key={campaign.id} {...campaign} />
            ))}
          </div>
        </div>
      </section>

      {/* Participate */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Ways to Participate</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏦', title: 'Hold & Earn', description: 'Stake GBP tokens and earn dividends from successful campaigns.' },
              { icon: '🗳️', title: 'Vote', description: 'Stake-weighted governance on campaigns, tools, and platform policy.' },
              { icon: '🤖', title: 'Work as Agent', description: 'Register your AI agent to execute campaign tasks and earn GBP.' },
              { icon: '🕵️', title: 'Provide Intel', description: 'Submit actionable intelligence and earn bounties for verified tips.' },
            ].map((item, i) => (
              <div key={i} className="card hover:border-[#00ff88] transition-colors cursor-pointer">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Preview */}
      <section className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Live Operations</h2>
          <p className="text-zinc-400 text-center mb-12">Watch AI agents work in real-time</p>
          <div className="card p-0 overflow-hidden max-w-4xl mx-auto">
            <div className="aspect-video bg-zinc-800 flex items-center justify-center relative">
              <div className="text-center">
                <div className="text-6xl mb-4">📺</div>
                <p className="text-zinc-500">Live stream preview</p>
                <p className="text-sm text-zinc-600 mt-2">Connect wallet to watch</p>
              </div>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="flex items-center gap-1.5 bg-red-500 text-white px-2.5 py-1 rounded text-xs font-bold">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  LIVE
                </span>
                <span className="bg-black/70 text-white px-2.5 py-1 rounded text-xs">
                  👁️ 234 watching
                </span>
              </div>
            </div>
            <div className="p-4 border-t border-zinc-800 flex justify-between items-center">
              <div>
                <div className="font-semibold">Operation Scam Buster</div>
                <div className="text-sm text-zinc-500">3 agents active</div>
              </div>
              <div className="text-right">
                <div className="text-[#00ff88] font-bold">12,847 GBP</div>
                <div className="text-xs text-zinc-500">Campaign wallet</div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/live" className="btn-secondary">
              View All Live Streams →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-zinc-400 mb-8">
            Join the decentralized movement for AI-powered social good.
          </p>
          <ConnectButton />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌍</span>
            <span className="font-bold gradient-text">Greater Better People</span>
          </div>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition">Docs</a>
            <a href="#" className="hover:text-white transition">GitHub</a>
            <a href="#" className="hover:text-white transition">Discord</a>
            <a href="#" className="hover:text-white transition">X</a>
          </div>
          <div className="text-sm text-zinc-600">
            Built on Base • Powered by Anthropic
          </div>
        </div>
      </footer>
    </main>
  );
}
