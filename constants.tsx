
import React from 'react';
import { Users, Code, Zap, Globe } from 'lucide-react';
import { TeamMember, Feature, StudentProgress, WeeklyHighlight } from './types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Asadbek',
    role: 'Lead Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
    bio: "Texnologiyalar ishqibozi va Buddy jamoasining asoschisi. Junior dasturchilarga yo'l ko'rsatadi.",
    longBio: "Dasturlash olamida 5 yillik tajribaga ega mutaxassis. Ko'plab startaplarni noldan ko'targan va jamoalarni boshqargan. Buddy loyihasining g'oya muallifi.",
    fieldDescription: "Frontend va Backend integratsiyasi, zamonaviy JavaScript frameworklari va yuqori samarali arxitektura bo'yicha mutaxassis.",
    motivationQuote: "Kodni yozish oson, lekin uni san'at darajasiga ko'tarish uchun sabr va do'stona muhit kerak.",
    skills: ['React', 'Node.js', 'System Design', 'Cloud Architecture']
  },
  {
    id: '2',
    name: 'Madina',
    role: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300',
    bio: "Chiroyli va foydali interfeyslar yaratish ustasi. Dizayn yo'nalishidagi o'quvchilarga ustozlik qiladi.",
    longBio: "Dizayn shunchaki ranglar emas, bu foydalanuvchi bilan muloqot qilish san'atidir. 4 yildan beri global loyihalarda interfeyslar yaratadi.",
    fieldDescription: "Foydalanuvchi psixologiyasi, vizual iyerarxiya va emotsional dizayn yo'nalishlarida chuqur bilimga ega.",
    motivationQuote: "Yaxshi dizayn — ko'zga ko'rinmaydigan, lekin hissiyot bilan seziladigan dizayndir.",
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems']
  },
  {
    id: '3',
    name: 'Javohir',
    role: 'Backend Architect',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300',
    bio: "Murakkab tizimlar mutaxassisi. Ma'lumotlar bazasi va xavfsizlik bo'yicha kurator.",
    longBio: "Ma'lumotlar oqimini boshqarish va xavfsizlikni ta'minlash bo'yicha 6 yillik tajriba. Tizimlarning barqarorligi uning ustuvor vazifasi.",
    fieldDescription: "Microservices, SQL/NoSQL ma'lumotlar bazalari va yuqori yuklamali tizimlarni optimallashtirish bo'yicha ekspert.",
    motivationQuote: "Tizimingiz qanchalik murakkab bo'lmasin, uning poydevori doim oxiri oddiy va tushunarli bo'lishi lozim.",
    skills: ['Python', 'PostgreSQL', 'Docker', 'Kubernetes']
  }
];

export const FEATURES: Feature[] = [
  {
    title: 'Innovatsiya',
    description: 'Biz eng so’nggi texnologiyalardan foydalangan holda zamonaviy yechimlar yaratamiz.',
    icon: <Zap className="w-6 h-6 text-blue-400" />
  },
  {
    title: 'Jamoaviy Ish',
    description: 'Buddy komandasi har bir a’zosining hissasi biz uchun qadrlidir.',
    icon: <Users className="w-6 h-6 text-purple-400" />
  },
  {
    title: 'Tezkorlik',
    description: 'Biz sifatli natijani tez muddatlarda yetkazib berishga intilamiz.',
    icon: <Code className="w-6 h-6 text-green-400" />
  },
  {
    title: 'Global Qamrov',
    description: 'Loyihaalarimiz butun dunyo bo’ylab foydalanuvchilarga xizmat qiladi.',
    icon: <Globe className="w-6 h-6 text-pink-400" />
  }
];

