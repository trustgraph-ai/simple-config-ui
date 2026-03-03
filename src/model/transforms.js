import jsonata from 'jsonata';
import { fetchDoc } from '../api/config';

// Store for loaded resources
let outputExpression = null;
let docsManifest = null;

/**
 * Initialize transforms with loaded resources
 */
export const initializeTransforms = (resources) => {
  outputExpression = jsonata(resources.outputTemplate);
  docsManifest = resources.docsManifest;
};

/**
 * Transform wizard state to configuration object for API (async due to JSONata)
 */
export const transformToConfig = async (state) => {
  if (!outputExpression) {
    throw new Error('Transforms not initialized');
  }
  return await outputExpression.evaluate(state);
};

/**
 * Evaluate a condition against state (async due to JSONata)
 */
const evaluateCondition = async (condition, state) => {
  if (!condition) return false;
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
 * Generate installation documentation based on wizard state
 */
export const generateInstallationDocs = async (state) => {
  if (!docsManifest) {
    throw new Error('Transforms not initialized');
  }

  const { documentation } = docsManifest;
  const { categories, instructions } = documentation;

  // Build category lookup
  const categoryMap = {};
  for (const cat of categories) {
    categoryMap[cat.id] = cat;
  }

  // Evaluate conditions and collect matching instructions
  const matching = [];

  for (const instruction of instructions) {
    let matches = false;

    if (instruction.always) {
      matches = true;
    } else if (instruction.when) {
      matches = await evaluateCondition(instruction.when, state);
    }

    if (matches) {
      const cat = categoryMap[instruction.category];
      matching.push({
        categoryPriority: cat?.priority || 99,
        categoryId: instruction.category,
        categoryTitle: cat?.title || instruction.category,
        instructionPriority: instruction.priority || 99,
        file: instruction.file,
        goal: instruction.goal || '',
      });
    }
  }

  // Sort by category priority, then instruction priority
  matching.sort((a, b) => {
    if (a.categoryPriority !== b.categoryPriority) {
      return a.categoryPriority - b.categoryPriority;
    }
    return a.instructionPriority - b.instructionPriority;
  });

  // Build markdown output
  const outputParts = ['# TrustGraph Installation Guide\n'];
  let currentCategory = null;

  for (const item of matching) {
    // Add category header if changed
    if (item.categoryId !== currentCategory) {
      currentCategory = item.categoryId;
      outputParts.push(`\n## ${item.categoryTitle}\n`);
    }

    // Fetch and append the markdown content
    const content = await fetchDoc(item.file);
    outputParts.push(content);
    if (!content.endsWith('\n')) {
      outputParts.push('\n');
    }
  }

  return outputParts.join('\n');
};
