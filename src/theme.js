import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

// =============================================================================
// COLOR PALETTES
// Define raw color values here. These are the "paint colors" available.
// =============================================================================
const palettes = {
  cyber: {
    cyan: '#00d4d4',
    cyanDim: '#00a8a8',
    magenta: '#d455d4',
    magentaDim: '#aa44aa',
    green: '#00c46a',
    greenDim: '#009e55',
    yellow: '#ffff00',
    red: '#ff3366',

    bg: '#0a0a0f',
    bgAlt: '#12121a',
    surface: '#1a1a24',
    surfaceHover: '#22222e',
    border: '#2a2a3a',
    borderBright: '#3a3a4a',

    textPrimary: '#ffffff',
    textSecondary: '#a0a0b0',
    textMuted: '#606070',
  },
};

// =============================================================================
// THEME CONFIG
// =============================================================================
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Keep raw palette available for reference
        palette: {
          cyber: {
            cyan: { value: palettes.cyber.cyan },
            magenta: { value: palettes.cyber.magenta },
            green: { value: palettes.cyber.green },
          },
        },
      },
      fonts: {
        heading: { value: '"JetBrains Mono", "Fira Code", monospace' },
        body: { value: '"Inter", system-ui, sans-serif' },
        mono: { value: '"JetBrains Mono", "Fira Code", monospace' },
      },
    },
    semanticTokens: {
      colors: {
        // =======================================================================
        // ACCENT - Primary interactive color
        // =======================================================================
        accent: { value: palettes.cyber.cyan },
        'accent.dim': { value: palettes.cyber.cyanDim },
        'accent.glow': { value: 'rgba(0, 212, 212, 0.4)' },
        'accent.subtle': { value: 'rgba(0, 212, 212, 0.1)' },

        // =======================================================================
        // SECONDARY - Secondary accent color
        // =======================================================================
        secondary: { value: palettes.cyber.magenta },
        'secondary.dim': { value: palettes.cyber.magentaDim },
        'secondary.glow': { value: 'rgba(212, 85, 212, 0.4)' },
        'secondary.subtle': { value: 'rgba(212, 85, 212, 0.1)' },

        // =======================================================================
        // SUCCESS - Positive/complete states
        // =======================================================================
        success: { value: palettes.cyber.green },
        'success.dim': { value: palettes.cyber.greenDim },
        'success.glow': { value: 'rgba(0, 196, 106, 0.4)' },
        'success.subtle': { value: 'rgba(0, 196, 106, 0.1)' },

        // =======================================================================
        // WARNING
        // =======================================================================
        warning: { value: palettes.cyber.yellow },

        // =======================================================================
        // DANGER - Errors, destructive actions
        // =======================================================================
        danger: { value: palettes.cyber.red },
        'danger.subtle': { value: 'rgba(255, 51, 102, 0.1)' },

        // =======================================================================
        // BACKGROUNDS
        // =======================================================================
        bg: { value: palettes.cyber.bg },
        'bg.alt': { value: palettes.cyber.bgAlt },

        // =======================================================================
        // SURFACES - Cards, panels, elevated elements
        // =======================================================================
        surface: { value: palettes.cyber.surface },
        'surface.hover': { value: palettes.cyber.surfaceHover },

        // =======================================================================
        // BORDERS
        // =======================================================================
        border: { value: palettes.cyber.border },
        'border.bright': { value: palettes.cyber.borderBright },

        // =======================================================================
        // TEXT
        // =======================================================================
        text: { value: palettes.cyber.textPrimary },
        'text.muted': { value: palettes.cyber.textSecondary },
        'text.subtle': { value: palettes.cyber.textMuted },
      },
    },
  },
  globalCss: {
    'html, body': {
      bg: 'bg',
      color: 'text',
      fontFamily: 'body',
    },
    '::selection': {
      bg: 'accent.glow',
      color: 'bg',
    },
  },
});

export const system = createSystem(defaultConfig, config);

// =============================================================================
// CSS VARIABLE EXPORT
// For use in animations, pseudo-elements, and complex effects
// =============================================================================
export const cssVars = {
  // Accent
  '--accent': palettes.cyber.cyan,
  '--accent-dim': palettes.cyber.cyanDim,
  '--accent-glow': `0 0 20px rgba(0, 212, 212, 0.4), 0 0 40px rgba(0, 212, 212, 0.2)`,

  // Secondary
  '--secondary': palettes.cyber.magenta,
  '--secondary-dim': palettes.cyber.magentaDim,
  '--secondary-glow': `0 0 20px rgba(212, 85, 212, 0.4), 0 0 40px rgba(212, 85, 212, 0.2)`,

  // Success
  '--success': palettes.cyber.green,
  '--success-dim': palettes.cyber.greenDim,
  '--success-glow': `0 0 20px rgba(0, 196, 106, 0.4), 0 0 40px rgba(0, 196, 106, 0.2)`,

  // Danger
  '--danger': palettes.cyber.red,

  // Surfaces
  '--bg': palettes.cyber.bg,
  '--bg-alt': palettes.cyber.bgAlt,
  '--surface': palettes.cyber.surface,
  '--border': palettes.cyber.border,
};
