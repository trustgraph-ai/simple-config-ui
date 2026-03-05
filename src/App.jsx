import { useEffect } from 'react';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';
import { useWizardStore } from './state/wizard';
import { loadConfigResources } from './api/config';
import { initializeTransforms } from './model/transforms';
import { WelcomeStep } from './components/wizard/WelcomeStep';
import { StackedWizard } from './components/wizard/StackedWizard';
import { ReviewStep } from './components/wizard/ReviewStep';
import { ConfigOutput } from './components/output/ConfigOutput';

function App() {
  const phase = useWizardStore((state) => state.phase);
  const loading = useWizardStore((state) => state.loading);
  const loadError = useWizardStore((state) => state.loadError);
  const initialize = useWizardStore((state) => state.initialize);
  const setLoadError = useWizardStore((state) => state.setLoadError);

  useEffect(() => {
    const load = async () => {
      try {
        const resources = await loadConfigResources();
        initializeTransforms(resources);
        initialize(resources.flowData);
      } catch (error) {
        console.error('Failed to load resources:', error);
        setLoadError(error.message);
      }
    };

    load();
  }, [initialize, setLoadError]);

  // Loading state
  if (loading || phase === 'loading') {
    return (
      <Box minH="100vh" bg="bg" display="flex" alignItems="center" justifyContent="center">
        <VStack gap={4}>
          {loadError ? (
            <>
              <Text color="danger" fontSize="lg" fontFamily="mono">LOAD ERROR</Text>
              <Text color="text.muted">{loadError}</Text>
            </>
          ) : (
            <>
              <Spinner size="xl" color="accent" />
              <Text color="text.muted" fontFamily="mono">LOADING CONFIGURATION...</Text>
            </>
          )}
        </VStack>
      </Box>
    );
  }

  return (
    <>
      {phase === 'welcome' && <WelcomeStep />}
      {phase === 'wizard' && <StackedWizard />}
      {phase === 'review' && <ReviewStep />}
      {phase === 'output' && <ConfigOutput />}
    </>
  );
}

export default App;
