import { useEffect, useRef } from 'react';
import { Box, VStack, HStack, Text, Button } from '@chakra-ui/react';
import { ArrowRight, Terminal } from 'lucide-react';
import { useWizardStore } from '../../state/wizard';
import { CompletedStep } from './CompletedStep';
import { ActiveStep } from './ActiveStep';

export const StackedWizard = () => {
  const currentStepId = useWizardStore((state) => state.currentStepId);
  const steps = useWizardStore((state) => state.steps);
  const history = useWizardStore((state) => state.history);
  const setPhase = useWizardStore((state) => state.setPhase);
  const goToStep = useWizardStore((state) => state.goToStep);

  const activeRef = useRef(null);
  const step = steps[currentStepId];
  const isReviewStep = step?.type === 'review';

  // Transition to review phase when we hit a review step
  useEffect(() => {
    if (isReviewStep) {
      setPhase('review');
    }
  }, [isReviewStep, setPhase]);

  // Scroll to active step when it changes
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStepId]);

  if (isReviewStep) {
    return null;
  }

  // Build the list of completed steps from history
  const completedSteps = history.map((h, index) => {
    const historyStep = steps[h.stepId];
    const stateKey = historyStep?.state_key;

    // Get the value that was set at this step
    // We need to look at the NEXT history item's state, or current state for the last one
    const nextState = history[index + 1]?.state || useWizardStore.getState().wizardState;
    const value = stateKey ? getNestedValue(nextState, stateKey) : undefined;

    return {
      stepId: h.stepId,
      step: historyStep,
      value,
      index,
    };
  });

  const handleEditStep = (stepId) => {
    goToStep(stepId);
  };

  return (
    <Box minH="100vh" bg="bg" py={8} px={4}>
      <Box maxW="2xl" mx="auto">
        {/* Header */}
        <HStack gap={3} mb={8} justify="center">
          <Terminal size={20} color="var(--accent)" />
          <Text
            fontFamily="mono"
            fontSize="sm"
            color="text.subtle"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            Configuration Sequence
          </Text>
        </HStack>

        {/* Stacked steps container */}
        <Box position="relative" pl={8}>
          {/* Circuit trace line */}
          <Box
            position="absolute"
            left="12px"
            top="0"
            bottom="0"
            width="2px"
            bg="border"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-3px',
              width: '8px',
              height: '8px',
              borderRadius: 'full',
              bg: 'accent',
              boxShadow: 'var(--accent-glow)',
            }}
          />

          <VStack gap={0} align="stretch">
            {/* Completed steps */}
            {completedSteps.map(({ stepId, step, value, index }) => (
              <CompletedStep
                key={`${stepId}-${index}`}
                step={step}
                value={value}
                onEdit={() => handleEditStep(stepId)}
                isLast={false}
              />
            ))}

            {/* Active step */}
            <Box ref={activeRef}>
              <ActiveStep />
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

// Helper to get nested value from state
function getNestedValue(obj, path) {
  if (!path) return undefined;
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current === undefined || current === null) return undefined;
    current = current[part];
  }
  return current;
}
