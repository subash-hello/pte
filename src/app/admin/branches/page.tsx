'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BranchesRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/admin?tab=Branches+%26+Quotas');
  }, [router]);
  return (
    <div className="p-8 text-xs font-bold text-slate-500">
      Loading Branches &amp; Quotas Management...
    </div>
  );
}
