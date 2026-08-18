import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Announcement from '@/models/Announcement';
import { verifyAdminAuth } from '@/lib/auth';

const fallbackAnnouncements = [
  {
    _id: 'a_01',
    title: 'Platform Maintenance Notice: Sunday 2:00 AM - 4:00 AM',
    body: 'Scheduled database indexing and high-speed audio model upgrades will take place this Sunday.',
    target: 'all',
    senderName: 'Super Admin',
    senderRole: 'super_admin',
    isImportant: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: 'a_02',
    title: 'Kathmandu Campus: Intensive PTE Academic Mock Series',
    body: 'Registration for Sunday 3-hour full length mock exam is now open. Book with your instructor.',
    target: 'Kathmandu Central Campus',
    senderName: 'Ramesh Sharma',
    senderRole: 'branch_admin',
    isImportant: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  }
];

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: true, announcements: fallbackAnnouncements });
    }

    const announcements = await Announcement.find().sort({ createdAt: -1 }).limit(20);
    if (!announcements || announcements.length === 0) {
      return NextResponse.json({ success: true, announcements: fallbackAnnouncements });
    }

    return NextResponse.json({ success: true, announcements });
  } catch (error: any) {
    return NextResponse.json({ success: true, announcements: fallbackAnnouncements });
  }
}

export async function POST(request: NextRequest) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, body: alertBody, target, isImportant } = body;

    if (!title || !alertBody) {
      return NextResponse.json({ success: false, message: 'Missing title or body' }, { status: 400 });
    }

    const db = await connectToDatabase();
    if (!db) {
      const newA = {
        _id: `a_${Date.now()}`,
        title,
        body: alertBody,
        target: target || 'all',
        senderName: adminUser.name || 'Admin',
        senderRole: adminUser.role || 'super_admin',
        isImportant: Boolean(isImportant),
        createdAt: new Date().toISOString(),
      };
      fallbackAnnouncements.unshift(newA as any);
      return NextResponse.json({ success: true, announcement: newA }, { status: 201 });
    }

    const announcement = new Announcement({
      title,
      body: alertBody,
      target: target || 'all',
      senderName: adminUser.name || 'Admin',
      senderRole: adminUser.role || 'super_admin',
      isImportant: Boolean(isImportant),
    });

    await announcement.save();
    return NextResponse.json({ success: true, announcement }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
