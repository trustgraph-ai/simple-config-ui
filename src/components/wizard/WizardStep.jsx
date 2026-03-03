import { useEffect } from 'react';
import { Box, Button, Heading, Text, VStack, HStack } from '@chakra-ui/react';
import { ArrowLeft, ArrowRight, Terminal } from 'lucide-react';
import { useWizardStore } from '../../state/wizard';
import { SelectInput } from './SelectInput';
import { ToggleInput } from './ToggleInput';
import { NumberInput } from './NumberInput';
import { TextInput } from './TextInput';

// Cyberpunk progress bar
const CyberProgress = ({ value, max }) => {
  const percent = (value / max) * 100;
  const segments = 20;
  const filledSegments = Math.round((value / max) * segments);

  return (
    <HStack gap={1} fontFamily="mono" fontSize="sm">
      <Text color="cyber.textMuted">[</Text>
      {Array.from({ length: segments }).map((_, i) => (
        <Box
          key={i}
          w="8px"
          h="16px"
          bg={i < filledSegments ? 'cyber.cyan' : 'cyber.border'}
          boxShadow={i < filledSegments ? '0 0 8px rgba(0, 212, 212, 0.5)' : 'none'}
          transition="all 0.2s"
        />
      ))}
      <Text color="cyber.textMuted">]</Text>
      <Text color="cyber.cyan" ml={2}>{Math.round(percent)}%</Text>
    </HStack>
  );
};

export const WizardStep = () => {
  const currentStepId = useWizardStore((state) => state.currentStepId);
  const steps = useWizardStore((state) => state.steps);
  const wizardState = useWizardStore((state) => state.wizardState);
  const setValue = useWizardStore((state) => state.setValue);
  const getValue = useWizardStore((state) => state.getValue);
  const next = useWizardStore((state) => state.next);
  const back = useWizardStore((state) => state.back);
  const canGoBack = useWizardStore((state) => state.canGoBack);
  const history = useWizardStore((state) => state.history);
  const setPhase = useWizardStore((state) => state.setPhase);

  const step = steps[currentStepId];
  const isReviewStep = step?.type === 'review';

  useEffect(() => {
    if (isReviewStep) {
      setPhase('review');
    }
  }, [isReviewStep, setPhase]);

  if (isReviewStep) {
    return null;
  }

  const input = step?.input || {};
  const stateKey = step?.state_key;
  const currentValue = stateKey ? getValue(stateKey) : undefined;

  const totalSteps = Object.keys(steps).length;
  const currentStepNum = history.length + 1;

  const handleChange = (value) => {
    if (stateKey) {
      setValue(stateKey, value);
    }
  };

  const handleNext = async () => {
    if (currentValue === undefined && stateKey) {
      if (input.type === 'select') {
        const options = input.options || [];
        const defaultOpt = options.find(o => o.value === input.default)
          || options.find(o => o.recommended)
          || options[0];
        if (defaultOpt) {
          setValue(stateKey, defaultOpt.value);
        }
      } else if (input.type === 'toggle') {
        setValue(stateKey, input.default ?? false);
      } else if (input.type === 'number') {
        setValue(stateKey, input.default ?? input.min ?? 0);
      } else if (input.type === 'text') {
        setValue(stateKey, input.default ?? '');
      }
    }
    await next();
  };

  const renderInput = () => {
    switch (input.type) {
      case 'select':
        return (
          <SelectInput
            options={input.options || []}
            value={currentValue}
            defaultValue={input.default}
            onChange={handleChange}
          />
        );
      case 'toggle':
        return (
          <ToggleInput
            value={currentValue}
            defaultValue={input.default}
            onChange={handleChange}
          />
        );
      case 'number':
        return (
          <NumberInput
            value={currentValue}
            defaultValue={input.default}
            min={input.min}
            max={input.max}
            step={input.step}
            onChange={handleChange}
          />
        );
      case 'text':
        return (
          <TextInput
            value={currentValue}
            defaultValue={input.default}
            placeholder={input.placeholder}
            onChange={handleChange}
          />
        );
      default:
        return <Text color="cyber.red">Unknown input type: {input.type}</Text>;
    }
  };

  return (
    <Box minH="100vh" bg="cyber.bg" py={8}>
      <VStack gap={6} maxW="2xl" mx="auto" px={4}>
        {/* Header */}
        <HStack w="full" justify="space-between" align="center">
          <HStack gap={2} color="cyber.textMuted" fontFamily="mono" fontSize="sm">
            <Terminal size={16} />
            <Text>STEP {currentStepNum}/{totalSteps}</Text>
          </HStack>
          <CyberProgress value={currentStepNum} max={totalSteps} />
        </HStack>

        {/* Step content */}
        <Box
          w="full"
          bg="cyber.surface"
          borderRadius="lg"
          border="1px solid"
          borderColor="cyber.border"
          p={8}
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, var(--cyber-cyan), var(--cyber-magenta))',
            borderRadius: 'lg lg 0 0',
          }}
        >
          <VStack gap={6} align="stretch">
            <Heading
              size="lg"
              fontFamily="mono"
              color="cyber.textPrimary"
              letterSpacing="tight"
            >
              {step?.title}
            </Heading>

            {step?.description && (
              <Text color="cyber.textMuted" fontSize="sm">
                {step.description}
              </Text>
            )}

            <Box pt={2}>
              {renderInput()}
            </Box>
          </VStack>
        </Box>

        {/* Navigation */}
        <HStack w="full" justify="space-between">
          <Button
            variant="ghost"
            onClick={back}
            disabled={!canGoBack()}
            color="cyber.textMuted"
            fontFamily="mono"
            _hover={{
              color: 'cyber.textPrimary',
              bg: 'cyber.surface',
            }}
            _disabled={{
              opacity: 0.3,
              cursor: 'not-allowed',
            }}
          >
            <ArrowLeft size={18} />
            <Text ml={2}>BACK</Text>
          </Button>

          <Button
            onClick={handleNext}
            bg="transparent"
            color="cyber.cyan"
            border="1px solid"
            borderColor="cyber.cyan"
            fontFamily="mono"
            px={8}
            _hover={{
              bg: 'cyber.cyan',
              color: 'cyber.bg',
              boxShadow: 'var(--glow-cyan)',
            }}
          >
            <Text mr={2}>NEXT</Text>
            <ArrowRight size={18} />
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
