import jsonata from 'jsonata';

/**
 * Evaluate a JSONata condition against wizard state
 * @param {string} condition - JSONata expression
 * @param {object} state - Wizard state object
 * @returns {Promise<boolean>} - Result of evaluation
 */
export const evaluateCondition = async (condition, state) => {
  if (!condition) return true;

  try {
    const expression = jsonata(condition);
    const result = await expression.evaluate(state);
    return Boolean(result);
  } catch (error) {
    console.warn('Condition evaluation error:', condition, error);
    return false;
  }
};

/**
 * Find the next step based on transitions and current state
 * @param {object} step - Current step definition
 * @param {object} state - Wizard state object
 * @returns {Promise<string|null>} - Next step ID or null if terminal
 */
export const findNextStep = async (step, state) => {
  const transitions = step.transitions || [];

  for (const transition of transitions) {
    const conditionResult = transition.when
      ? await evaluateCondition(transition.when, state)
      : true;

    if (conditionResult) {
      return transition.next || null;
    }
  }

  return null;
};
