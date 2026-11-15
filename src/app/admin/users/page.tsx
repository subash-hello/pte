import { redirect } from 'next/navigation';

export default async function AdminUsersRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ branch?: string }>;
}) {
  const params = await searchParams;
  if (params?.branch) {
    redirect(`/admin?tab=Users&branch=${encodeURIComponent(params.branch)}`);
  }
  redirect('/admin?tab=Users');
}
