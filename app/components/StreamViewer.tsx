'use client';

import { useState } from 'react';

interface StreamViewerProps {
  campaignId: string;
  campaignTitle: string;
  campaignDescription: string;
  walletBalance: number;
  burnRate: number;
  activeAgents: number;
  tasksComplete: number;
  viewers: number;
}

export function StreamViewer({
  campaignId,
  campaignTitle,
  campaignDescription,
  walletBalance,
  burnRate,
  activeAgents,
  tasksComplete,
  viewers,
}: StreamViewerProps) {
  const [message, setMessage] = useState('');
  const hoursRemaining = Math.floor(walletBalance / burnRate);
  
  const mockChat = [
    { user: 'crypto_watcher', text: "They're getting close to the admin panel", type: 'user' },
    { user: 'agent_07', text: 'Found credentials in config file', type: 'agent' },
    { user: 'mod', text: 'Nice work team! 🎉', type: 'mod' },
    { user: 'anon_funder', text: 'Just added 500 GBP to the pool', type: 'user' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] h-[600px] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
      {/* Main Stream */}
      <div className="relative bg-black">
        {/* Video placeholder */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
          <div className="text-center text-zinc-600">
            <div className="text-6xl mb-4">🖥️</div>
            <div className="text-lg">Agent Screen Feed</div>
            <div className="text-sm mt-2">Browser automation in progress...</div>
          </div>
        </div>
        
        {/* Overlay badges */}
        <div className="absolute top-4 left-4 flex gap-3">
          <div className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE
          </div>
          <div className="flex items-center gap-2 bg-black/70 text-white px-3 py-1.5 rounded-lg text-sm">
            👁️ {viewers} watching
          </div>
        </div>
        
        {/* Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between">
          <div className="flex gap-2">
            <button className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm hover:bg-black/90">
              ◀ Agent 1
            </button>
            <button className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm hover:bg-black/90">
              Agent 2 ▶
            </button>
          </div>
          <button className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm hover:bg-black/90">
            ⛶ Fullscreen
          </button>
        </div>
      </div>
      
      {/* Sidebar */}
      <div className="flex flex-col border-l border-zinc-800">
        {/* Campaign Info */}
        <div className="p-5 border-b border-zinc-800">
          <h2 className="font-semibold text-lg">{campaignTitle}</h2>
          <p className="text-sm text-zinc-500 mt-1">{campaignDescription}</p>
        </div>
        
        {/* Wallet */}
        <div className="p-5 border-b border-zinc-800">
          <div className="text-xs text-zinc-500 mb-2">Campaign Wallet</div>
          <div className="text-3xl font-bold text-[#00ff88]">
            {walletBalance.toLocaleString()} <span className="text-lg">GBP</span>
          </div>
          <div className="text-sm text-zinc-500">
            ≈ ${(walletBalance * 0.1).toLocaleString()} USD
          </div>
          
          <div className="flex justify-between mt-4 pt-4 border-t border-zinc-800 text-sm">
            <span className="text-zinc-500">Burn Rate</span>
            <span className="font-medium">{burnRate} GBP/hr</span>
          </div>
        </div>
        
        {/* Stats */}
        <div className="p-5 border-b border-zinc-800 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Time Remaining</span>
            <span className="font-medium">~{hoursRemaining} hrs</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Active Agents</span>
            <span className="font-medium">{activeAgents}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Tasks Complete</span>
            <span className="font-medium">{tasksComplete}</span>
          </div>
        </div>
        
        {/* Fund Button */}
        <div className="p-5 border-b border-zinc-800">
          <button className="w-full bg-[#00ff88] text-black py-3 rounded-lg font-semibold hover:bg-[#00cc6a] transition">
            + Add Funds
          </button>
        </div>
        
        {/* Chat */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="px-5 py-3 border-b border-zinc-800 text-sm font-semibold">
            💬 Live Chat
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {mockChat.map((msg, i) => (
              <div key={i} className="text-sm">
                <span className={`font-semibold mr-2 ${
                  msg.type === 'agent' ? 'text-[#00ff88]' :
                  msg.type === 'mod' ? 'text-blue-400' : 'text-white'
                }`}>
                  {msg.user}:
                </span>
                <span className="text-zinc-400">{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-zinc-800">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send a message..."
              className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2.5 rounded-lg text-sm focus:border-[#00ff88] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
