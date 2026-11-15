import { supabaseStore } from '../db/supabaseStore';
import { PTEPracticeQuestions } from '@/data/practice-questions';

export const questionService = {
  getQuestions(section?: string, type?: string, search?: string) {
    return PTEPracticeQuestions.filter(q => {
      const matchSection = !section || section === 'all' || q.section.toLowerCase() === section.toLowerCase();
      const matchType = !type || type === 'all' || q.type === type;
      const matchSearch =
        !search ||
        !search.trim() ||
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
    return supabaseStore.insertItem('practice_responses', {
      _id: `pr_${Date.now()}`,
      ...data,
    });
  },

  async getHistoryForUser(userId: string) {
    const all = await supabaseStore.getCollection<any>('practice_responses');
    return all.filter(r => r.userId === userId).slice(0, 50);
  },
};

export default questionService;
