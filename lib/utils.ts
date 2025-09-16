import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { WorkoutType, MetricType } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date utilities
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  }
}

// Workout utilities
export function getWorkoutEmoji(type: WorkoutType): string {
  const emojiMap: Record<WorkoutType, string> = {
    running: '🏃‍♂️',
    cycling: '🚴‍♂️',
    strength_training: '💪',
    yoga: '🧘‍♀️',
    swimming: '🏊‍♂️',
    walking: '🚶‍♂️',
    hiit: '🔥',
    stretching: '🤸‍♂️',
    other: '⚡',
  };
  return emojiMap[type] || '⚡';
}

export function getWorkoutColor(type: WorkoutType): string {
  const colorMap: Record<WorkoutType, string> = {
    running: 'bg-blue-500',
    cycling: 'bg-green-500',
    strength_training: 'bg-red-500',
    yoga: 'bg-purple-500',
    swimming: 'bg-cyan-500',
    walking: 'bg-gray-500',
    hiit: 'bg-orange-500',
    stretching: 'bg-pink-500',
    other: 'bg-indigo-500',
  };
  return colorMap[type] || 'bg-indigo-500';
}

export function formatWorkoutType(type: WorkoutType): string {
  return type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

// Progress utilities
export function calculateStreak(workouts: Date[]): number {
  if (workouts.length === 0) return 0;
  
  const sortedDates = workouts
    .map(date => new Date(date.getFullYear(), date.getMonth(), date.getDate()))
    .sort((a, b) => b.getTime() - a.getTime());
  
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  for (const workoutDate of sortedDates) {
    const diffInDays = Math.floor((currentDate.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === streak) {
      streak++;
    } else if (diffInDays === streak + 1) {
      streak++;
    } else {
      break;
    }
    
    currentDate = new Date(workoutDate);
  }
  
  return streak;
}

export function calculateWeeklyProgress(workouts: Date[], weeklyGoal: number): number {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const workoutsThisWeek = workouts.filter(date => date >= startOfWeek);
  return Math.min((workoutsThisWeek.length / weeklyGoal) * 100, 100);
}

// Calorie estimation (rough estimates)
export function estimateCaloriesBurned(type: WorkoutType, duration: number, weight: number = 70): number {
  const caloriesPerMinute: Record<WorkoutType, number> = {
    running: 12,
    cycling: 8,
    strength_training: 6,
    yoga: 3,
    swimming: 10,
    walking: 4,
    hiit: 15,
    stretching: 2,
    other: 5,
  };
  
  const baseCalories = caloriesPerMinute[type] || 5;
  const weightMultiplier = weight / 70; // Adjust for body weight
  
  return Math.round(baseCalories * duration * weightMultiplier);
}

// Validation utilities
export function validateWorkoutForm(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.workoutType) {
    errors.push('Workout type is required');
  }
  
  if (!data.duration || data.duration <= 0) {
    errors.push('Duration must be greater than 0');
  }
  
  if (data.duration > 480) { // 8 hours max
    errors.push('Duration cannot exceed 8 hours');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Local storage utilities
export function saveToLocalStorage(key: string, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return defaultValue;
  }
}

// Animation utilities
export function getStaggerDelay(index: number, baseDelay: number = 100): number {
  return index * baseDelay;
}

// Number formatting
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}
