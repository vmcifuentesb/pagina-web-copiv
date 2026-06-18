export interface Service {
  id: string;
  title: string;
  category: 'physical' | 'technological';
  categoryLabel: string;
  description: string;
  image: string;
  features: string[];
  ctaLabel: string;
}

export interface CaseStudy {
  title: string;
  category: string;
  desc: string;
  loc: string;
  eff: string;
  img: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; value: number }[];
}

export interface QuizResult {
  score: number;
  level: 'low' | 'medium' | 'high' | 'critical';
  label: string;
  recommendations: string[];
}

export interface NavItem {
  href: string;
  label: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface SanityConfig {
  projectId: string;
  dataset: string;
  apiVersion: string;
}

export interface MetaData {
  title: string;
  description: string;
  ogImage?: string;
}
