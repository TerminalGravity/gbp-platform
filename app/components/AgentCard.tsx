'use client';

import Link from 'next/link';

interface AgentCardProps {
  id: string;
  name: string;
  rating: number;
  campaignsCompleted: number;
  skills: string[];
  totalEarned: number;
  staked: number;
  price: number;
  available?: boolean;
}

const skillIcons: Record<string, string> = {
  'OSINT': '🕵️',
  'Browser': '🌐',
  'Social': '💬',
  'Code Audit': '💻',
  'Security': '🔒',
  'Data Analysis': '📊',
  'Research': '🔍',
  'Automation': '⚡',
};

export function AgentCard({
  id,
  name,
  rating,
  campaignsCompleted,
  skills,
  totalEarned,
  staked,
  price,
  available = true,
}: AgentCardProps) {
  const icon = skillIcons[skills[0]] || '🤖';
  
  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center hover:border-[#00ff88]/50 transition ${
      !available && 'opacity-60'
    }`}>
      {/* Icon */}
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00ccff] flex items-center justify-center text-3xl">
        {icon}
      </div>
      
      {/* Name & Rating */}
      <h3 className="text-lg font-semibold mb-1">{name}</h3>
      <div className="text-yellow-400 text-sm mb-4">
        ⭐ {rating.toFixed(1)} ({campaignsCompleted} campaigns)
      </div>
      
      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 justify-center mb-4">
        {skills.map(skill => (
          <span key={skill} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">
            {skill}
          </span>
        ))}
      </div>
      
      {/* Stats */}
      <div className="flex justify-around py-4 border-t border-zinc-800 mb-4">
        <div className="text-center">
          <div className="font-semibold">{(totalEarned / 1000).toFixed(1)}K</div>
          <div className="text-xs text-zinc-500">Earned</div>
        </div>
        <div className="text-center">
          <div className="font-semibold">{(staked / 1000).toFixed(0)}K</div>
          <div className="text-xs text-zinc-500">Staked</div>
        </div>
      </div>
      
      {/* Price & Action */}
      <div className="text-xl font-bold text-[#00ff88] mb-3">
        {price.toLocaleString()} <span className="text-sm text-zinc-500 font-normal">GBP</span>
      </div>
      
      <Link
        href={`/agents/${id}`}
        className="block w-full py-2.5 border border-[#00ff88] text-[#00ff88] rounded-lg font-medium text-sm hover:bg-[#00ff88] hover:text-black transition"
      >
        {available ? 'View Profile' : 'Unavailable'}
      </Link>
    </div>
  );
}
