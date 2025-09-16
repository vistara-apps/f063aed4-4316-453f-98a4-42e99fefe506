import { User, Workout, ProgressEntry, DashboardStats } from '@/lib/types';
import { saveToLocalStorage, loadFromLocalStorage, calculateStreak, formatDate } from '@/lib/utils';

// User management
export async function saveUser(user: User): Promise<void> {
  try {
    saveToLocalStorage('fitflow_user', user);
  } catch (error) {
    console.error('Error saving user:', error);
    throw new Error('Failed to save user data');
  }
}

export async function getUser(userId: string): Promise<User | null> {
  try {
    const user = loadFromLocalStorage<User>('fitflow_user', null);
    return user && user.userId === userId ? user : null;
  } catch (error) {
    console.error('Error loading user:', error);
    return null;
  }
}

// Workout management
export async function saveWorkout(workout: Omit<Workout, 'workoutId'>): Promise<Workout> {
  try {
    const workouts = loadFromLocalStorage<Workout[]>('fitflow_workouts', []);
    const newWorkout: Workout = {
      ...workout,
      workoutId: `workout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    workouts.push(newWorkout);
    saveToLocalStorage('fitflow_workouts', workouts);

    return newWorkout;
  } catch (error) {
    console.error('Error saving workout:', error);
    throw new Error('Failed to save workout');
  }
}

export async function getAllWorkouts(userId: string): Promise<Workout[]> {
  try {
    const workouts = loadFromLocalStorage<Workout[]>('fitflow_workouts', []);
    return workouts.filter(workout => workout.userId === userId);
  } catch (error) {
    console.error('Error loading workouts:', error);
    return [];
  }
}

export async function getRecentWorkouts(userId: string, limit: number = 10): Promise<Workout[]> {
  try {
    const workouts = await getAllWorkouts(userId);
    return workouts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  } catch (error) {
    console.error('Error loading recent workouts:', error);
    return [];
  }
}

export async function getWorkoutById(workoutId: string): Promise<Workout | null> {
  try {
    const workouts = loadFromLocalStorage<Workout[]>('fitflow_workouts', []);
    return workouts.find(workout => workout.workoutId === workoutId) || null;
  } catch (error) {
    console.error('Error loading workout:', error);
    return null;
  }
}

// Progress entries management
export async function saveProgressEntry(entry: Omit<ProgressEntry, 'progressEntryId'>): Promise<ProgressEntry> {
  try {
    const entries = loadFromLocalStorage<ProgressEntry[]>('fitflow_progress', []);
    const newEntry: ProgressEntry = {
      ...entry,
      progressEntryId: `progress_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    entries.push(newEntry);
    saveToLocalStorage('fitflow_progress', entries);

    return newEntry;
  } catch (error) {
    console.error('Error saving progress entry:', error);
    throw new Error('Failed to save progress entry');
  }
}

export async function getProgressEntries(userId: string): Promise<ProgressEntry[]> {
  try {
    const entries = loadFromLocalStorage<ProgressEntry[]>('fitflow_progress', []);
    return entries.filter(entry => entry.userId === userId);
  } catch (error) {
    console.error('Error loading progress entries:', error);
    return [];
  }
}

// Dashboard stats calculation
export async function getDashboardStats(userId: string): Promise<DashboardStats> {
  try {
    const workouts = await getAllWorkouts(userId);
    const progressEntries = await getProgressEntries(userId);

    // Calculate basic stats
    const totalWorkouts = workouts.length;
    const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);

    // Calculate current streak
    const currentStreak = calculateStreak(workouts);

    // Calculate weekly progress
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);

    const thisWeekWorkouts = workouts.filter(w => new Date(w.date) >= weekStart);
    const weeklyGoalProgress = Math.min((thisWeekWorkouts.length / 5) * 100, 100); // Assuming 5 workouts per week goal

    // Calculate calories burned (rough estimate)
    const caloriesBurnedThisWeek = thisWeekWorkouts.reduce((sum, w) => {
      // Simple calorie estimation based on workout type and duration
      const baseCaloriesPerMinute = {
        running: 8,
        cycling: 6,
        strength_training: 4,
        yoga: 3,
        swimming: 7,
        walking: 4,
        hiit: 10,
        stretching: 2,
      }[w.workoutType] || 5;

      return sum + (baseCaloriesPerMinute * w.duration);
    }, 0);

    // Find favorite workout type
    const workoutTypeCounts = workouts.reduce((acc, w) => {
      acc[w.workoutType] = (acc[w.workoutType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const favoriteWorkoutType = Object.entries(workoutTypeCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'running';

    return {
      totalWorkouts,
      currentStreak,
      weeklyGoalProgress,
      totalMinutesThisWeek: thisWeekWorkouts.reduce((sum, w) => sum + w.duration, 0),
      caloriesBurnedThisWeek,
      favoriteWorkoutType,
    };
  } catch (error) {
    console.error('Error calculating dashboard stats:', error);
    return {
      totalWorkouts: 0,
      currentStreak: 0,
      weeklyGoalProgress: 0,
      totalMinutesThisWeek: 0,
      caloriesBurnedThisWeek: 0,
      favoriteWorkoutType: 'running',
    };
  }
}

// Utility functions
export async function deleteWorkout(workoutId: string): Promise<void> {
  try {
    const workouts = loadFromLocalStorage<Workout[]>('fitflow_workouts', []);
    const filteredWorkouts = workouts.filter(w => w.workoutId !== workoutId);
    saveToLocalStorage('fitflow_workouts', filteredWorkouts);
  } catch (error) {
    console.error('Error deleting workout:', error);
    throw new Error('Failed to delete workout');
  }
}

export async function updateWorkout(workoutId: string, updates: Partial<Workout>): Promise<void> {
  try {
    const workouts = loadFromLocalStorage<Workout[]>('fitflow_workouts', []);
    const index = workouts.findIndex(w => w.workoutId === workoutId);

    if (index !== -1) {
      workouts[index] = { ...workouts[index], ...updates };
      saveToLocalStorage('fitflow_workouts', workouts);
    }
  } catch (error) {
    console.error('Error updating workout:', error);
    throw new Error('Failed to update workout');
  }
}

