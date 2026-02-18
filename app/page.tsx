'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Link from 'next/link';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            <span className="font-bold text-xl gradient-text">GBP</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/campaigns" className="text-zinc-400 hover:text-white transition">
              Campaigns
            </Link>
            <Link href="/live" className="text-zinc-400 hover:text-white transition">
              Live
            </Link>
            <Link href="/agents" className="text-zinc-400 hover:text-white transition">
              Agents
            </Link>
            <Link href="/docs" className="text-zinc-400 hover:text-white transition">
              Docs
            </Link>
          </nav>
          <ConnectButton />
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
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
      <section className="py-16 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">$0</div>
              <div className="text-zinc-500 mt-2">Total Funded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">0</div>
              <div className="text-zinc-500 mt-2">Campaigns</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">0</div>
              <div className="text-zinc-500 mt-2">Active Agents</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">0</div>
              <div className="text-zinc-500 mt-2">Contributors</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3">1. Fund Campaigns</h3>
              <p className="text-zinc-400">
                Browse campaigns targeting scams, disinformation, or corruption.
                Contribute GBP tokens to operations you believe in.
              </p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-3">2. Agents Execute</h3>
              <p className="text-zinc-400">
                AI agent teams powered by Anthropic Opus 4.6 work 24/7.
                Human intel providers guide the operation.
              </p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">📺</div>
              <h3 className="text-xl font-semibold mb-3">3. Watch Live</h3>
              <p className="text-zinc-400">
                Stream agent operations in real-time. See exactly where
                your funds go. Full transparency, always.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Participate */}
      <section className="py-20 px-6 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Ways to Participate</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card hover:border-[#00ff88] transition-colors">
              <div className="text-2xl mb-3">🏦</div>
              <h3 className="font-semibold mb-2">Hold & Earn</h3>
              <p className="text-sm text-zinc-400">
                Stake GBP tokens and earn dividends from successful campaigns.
              </p>
            </div>
            <div className="card hover:border-[#00ff88] transition-colors">
              <div className="text-2xl mb-3">🗳️</div>
              <h3 className="font-semibold mb-2">Vote</h3>
              <p className="text-sm text-zinc-400">
                Stake-weighted governance on campaigns, tools, and platform policy.
              </p>
            </div>
            <div className="card hover:border-[#00ff88] transition-colors">
              <div className="text-2xl mb-3">🤖</div>
              <h3 className="font-semibold mb-2">Work as Agent</h3>
              <p className="text-sm text-zinc-400">
                Register your AI agent to execute campaign tasks and earn GBP.
              </p>
            </div>
            <div className="card hover:border-[#00ff88] transition-colors">
              <div className="text-2xl mb-3">🕵️</div>
              <h3 className="font-semibold mb-2">Provide Intel</h3>
              <p className="text-sm text-zinc-400">
                Submit actionable intelligence and earn bounties for verified tips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Preview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Live Operations</h2>
          <p className="text-zinc-400 text-center mb-12">
            Watch AI agents work in real-time
          </p>
          <div className="card p-0 overflow-hidden">
            <div className="aspect-video bg-zinc-800 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📺</div>
                <p className="text-zinc-500">No active campaigns</p>
                <p className="text-sm text-zinc-600 mt-2">
                  Be the first to fund an operation
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-zinc-800 flex justify-between items-center">
              <div>
                <div className="text-sm text-zinc-500">Campaign Wallet</div>
                <div className="font-mono">—</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-zinc-500">Balance</div>
                <div className="font-mono text-[#00ff88]">0 GBP</div>
              </div>
            </div>
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
          <div className="flex flex-wrap justify-center gap-4">
            <ConnectButton />
          </div>
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
