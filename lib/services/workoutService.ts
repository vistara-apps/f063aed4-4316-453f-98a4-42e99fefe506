import { Workout } from '@/lib/types';
import { saveWorkout } from './dataService';

// Re-export for convenience
export { saveWorkout } from './dataService';

// Additional workout-specific functions can be added here
export async function validateWorkout(workout: Omit<Workout, 'workoutId'>): Promise<boolean> {
  // Basic validation
  if (!workout.userId || !workout.workoutType || !workout.date || workout.duration <= 0) {
    return false;
  }

  // Validate workout type
  const validTypes = [
    'running', 'cycling', 'strength_training', 'yoga',
    'swimming', 'walking', 'hiit', 'stretching'
  ];

  if (!validTypes.includes(workout.workoutType)) {
    return false;
  }

  return true;
}

export async function createWorkoutFromQuickLog(
  userId: string,
  workoutType: string,
  duration: number,
  intensity: 'low' | 'moderate' | 'high' = 'moderate'
): Promise<Workout> {
  const workout: Omit<Workout, 'workoutId'> = {
    userId,
    workoutType: workoutType as any,
    date: new Date(),
    duration,
    exercises: [],
    notes: `Quick log - ${intensity} intensity`,
  };

  return await saveWorkout(workout);
}

