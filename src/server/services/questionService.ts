import { connectDB } from '../db/mongodb';
import PracticeResponse from '../models/PracticeResponse';
import { PTEPracticeQuestions } from '@/data/practice-questions';

export const questionService = {
  getQuestions(section?: string, type?: string, search?: string) {
    return PTEPracticeQuestions.filter(q => {
      const matchSection = !section || section === 'all' || q.section.toLowerCase() === section.toLowerCase();
      const matchType = !type || type === 'all' || q.type === type;
      const matchSearch = !search || !search.trim() || 
        q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.itemCategory.toLowerCase().includes(search.toLowerCase());
      return matchSection && matchType && matchSearch;
    });
  },

  async recordPracticeResponse(data: {
    userId?: string;
    userEmail?: string;
    branch?: string;
    questionId: string;
    questionType: string;
    section: string;
    userAnswerText: string;
    overallScore: number;
    enablingSkills: any;
    feedbackDetails: string[];
    explanation?: string;
    aiEvaluated?: boolean;
  }) {
    const db = await connectDB();
    if (db) {
      const resp = new PracticeResponse(data);
      return await resp.save();
    }
    return data;
  },

  async getHistoryForUser(userId: string) {
    const db = await connectDB();
    if (db) {
      return PracticeResponse.find({ userId }).sort({ createdAt: -1 }).limit(50);
    }
    return [];
  }
};

export default questionService;
