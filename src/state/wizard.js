import { create } from 'zustand';
import { findNextStep } from '../model/conditions';

// Helper to set nested value in object
const setNested = (obj, path, value) => {
  const result = { ...obj };
  const parts = path.split('.');
  let current = result;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    current[part] = current[part] ? { ...current[part] } : {};
    current = current[part];
  }

  current[parts[parts.length - 1]] = value;
  return result;
};

// Helper to get nested value from object
const getNested = (obj, path) => {
  const parts = path.split('.');
  let current = obj;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }

  return current;
};

export const useWizardStore = create((set, get) => ({
  // Loading state
  loading: true,
  loadError: null,

  // Flow data (loaded from API)
  flow: null,
  steps: null,

  // Current state
  currentStepId: null,
  wizardState: {},
  history: [],

  // Phase: loading | welcome | wizard | review | output | docs
  phase: 'loading',

  // Initialize from API data
  initialize: (flowData) => {
    set({
      flow: flowData.flow,
      steps: flowData.steps,
      currentStepId: flowData.flow.start,
      loading: false,
      loadError: null,
      phase: 'welcome',
    });
  },

  // Set load error
  setLoadError: (error) => {
    set({
      loading: false,
      loadError: error,
      phase: 'loading',
    });
  },

  // Actions
  start: () => {
    const { flow } = get();
    set({
      phase: 'wizard',
      currentStepId: flow.start,
      wizardState: {},
      history: [],
    });
  },

  reset: () => {
    const { flow } = get();
    set({
      phase: 'welcome',
      currentStepId: flow.start,
      wizardState: {},
      history: [],
    });
  },

  setValue: (key, value) => {
    const { wizardState } = get();
    set({ wizardState: setNested(wizardState, key, value) });
  },

  getValue: (key) => {
    const { wizardState } = get();
    return getNested(wizardState, key);
  },

  next: async () => {
    const { currentStepId, steps, wizardState, history } = get();
    const currentStep = steps[currentStepId];

    // Find next step based on transitions (async due to JSONata)
    const nextStepId = await findNextStep(currentStep, wizardState);

    if (nextStepId) {
      // Save to history and advance
      set({
        history: [...history, { stepId: currentStepId, state: { ...wizardState } }],
        currentStepId: nextStepId,
      });
    } else {
      // No next step - go to review
      set({ phase: 'review' });
    }
  },

  back: () => {
    const { history } = get();

    if (history.length > 0) {
      const newHistory = [...history];
      const previous = newHistory.pop();
      set({
        history: newHistory,
        currentStepId: previous.stepId,
        wizardState: previous.state,
      });
    }
  },

  goToStep: (stepId) => {
    const { history } = get();

    // Find if this step is in our history
    const historyIndex = history.findIndex(h => h.stepId === stepId);

    if (historyIndex >= 0) {
      // Truncate history to this point and restore state from that point
      const newHistory = history.slice(0, historyIndex);
      const targetState = history[historyIndex].state;
      set({
        currentStepId: stepId,
        phase: 'wizard',
        history: newHistory,
        wizardState: { ...targetState },
      });
    } else {
      // Step not in history, just go to it
      set({ currentStepId: stepId, phase: 'wizard' });
    }
  },

  setPhase: (phase) => set({ phase }),

  // Computed helpers
  getCurrentStep: () => {
    const { steps, currentStepId } = get();
    return steps?.[currentStepId];
  },

  getProgress: () => {
    const { history, steps } = get();
    return {
      current: history.length + 1,
      total: steps ? Object.keys(steps).length : 0,
    };
  },

  canGoBack: () => {
    const { history } = get();
    return history.length > 0;
  },
}));
