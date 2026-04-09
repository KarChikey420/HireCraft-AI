import axios from 'axios';
import authService from './auth.service';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const getHeaders = () => {
  const token = authService.getToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};

export interface RefinedResumeResponse {
  refined_sections: {
    summary: string;
    experience: {
      company: string;
      role: string;
      duration: string;
      bullets_original: string[];
      bullets_refined: string[];
      changes: string[];
    }[];
    skills: {
      original: string[];
      refined: string[];
      added: string[];
      removed: string[];
    };
    projects: {
      name: string;
      bullets_refined: string[];
    }[];
  };
  gap_analysis: {
    missing_keywords: string[];
    unquantified_bullets: number;
    weak_verbs_replaced: number;
    filler_phrases_removed: string[];
  };
  ats_score: { before: number; after: number };
  recruiter_simulation: {
    shortlist: 'YES' | 'MAYBE' | 'NO';
    reasoning: string;
    first_6_seconds: string;
    rejection_risks: string[];
  };
  role_radar: Record<string, number>;
  what_to_fix_next: string[];
}

export interface TailorResponse {
  tailored_resume: string;
  changes_summary: string[];
}

export interface ATSScoreResponse {
  score: number;
  matched_keywords: string[];
  missing_keywords: string[];
  section_scores: {
    skills: number;
    experience: number;
    summary: number;
  };
  suggestions: string[];
}

const resumeService = {
  async parseResume(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post<{ text: string }>(
      `${API_BASE}/resume/parse`,
      formData,
      { headers: getHeaders() }
    );
    return response.data.text;
  },

  async refineResume(
    file: File,
    jobDescription: string = '',
    mode: string = 'polish',
    targetRole: string = ''
  ): Promise<RefinedResumeResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('job_description', jobDescription);
    formData.append('mode', mode);
    formData.append('target_role', targetRole);

    const response = await axios.post<RefinedResumeResponse>(
      `${API_BASE}/refiner`,
      formData,
      { headers: getHeaders() }
    );
    return response.data;
  },

  async tailorResume(resumeText: string, jd: string): Promise<TailorResponse> {
    const response = await axios.post<TailorResponse>(
      `${API_BASE}/resume/tailor`,
      { resume_text: resumeText, job_description: jd },
      { headers: getHeaders() }
    );
    return response.data;
  },

  async getATSScore(resumeText: string, jd: string): Promise<ATSScoreResponse> {
    const response = await axios.post<ATSScoreResponse>(
      `${API_BASE}/resume/ats-score`,
      { resume_text: resumeText, job_description: jd },
      { headers: getHeaders() }
    );
    return response.data;
  },
};

export default resumeService;