export const INITIAL_PROGRESS_DATA: StudentProgress[] = [
  // Curator 1: Asadbek
  { id: '101', curatorId: '1', weekNumber: 1, studentName: 'Behruz Aliyev', weeklyGoal: "React Hooks mavzusini o'rganish", difficulty: 'useEffect ichida cheksiz loop', solution: 'Dependency array tushuntirildi', status: 'Hal qilindi', meetingDay: '2025-05-10T10:00', attended: true },
  { id: '102', curatorId: '1', weekNumber: 1, studentName: 'Sardor Rahimboev', weeklyGoal: 'Context API bilan global state', difficulty: 'Prop drilling', solution: 'useContext qo\'llanildi', status: 'Hal qilindi', meetingDay: '2025-05-10T11:30', attended: true },
  { id: '103', curatorId: '1', weekNumber: 1, studentName: 'Umid Abdullayev', weeklyGoal: 'Redux Toolkit', difficulty: 'Slices tushunchasi', solution: 'Counter misolida tushuntirildi', status: 'Bajarilmoqda', meetingDay: '2025-05-11T09:00', attended: true },
  { id: '104', curatorId: '1', weekNumber: 1, studentName: 'Nigora Karimova', weeklyGoal: 'TypeScript asoslari', difficulty: 'Interfaces vs Types', solution: 'Farqlari ko\'rsatildi', status: 'Kutilmoqda', meetingDay: '2025-05-11T14:00', attended: false },
  { id: '105', curatorId: '1', weekNumber: 1, studentName: 'Aziz Toshpo\'latov', weeklyGoal: 'Next.js Server Components', difficulty: 'Hydration error', solution: 'Client components ajratildi', status: 'Bajarmadi', meetingDay: '2025-05-12T10:00', attended: false },

  // Curator 2: Madina
  { id: '201', curatorId: '2', weekNumber: 1, studentName: 'Zilola Zokirova', weeklyGoal: "Figma Auto-layout", difficulty: 'Spacing buglari', solution: "Real loyihada ko'rsatildi", status: 'Hal qilindi', meetingDay: '2025-05-10T14:00', attended: true },
  { id: '202', curatorId: '2', weekNumber: 1, studentName: 'Malika Ahmedova', weeklyGoal: "Ranglar nazariyasi", difficulty: 'Contrast ratio past', solution: "Adobe Color bilan palitra tuzildi", status: 'Hal qilindi', meetingDay: '2025-05-10T15:30', attended: true },
  { id: '203', curatorId: '2', weekNumber: 1, studentName: 'Jasur Islomov', weeklyGoal: "Tipografika", difficulty: 'Readability muammosi', solution: "Shriftlar almashtirildi", status: 'Bajarilmoqda', meetingDay: '2025-05-11T16:00', attended: true },
  { id: '204', curatorId: '2', weekNumber: 1, studentName: 'Diyora Rustamova', weeklyGoal: "Design System", difficulty: 'Component variants', solution: "Naming standartlari berildi", status: 'Kutilmoqda', meetingDay: '2025-05-12T11:00', attended: false },
  { id: '205', curatorId: '2', weekNumber: 1, studentName: 'Bobur Mansurov', weeklyGoal: "User Personas", difficulty: 'Research yetishmasligi', solution: "Intervyu savollari tuzildi", status: 'Bajarmadi', meetingDay: '2025-05-12T15:00', attended: false },

  // Curator 3: Javohir
  { id: '301', curatorId: '3', weekNumber: 1, studentName: 'Jasur Ortiqov', weeklyGoal: 'Database schema design', difficulty: 'Normalization', solution: 'BNCF rules applied', status: 'Hal qilindi', meetingDay: '2025-05-10T16:00', attended: true },
  { id: '302', curatorId: '3', weekNumber: 1, studentName: 'Kamola Ergasheva', weeklyGoal: 'RESTful API', difficulty: 'Status codes', solution: 'HTTP standartlari o\'rgatildi', status: 'Hal qilindi', meetingDay: '2025-05-10T17:30', attended: true },
  { id: '303', curatorId: '3', weekNumber: 1, studentName: 'Rustam G\'aniyev', weeklyGoal: 'JWT Auth', difficulty: 'Token refresh', solution: 'Middleware orqali hal qilindi', status: 'Bajarilmoqda', meetingDay: '2025-05-11T10:00', attended: true },
  { id: '304', curatorId: '3', weekNumber: 1, studentName: 'Sevara Omonova', weeklyGoal: 'Dockerization', difficulty: 'Dockerfile layer optimization', solution: 'Multi-stage build ko\'rsatildi', status: 'Kutilmoqda', meetingDay: '2025-05-12T09:00', attended: false },
  { id: '305', curatorId: '3', weekNumber: 1, studentName: 'Farrux Xo\'jayev', weeklyGoal: 'Unit Testing', difficulty: 'Mocking async', solution: 'jest.fn() tushuntirildi', status: 'Bajarmadi', meetingDay: '2025-05-12T13:00', attended: false }
];

export const INITIAL_HIGHLIGHTS_DATA: WeeklyHighlight[] = [
  // Curator 1: Asadbek (Frontend & Team)
  { id: 'h1-1', curatorId: '1', weekNumber: 1, photoUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600', uploadedBy: 'Asadbek' },
  { id: 'h1-2', curatorId: '1', weekNumber: 1, photoUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600', uploadedBy: 'Asadbek' },
  { id: 'h1-3', curatorId: '1', weekNumber: 1, photoUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600', uploadedBy: 'Asadbek' },
  { id: 'h1-4', curatorId: '1', weekNumber: 1, photoUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600', uploadedBy: 'Asadbek' },
  { id: 'h1-5', curatorId: '1', weekNumber: 1, photoUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600', uploadedBy: 'Asadbek' },

  // Curator 2: Madina (UI/UX sessions)
  { id: 'h2-1', curatorId: '2', weekNumber: 1, photoUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600', uploadedBy: 'Madina' },
  { id: 'h2-2', curatorId: '2', weekNumber: 1, photoUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=600', uploadedBy: 'Madina' },
  { id: 'h2-3', curatorId: '2', weekNumber: 1, photoUrl: 'https://images.unsplash.com/photo-1576153192396-180ecef2a715?auto=format&fit=crop&q=80&w=600', uploadedBy: 'Madina' },
  { id: 'h2-4', curatorId: '2', weekNumber: 1, photoUrl: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=600', uploadedBy: 'Madina' },
  { id: 'h2-5', curatorId: '2', weekNumber: 1, photoUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600', uploadedBy: 'Madina' },

  // Curator 3: Javohir (Backend / System Logic)
  { id: 'h3-1', curatorId: '3', weekNumber: 1, photoUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600', uploadedBy: 'Javohir' },
  { id: 'h3-2', curatorId: '3', weekNumber: 1, photoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600', uploadedBy: 'Javohir' },
  { id: 'h3-3', curatorId: '3', weekNumber: 1, photoUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600', uploadedBy: 'Javohir' },
  { id: 'h3-4', curatorId: '3', weekNumber: 1, photoUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600', uploadedBy: 'Javohir' },
  { id: 'h3-5', curatorId: '3', weekNumber: 1, photoUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600', uploadedBy: 'Javohir' }
];
