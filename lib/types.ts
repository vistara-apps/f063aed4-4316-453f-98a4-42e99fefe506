// User types
export interface User {
  userId: string; // farcasterId
  username: string;
  preferences: UserPreferences;
  subscriptionStatus: 'free' | 'premium';
  createdAt: Date;
}

export interface UserPreferences {
  primaryGoal: 'weight_loss' | 'muscle_gain' | 'endurance' | 'general_fitness';
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
  preferredWorkoutTypes: WorkoutType[];
  notifications: boolean;
}

// Workout types
export interface Workout {
  workoutId: string;
  userId: string;
  workoutType: WorkoutType;
  date: Date;
  duration: number; // in minutes
  exercises: Exercise[];
  notes?: string;
  aiCoachFeedback?: string;
}

export type WorkoutType = 
  | 'running' 
  | 'cycling' 
  | 'strength_training' 
  | 'yoga' 
  | 'swimming' 
  | 'walking' 
  | 'hiit' 
  | 'stretching'
  | 'other';

export interface Exercise {
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number; // for time-based exercises
  distance?: number; // for cardio
  restTime?: number;
}

// Progress types
export interface ProgressEntry {
  progressEntryId: string;
  userId: string;
  date: Date;
  metricType: MetricType;
  value: number;
  unit: string;
}

export type MetricType = 
  | 'weight' 
  | 'body_fat' 
  | 'muscle_mass' 
  | 'steps' 
  | 'calories_burned' 
  | 'workout_frequency'
  | 'strength_pr'
  | 'endurance_time';

// Dashboard types
export interface DashboardStats {
  totalWorkouts: number;
  currentStreak: number;
  weeklyGoalProgress: number;
  favoriteWorkoutType: WorkoutType;
  totalMinutesThisWeek: number;
  caloriesBurnedThisWeek: number;
}

export interface ChartData {
  date: string;
  value: number;
  label?: string;
}

// AI Chat types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  workoutContext?: Workout;
}

export interface AICoachResponse {
  message: string;
  suggestions?: string[];
  motivationalQuote?: string;
  nextWorkoutRecommendation?: {
    type: WorkoutType;
    duration: number;
    difficulty: 'easy' | 'moderate' | 'hard';
  };
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Component prop types
export interface ActivityCardProps {
  workout: Workout;
  variant?: 'compact' | 'detailed';
  onEdit?: (workout: Workout) => void;
  onDelete?: (workoutId: string) => void;
}

export interface ProgressChartProps {
  data: ChartData[];
  variant?: 'line' | 'bar' | 'summary';
  title: string;
  color?: string;
  height?: number;
}

export interface AgentChatProps {
  variant?: 'compact' | 'interactive';
  onSendMessage?: (message: string) => void;
  messages?: ChatMessage[];
  isLoading?: boolean;
}

// Form types
export interface WorkoutLogForm {
  workoutType: WorkoutType;
  duration: number;
  exercises: Exercise[];
  notes?: string;
  date?: Date;
}

export interface QuickLogForm {
  workoutType: WorkoutType;
  duration: number;
  intensity: 'low' | 'moderate' | 'high';
}

// MiniKit context types
export interface MiniKitUser {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl?: string;
}

export interface MiniKitContext {
  user?: MiniKitUser;
  client: {
    name: string;
    version: string;
  };
}
