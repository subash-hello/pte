import { supabaseAdmin } from './supabase';

const BUCKET_NAME = 'pte-database';

export type CollectionName =
  | 'users'
  | 'branches'
  | 'question_items'
  | 'practice_questions'
  | 'announcements'
  | 'practice_responses'
  | 'scorecards'
  | 'templates'
  | 'vocabulary'
  | 'mock_tests'
  | 'ai_config';

// Default initial data for collections
export const INITIAL_BRANCHES = [
  {
    _id: 'b_1',
    id: 'b_1',
    name: 'Kathmandu Central Campus',
    code: 'KTM01',
    location: 'Putalisadak, Kathmandu',
    adminName: 'Ramesh Sharma',
    adminEmail: 'ktm.admin@pteai.com',
    adminPhone: '+977 9851012345',
    status: 'active' as const,
    userLimit: 0, // 0 = Unlimited
    studentCapacity: 150,
    createdAt: new Date('2026-07-15').toISOString(),
    updatedAt: new Date('2026-07-15').toISOString(),
  },
  {
    _id: 'b_2',
    id: 'b_2',
    name: 'Pokhara Regional Campus',
    code: 'PKR02',
    location: 'Chipledhunga, Pokhara',
    adminName: 'Sita Sharma',
    adminEmail: 'pokhara.admin@pteai.com',
    adminPhone: '+977 9856023456',
    status: 'active' as const,
    userLimit: 100,
    studentCapacity: 100,
    createdAt: new Date('2026-07-20').toISOString(),
    updatedAt: new Date('2026-07-20').toISOString(),
  },
  {
    _id: 'b_3',
    id: 'b_3',
    name: 'Lalitpur Tech Branch',
    code: 'LAL03',
    location: 'Kumaripati, Lalitpur',
    adminName: 'Nabin Silwal',
    adminEmail: 'lalitpur.admin@pteai.com',
    adminPhone: '+977 9855022334',
    status: 'active' as const,
    userLimit: 100,
    studentCapacity: 80,
    createdAt: new Date('2026-08-01').toISOString(),
    updatedAt: new Date('2026-08-01').toISOString(),
  },
  {
    _id: 'b_4',
    id: 'b_4',
    name: 'Chitwan Academic Centre',
    code: 'CHT04',
    location: 'Lions Chowk, Bharatpur',
    adminName: 'Anuraj Phuyal',
    adminEmail: 'chitwan.admin@pteai.com',
    adminPhone: '+977 9845012345',
    status: 'active' as const,
    userLimit: 50,
    studentCapacity: 60,
    createdAt: new Date('2026-08-10').toISOString(),
    updatedAt: new Date('2026-08-10').toISOString(),
  },
  {
    _id: 'b_5',
    id: 'b_5',
    name: 'KIEC Consultancy Putalisadak',
    code: 'KIEC13',
    location: 'Putalisadak, Kathmandu',
    adminName: 'Bishal Adhikari',
    adminEmail: 'kiec.admin@pteai.com',
    adminPhone: '+977 9801012345',
    status: 'active' as const,
    userLimit: 0,
    studentCapacity: 250,
    createdAt: new Date('2026-08-18').toISOString(),
    updatedAt: new Date('2026-08-18').toISOString(),
  },
];

export const INITIAL_QUESTION_ITEMS = [
  { _id: 'q_01', id: 'q_01', section: 'speaking', type: 'Read Aloud', code: 'RA-104', title: 'Climate Dynamics in Sub-Saharan Africa', difficulty: 'Medium', promptText: 'Climate variability in sub-Saharan Africa creates severe agricultural vulnerabilities...', testedCount: 342, isActive: true, createdAt: new Date().toISOString() },
  { _id: 'q_02', id: 'q_02', section: 'speaking', type: 'Repeat Sentence', code: 'RS-208', title: 'Library Operating Hours Exam Period', difficulty: 'Easy', promptText: 'The university library will remain open throughout the exam period.', testedCount: 512, isActive: true, createdAt: new Date().toISOString() },
  { _id: 'q_03', id: 'q_03', section: 'writing', type: 'Write Essay', code: 'WE-402', title: 'AI and Future Employment Structures', difficulty: 'Hard', promptText: 'Discuss how generative artificial intelligence impacts workforce employment.', testedCount: 289, isActive: true, createdAt: new Date().toISOString() },
  { _id: 'q_04', id: 'q_04', section: 'writing', type: 'Summarize Written Text', code: 'SWT-301', title: 'Urbanization Patterns and Renewable Energy Transitions', difficulty: 'Medium', promptText: 'Rapid urbanization throughout developing countries necessitates renewable grids...', testedCount: 195, isActive: true, createdAt: new Date().toISOString() },
  { _id: 'q_05', id: 'q_05', section: 'reading', type: 'Fill in Blanks (R&W)', code: 'FIB-RW-112', title: 'Cognitive Neuroscience and Human Memory Retainability', difficulty: 'Hard', promptText: 'Neuroscience reveals synaptic plasticity is the primary driver of long-term memory...', testedCount: 420, isActive: true, createdAt: new Date().toISOString() },
  { _id: 'q_06', id: 'q_06', section: 'reading', type: 'Re-order Paragraphs', code: 'ROP-205', title: 'Historical Evolution of Printing Press Mechanization', difficulty: 'Medium', promptText: 'Before the invention of the movable type printing press by Johannes Gutenberg...', testedCount: 310, isActive: true, createdAt: new Date().toISOString() },
  { _id: 'q_07', id: 'q_07', section: 'listening', type: 'Summarize Spoken Text', code: 'SST-504', title: 'Deep Ocean Biodiversity and Marine Protected Zones', difficulty: 'Hard', promptText: 'Marine biologists have surveyed deep ocean trenches discovering thousands of organisms...', testedCount: 260, isActive: true, createdAt: new Date().toISOString() },
  { _id: 'q_08', id: 'q_08', section: 'listening', type: 'Write from Dictation', code: 'WFD-619', title: 'Departmental Assignment Guidelines', difficulty: 'Easy', promptText: 'All submitted assignments must follow the departmental formatting guidelines.', testedCount: 680, isActive: true, createdAt: new Date().toISOString() },
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    _id: 'a_01',
    id: 'a_01',
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
    id: 'a_02',
    title: 'Kathmandu Campus: Intensive PTE Academic Mock Series',
    body: 'Registration for Sunday 3-hour full length mock exam is now open. Book with your instructor.',
    target: 'Kathmandu Central Campus',
    senderName: 'Ramesh Sharma',
    senderRole: 'branch_admin',
    isImportant: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    _id: 'a_03',
    id: 'a_03',
    title: 'PTE 2026 Academic Rubric Engine Active',
    body: 'All speech scoring engines now evaluate oral fluency & pronunciation with 90-band accuracy.',
    target: 'all',
    senderName: 'Super Admin',
    senderRole: 'super_admin',
    isImportant: true,
    createdAt: new Date().toISOString(),
  },
];

