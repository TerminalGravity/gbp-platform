'use client';

import Link from 'next/link';

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  status: 'voting' | 'funding' | 'active' | 'paused' | 'complete';
  fundingGoal: number;
  currentFunding: number;
  agentCount?: number;
  timeLeft?: string;
  votesFor?: number;
  votesAgainst?: number;
}

const statusConfig = {
  voting: { label: 'VOTING', color: 'bg-blue-500/20 text-blue-400' },
  funding: { label: 'FUNDING', color: 'bg-[#00ff88]/20 text-[#00ff88]' },
  active: { label: 'LIVE', color: 'bg-red-500/20 text-red-400', pulse: true },
  paused: { label: 'PAUSED', color: 'bg-yellow-500/20 text-yellow-400' },
  complete: { label: 'COMPLETE', color: 'bg-zinc-500/20 text-zinc-400' },
};

export function CampaignCard({
  id,
  title,
  description,
  status,
  fundingGoal,
  currentFunding,
  agentCount = 0,
  timeLeft,
  votesFor = 0,
  votesAgainst = 0,
}: CampaignCardProps) {
  const config = statusConfig[status];
  const progress = status === 'voting' 
    ? (votesFor / (votesFor + votesAgainst || 1)) * 100
    : (currentFunding / fundingGoal) * 100;
  
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition">
      {/* Header */}
      <div className="p-5 border-b border-zinc-800">
        <div className={`inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${config.color}`}>
          {config.pulse && (
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
          )}
          {config.label}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-zinc-400 line-clamp-2">{description}</p>
      </div>
      
      {/* Progress */}
      <div className="p-5">
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mb-3">
          <div 
            className={`h-full rounded-full transition-all ${
              status === 'voting' ? 'bg-blue-400' : 'bg-[#00ff88]'
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm">
          {status === 'voting' ? (
            <>
              <span className="text-zinc-500">For: <strong className="text-white">{votesFor}%</strong></span>
              <span className="text-zinc-500">Against: <strong className="text-white">{votesAgainst}%</strong></span>
            </>
          ) : (
            <>
              <span className="text-zinc-500">Raised: <strong className="text-white">{currentFunding.toLocaleString()} GBP</strong></span>
              <span className="text-zinc-500">Goal: <strong className="text-white">{fundingGoal.toLocaleString()} GBP</strong></span>
            </>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-5 py-4 border-t border-zinc-800 flex justify-between items-center">
        {status === 'active' ? (
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <div className="flex -space-x-2">
              {[...Array(Math.min(agentCount, 3))].map((_, i) => (
                <div key={i} className="w-6 h-6 bg-zinc-800 border-2 border-zinc-900 rounded-full flex items-center justify-center text-xs">
                  🤖
                </div>
              ))}
            </div>
            {agentCount} agents
          </div>
        ) : (
          <span className="text-sm text-zinc-500">{timeLeft}</span>
        )}
        
        <Link 
          href={status === 'active' ? `/live/${id}` : `/campaigns/${id}`}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            status === 'active' 
              ? 'border border-red-500/50 text-red-400 hover:bg-red-500/10'
              : 'border border-zinc-700 text-white hover:bg-zinc-800'
          }`}
        >
          {status === 'active' ? '🔴 Watch Live' : status === 'funding' ? 'Fund →' : 'View →'}
        </Link>
      </div>
    </div>
  );
}
