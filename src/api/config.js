import yaml from 'js-yaml';

// In development, use relative URL so Vite proxy handles it
// In production, use env var or default to the full URL
const getApiBase = () => {
  if (import.meta.env.VITE_API_BASE) {
    return import.meta.env.VITE_API_BASE.replace(/\/$/, '');
  }
  // Use relative URL - works with Vite proxy in dev, and assumes
  // production deployment is on same origin or behind a reverse proxy
  return '/api';
};

/**
 * Fetch and parse YAML from an API endpoint
 */
const fetchYaml = async (endpoint) => {
  const url = `${getApiBase()}${endpoint}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  const text = await response.text();
  return yaml.load(text);
};

/**
 * Fetch plain text from an API endpoint
 */
const fetchText = async (endpoint) => {
  const url = `${getApiBase()}${endpoint}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
};

/**
 * Fetch a documentation file
 */
export const fetchDoc = async (path) => {
  const url = `${getApiBase()}/docs/${path}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return `*Documentation file not found: ${path}*`;
    }
    return response.text();
  } catch {
    return `*Documentation file not found: ${path}*`;
  }
};

/**
 * Load all configuration resources from the API
 */
export const loadConfigResources = async () => {
  const [flowData, outputTemplate, docsManifest] = await Promise.all([
    fetchYaml('/dialog-flow'),
    fetchText('/config-prepare'),
    fetchYaml('/docs-manifest'),
  ]);

  return {
    flowData,
    outputTemplate,
    docsManifest,
  };
};

export { getApiBase };
