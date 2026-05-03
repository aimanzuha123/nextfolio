// nextfolio — Constants & Configuration

export const SITE_CONFIG = {
  name: 'Nextfolio',
  tagline: 'AI-Powered Portfolio Generator',
  description: 'Nextfolio is a premium AI-powered SaaS platform that helps students and freshers create stunning portfolio websites, ATS-ready resumes, and compelling personal brands in minutes.',
  url: 'https://nextfolio.ai',
};

export const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'Templates', href: '/templates' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
];

export const WIZARD_STEPS = [
  { id: 1, title: 'Personal Info', description: 'Basic details' },
  { id: 2, title: 'Education', description: 'Academic background' },
  { id: 3, title: 'Skills', description: 'Core competencies' },
  { id: 4, title: 'Projects', description: 'Key highlights' },
  { id: 5, title: 'Experience', description: 'Work history' },
  { id: 6, title: 'Upload', description: 'Resume import' },
  { id: 7, title: 'Design', description: 'Template & styling' }
];

export const STREAMS = [
  'Engineering', 'MBA', 'BCA/MCA', 'Design', 'Medical', 'Arts', 'Commerce', 'Law', 'Other'
];

export const SKILLS_DATABASE = [
  'JavaScript', 'Python', 'React', 'Node.js', 'Next.js', 'TypeScript', 'SQL',
  'UI/UX Design', 'Figma', 'Marketing', 'Data Analysis', 'Machine Learning', 'C++'
];

export const TEMPLATES = [
  { id: 'dev-dark', name: 'Developer Dark Neon', category: 'Engineering', description: 'Bold neon accents on a dark canvas', isPremium: false, popular: true, colors: ['#0a0a0a', '#00ff88', '#6366f1', '#22d3ee'] },
  { id: 'startup', name: 'Startup Founder', category: 'Business', description: 'Clean, minimal, and bold', isPremium: false, popular: false, colors: ['#ffffff', '#0f172a', '#6366f1', '#f59e0b'] },
  { id: 'corp', name: 'Corporate Executive', category: 'MBA', description: 'Professional elegance with a corporate edge', isPremium: true, popular: false, colors: ['#f8fafc', '#1e293b', '#0ea5e9', '#0f766e'] },
  { id: 'creative', name: 'Creative Designer', category: 'Design', description: 'Vibrant and expressive layout', isPremium: true, popular: true, colors: ['#faf5ff', '#7c3aed', '#ec4899', '#f59e0b'] },
  { id: 'finance', name: 'Finance Professional', category: 'Commerce', description: 'Trust-inspiring design for finance professionals', isPremium: true, popular: false, colors: ['#ffffff', '#0c4a6e', '#059669', '#d97706'] },
  { id: 'medical', name: 'Healthcare Clean', category: 'Medical', description: 'Clean, trustworthy design', isPremium: true, popular: false, colors: ['#f0fdf4', '#064e3b', '#059669', '#0ea5e9'] },
  { id: 'legal', name: 'Elegant Legal', category: 'Law', description: 'Sophisticated and authoritative', isPremium: true, popular: false, colors: ['#fffbeb', '#1c1917', '#92400e', '#78350f'] },
  { id: 'fresher', name: 'Fresher Modern', category: 'All Streams', description: 'Fresh, modern, and energetic', isPremium: false, popular: false, colors: ['#09090b', '#818cf8', '#f472b6', '#34d399'] },
];

export const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer @ TechCorp',
    stream: 'B.Tech CS',
    university: 'Delhi University',
    rating: 5,
    content: 'Nextfolio transformed my career. I went from zero online presence to landing 3 interview calls within a week of publishing my portfolio.',
  },
  {
    name: 'Rahul Desai',
    role: 'Product Designer',
    stream: 'Design',
    university: 'NID Ahmedabad',
    rating: 5,
    content: 'The templates are incredibly premium. It feels like I paid a top-tier agency to build my personal brand.',
  },
  {
    name: 'Ananya Gupta',
    role: 'Marketing Associate',
    stream: 'MBA',
    university: 'IIM Bangalore',
    rating: 5,
    content: 'The AI content generation is magic. It took my basic college projects and translated them into professional business impact.',
  }
];

export const FAQ_DATA = [
  {
    question: 'What is Nextfolio?',
    answer: 'Nextfolio is an AI-powered platform that helps students and freshers create stunning portfolio websites, ATS-ready resumes, professional LinkedIn summaries, and complete personal brands — all in minutes.',
  },
  {
    question: 'Is Nextfolio really free to start?',
    answer: 'Yes! Our free plan includes 1 essential portfolio template and basic AI generation. You can upgrade to Student Pro or Career Pro for advanced features.',
  },
  {
    question: 'Which streams does Nextfolio support?',
    answer: 'Nextfolio supports all streams — MCA, BCA, Engineering, MBA, BBA, Commerce, Arts, Science, Law, Medical, Design, and general graduates. Our AI tailors content based on your specific field.',
  }
];

export const PLANS = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started',
    price: 0,
    period: '',
    features: ['1 Portfolio', 'Basic Template', 'Standard AI Gen'],
    limitations: ['Custom Domain', 'Analytics', 'PDF Export'],
    popular: false,
    cta: 'Get Started',
  },
  {
    id: 'student-pro',
    name: 'Student Pro',
    description: 'Everything you need to stand out',
    price: 99,
    period: '/mo',
    features: ['Unlimited Portfolios', 'All Templates', 'Advanced AI', 'PDF Export'],
    limitations: ['Custom Domain', 'Analytics'],
    popular: true,
    cta: 'Upgrade to Pro',
  },
  {
    id: 'career-pro',
    name: 'Career Pro',
    description: 'Ultimate tools for working professionals',
    price: 299,
    period: '/mo',
    features: ['Custom Domain', 'ATS Tools', 'Analytics', 'LinkedIn Optimizer'],
    limitations: [],
    popular: false,
    cta: 'Upgrade to Career',
  }
];
