
import React from 'react';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  longBio: string;
  fieldDescription: string;
  motivationQuote: string;
  skills: string[];
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface StudentProgress {
  id: string;
  curatorId: string;
  weekNumber: number;
  studentName: string;
  weeklyGoal: string;
  difficulty: string;
  solution: string;
  status: 'Bajarilmoqda' | 'Hal qilindi' | 'Kutilmoqda' | 'Bajarmadi';
  meetingDay: string;
  attended?: boolean;
}

export interface WeeklyHighlight {
  id: string;
  curatorId: string;
  weekNumber: number;
  photoUrl: string;
  uploadedBy: string;
}
