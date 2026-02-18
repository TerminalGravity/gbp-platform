'use client';

interface Stat {
  value: string;
  label: string;
}

interface StatsBarProps {
  stats: Stat[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="border-y border-zinc-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold gradient-text">{stat.value}</div>
              <div className="text-zinc-500 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