let bucketChecked = false;
const memoryCache = new Map<CollectionName, any[]>();

async function ensureBucket(): Promise<boolean> {
  if (bucketChecked) return true;
  try {
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    const exists = (buckets || []).some(b => b.name === BUCKET_NAME);
    if (!exists) {
      await supabaseAdmin.storage.createBucket(BUCKET_NAME, {
        public: false,
      });
    }
    bucketChecked = true;
    return true;
  } catch (err) {
    console.warn('Supabase storage bucket check warning:', err);
    return false;
  }
}

function getDefaultCollection(name: CollectionName): any[] {
  switch (name) {
    case 'branches':
      return [...INITIAL_BRANCHES];
    case 'question_items':
      return [...INITIAL_QUESTION_ITEMS];
    case 'announcements':
      return [...INITIAL_ANNOUNCEMENTS];
    default:
      return [];
  }
}

export const supabaseStore = {
  /**
   * Read a collection from Supabase Storage (with fallback to defaults)
   */
  async getCollection<T = any>(name: CollectionName): Promise<T[]> {
    try {
      await ensureBucket();
      const { data, error } = await supabaseAdmin.storage.from(BUCKET_NAME).download(`${name}.json`);
      if (!error && data) {
        const text = await data.text();
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
          memoryCache.set(name, parsed);
          return parsed as T[];
        }
      }
    } catch {
      // Fall through to cache or defaults
    }

    if (memoryCache.has(name)) {
      return memoryCache.get(name) as T[];
    }

    const defaults = getDefaultCollection(name);
    memoryCache.set(name, defaults);
    return defaults as T[];
  },

  /**
   * Save an entire collection into Supabase Storage
   */
  async saveCollection<T = any>(name: CollectionName, items: T[]): Promise<boolean> {
    memoryCache.set(name, items);
    try {
      await ensureBucket();
      const payload = JSON.stringify(items, null, 2);
      const blob = new Blob([payload], { type: 'application/json' });
      const { error } = await supabaseAdmin.storage
        .from(BUCKET_NAME)
        .upload(`${name}.json`, blob, {
          contentType: 'application/json',
          upsert: true,
        });
      return !error;
    } catch (err) {
      console.warn(`Supabase storage saveCollection(${name}) warning:`, err);
      return false;
    }
  },

  /**
   * Insert a single item at the start of a collection in Supabase
   */
  async insertItem<T extends Record<string, any>>(name: CollectionName, item: T): Promise<T> {
    const items = await this.getCollection<T>(name);
    const id = item._id || item.id || `${name.slice(0, 2)}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const now = new Date().toISOString();
    const record: any = {
      ...item,
      _id: id,
      id,
      createdAt: item.createdAt || now,
      updatedAt: item.updatedAt || now,
    };
    items.unshift(record);
    await this.saveCollection(name, items);
    return record as T;
  },

  /**
   * Update an item by id/_id in a collection in Supabase
   */
  async updateItem<T extends Record<string, any>>(
    name: CollectionName,
    id: string,
    updates: Partial<T>
  ): Promise<T | null> {
    const items = await this.getCollection<T>(name);
    const idx = items.findIndex((it: any) => it._id === id || it.id === id);
    if (idx === -1) return null;

    const updated = {
      ...items[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    items[idx] = updated;
    await this.saveCollection(name, items);
    return updated;
  },

  /**
   * Delete an item by id/_id in a collection in Supabase
   */
  async deleteItem(name: CollectionName, id: string): Promise<boolean> {
    const items = await this.getCollection<any>(name);
    const filtered = items.filter((it: any) => it._id !== id && it.id !== id);
    if (filtered.length === items.length) return false;
    await this.saveCollection(name, filtered);
    return true;
  },
};

export default supabaseStore;
