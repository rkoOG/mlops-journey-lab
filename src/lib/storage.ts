// Local Storage utilities for data persistence

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  timestamp: number;
}

export interface SimulationResult {
  id: string;
  accuracy: number;
  loss: number;
  trainingTime: string;
  modelVersion: string;
  scenario: string;
  timestamp: number;
}

export interface TrailProgress {
  trailId: string;
  completedModules: string[];
  progress: number;
  lastAccessed: number;
}

// Quiz Storage
export const saveQuizResult = (result: QuizResult): void => {
  const results = getQuizResults();
  results.push(result);
  localStorage.setItem('quizResults', JSON.stringify(results));
};

export const getQuizResults = (): QuizResult[] => {
  const data = localStorage.getItem('quizResults');
  return data ? JSON.parse(data) : [];
};

export const getBestQuizScore = (): number => {
  const results = getQuizResults();
  if (results.length === 0) return 0;
  return Math.max(...results.map(r => r.percentage));
};

// Simulation Storage
export const saveSimulationResult = (result: SimulationResult): void => {
  const simulations = getSimulationResults();
  simulations.push(result);
  // Keep only last 50 simulations
  const limited = simulations.slice(-50);
  localStorage.setItem('simulations', JSON.stringify(limited));
};

export const getSimulationResults = (): SimulationResult[] => {
  const data = localStorage.getItem('simulations');
  return data ? JSON.parse(data) : [];
};

export const getSimulationStats = () => {
  const simulations = getSimulationResults();
  if (simulations.length === 0) {
    return {
      totalRuns: 0,
      avgAccuracy: 0,
      bestAccuracy: 0,
      recentAccuracies: [],
    };
  }

  const accuracies = simulations.map(s => s.accuracy);
  return {
    totalRuns: simulations.length,
    avgAccuracy: accuracies.reduce((a, b) => a + b, 0) / accuracies.length,
    bestAccuracy: Math.max(...accuracies),
    recentAccuracies: simulations.slice(-7).map(s => ({
      accuracy: s.accuracy,
      timestamp: s.timestamp,
    })),
  };
};

// Academy Progress Storage
export const saveTrailProgress = (progress: TrailProgress): void => {
  const allProgress = getTrailProgress();
  const index = allProgress.findIndex(p => p.trailId === progress.trailId);
  
  if (index >= 0) {
    allProgress[index] = progress;
  } else {
    allProgress.push(progress);
  }
  
  localStorage.setItem('academyProgress', JSON.stringify(allProgress));
};

export const getTrailProgress = (): TrailProgress[] => {
  const data = localStorage.getItem('academyProgress');
  return data ? JSON.parse(data) : [];
};

export const getSpecificTrailProgress = (trailId: string): TrailProgress | null => {
  const allProgress = getTrailProgress();
  return allProgress.find(p => p.trailId === trailId) || null;
};

export const markModuleComplete = (trailId: string, moduleId: string, totalModules: number): void => {
  const progress = getSpecificTrailProgress(trailId) || {
    trailId,
    completedModules: [],
    progress: 0,
    lastAccessed: Date.now(),
  };

  if (!progress.completedModules.includes(moduleId)) {
    progress.completedModules.push(moduleId);
  }
  
  progress.progress = Math.round((progress.completedModules.length / totalModules) * 100);
  progress.lastAccessed = Date.now();
  
  saveTrailProgress(progress);
};

// Clear all data
export const clearAllProgress = (): void => {
  localStorage.removeItem('quizResults');
  localStorage.removeItem('simulations');
  localStorage.removeItem('academyProgress');
};
