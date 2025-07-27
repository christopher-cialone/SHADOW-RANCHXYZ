import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CypherpunkModule {
  id: number;
  title: string;
  isCompleted: boolean;
  isUnlocked: boolean;
}

interface CypherpunkProgressState {
  modules: CypherpunkModule[];
  currentModule: number;
  trackProgress: number; // 0-100 percentage
  completeModule: (moduleId: number) => void;
  getCurrentModule: () => number;
  getTrackProgress: () => number;
  resetProgress: () => void;
}

const initialModules: CypherpunkModule[] = [
  {
    id: 1,
    title: "The Genesis of a Movement",
    isCompleted: false,
    isUnlocked: true,
  },
  {
    id: 2,
    title: "The Pillars of a Free Internet",
    isCompleted: false,
    isUnlocked: false,
  },
  {
    id: 3,
    title: "From Mailing List to Mainnet",
    isCompleted: false,
    isUnlocked: false,
  },
  {
    id: 4,
    title: "The Fight for the Future",
    isCompleted: false,
    isUnlocked: false,
  },
  {
    id: 5,
    title: "Cryptographic Foundations",
    isCompleted: false,
    isUnlocked: false,
  },
  {
    id: 6,
    title: "Building the Decentralized Web",
    isCompleted: false,
    isUnlocked: false,
  },
];

export const useCypherpunkProgress = create<CypherpunkProgressState>()(
  persist(
    (set, get) => ({
      modules: initialModules,
      currentModule: 1,
      trackProgress: 0,

      completeModule: (moduleId: number) => {
        set((state) => {
          const updatedModules = state.modules.map((module) => {
            if (module.id === moduleId) {
              return { ...module, isCompleted: true };
            }
            // Unlock next module
            if (module.id === moduleId + 1) {
              return { ...module, isUnlocked: true };
            }
            return module;
          });

          const completedCount = updatedModules.filter(m => m.isCompleted).length;
          // Modules 1-4 represent the complete Cypherpunk Legacy track (67%)
          const progressPercentage = completedCount >= 4 ? 67 : Math.round((completedCount / 4) * 67);
          
          const nextModule = updatedModules.find(m => !m.isCompleted && m.isUnlocked)?.id || moduleId;

          return {
            modules: updatedModules,
            currentModule: nextModule,
            trackProgress: progressPercentage,
          };
        });
      },

      getCurrentModule: () => {
        const state = get();
        return state.currentModule;
      },

      getTrackProgress: () => {
        const state = get();
        return state.trackProgress;
      },

      resetProgress: () => {
        set({
          modules: initialModules,
          currentModule: 1,
          trackProgress: 0,
        });
      },
    }),
    {
      name: 'cypherpunk-progress-storage',
    }
  )
);