import { redirect } from 'next/navigation';

export default function AdminFilesRedirectPage() {
  redirect('/admin?tab=Files');
}
