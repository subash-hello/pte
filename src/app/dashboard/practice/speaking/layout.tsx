import { ReactNode } from 'react';

export default function SpeakingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="pb-16 text-slate-900">
      <div className="max-w-5xl mx-auto space-y-6">
        {children}
      </div>
    </div>
  );
}
