import { useEffect } from 'react';
import { Box, VStack, HStack, Text, Button, Heading } from '@chakra-ui/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { keyframes } from '@emotion/react';
import { useWizardStore } from '../../state/wizard';
import { SelectInput } from './SelectInput';
import { ToggleInput } from './ToggleInput';
import { NumberInput } from './NumberInput';
import { TextInput } from './TextInput';

const expandIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
    max-height: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    max-height: 1000px;
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px rgba(0, 212, 212, 0.3), 0 0 10px rgba(0, 212, 212, 0.1);
  }
  50% {
    box-shadow: 0 0 15px rgba(0, 212, 212, 0.5), 0 0 30px rgba(0, 212, 212, 0.2);
  }
`;

// Helper to get nested value
const getNestedValue = (obj, path) => {
  if (!path || !obj) return undefined;
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current === undefined || current === null) return undefined;
    current = current[part];
  }
  return current;
};

export const ActiveStep = () => {
  const currentStepId = useWizardStore((state) => state.currentStepId);
  const steps = useWizardStore((state) => state.steps);
  const wizardState = useWizardStore((state) => state.wizardState);
  const setValue = useWizardStore((state) => state.setValue);
  const next = useWizardStore((state) => state.next);

  const step = steps[currentStepId];
  if (!step || step.type === 'review') return null;

  const input = step.input || {};
  const stateKey = step.state_key;
  const currentValue = stateKey ? getNestedValue(wizardState, stateKey) : undefined;

  // Auto-skip single-option select steps
  useEffect(() => {
    if (input.type !== 'select') return;

    const options = input.options || [];
    const enabledOptions = options.filter(o => !o.disabled);

    if (enabledOptions.length === 1) {
      setValue(stateKey, enabledOptions[0].value);
      next();
    }
  }, [currentStepId]);

  const handleChange = (value) => {
    if (stateKey) {
      setValue(stateKey, value);
    }
  };

  const handleNext = async () => {
    // Auto-select default if nothing selected
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
        return <Text color="danger">Unknown input type: {input.type}</Text>;
    }
  };

  return (
    <Box
      position="relative"
      animation={`${expandIn} 0.4s ease-out`}
    >
      {/* Active node on circuit line */}
      <Box
        position="absolute"
        left="-32px"
        top="24px"
        width="10px"
        height="10px"
        borderRadius="full"
        bg="accent"
        border="2px solid"
        borderColor="bg"
        animation={`${pulseGlow} 2s ease-in-out infinite`}
        zIndex={1}
      />

      {/* Connector line */}
      <Box
        position="absolute"
        left="-26px"
        top="28px"
        width="20px"
        height="2px"
        bg="accent"
        boxShadow="0 0 10px rgba(0, 212, 212, 0.5)"
      />

      {/* Active panel */}
      <Box
        bg="surface"
        border="2px solid"
        borderColor="accent"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="0 0 30px rgba(0, 212, 212, 0.15), inset 0 0 30px rgba(0, 212, 212, 0.05)"
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, var(--accent), var(--secondary), var(--accent))',
        }}
      >
        {/* Header */}
        <Box px={6} py={4} borderBottom="1px solid" borderColor="border">
          <HStack justify="space-between" align="center">
            <VStack align="flex-start" gap={1}>
              <Text
                fontFamily="mono"
                fontSize="xs"
                color="accent"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Current Step
              </Text>
              <Heading
                size="md"
                fontFamily="mono"
                color="text"
              >
                {step.title}
              </Heading>
            </VStack>
            <Box color="accent">
              <ChevronDown size={20} />
            </Box>
          </HStack>

          {step.description && (
            <Text color="text.subtle" fontSize="sm" mt={3}>
              {step.description}
            </Text>
          )}
        </Box>

        {/* Input area */}
        <Box px={6} py={6}>
          {renderInput()}
        </Box>

        {/* Action */}
        <Box px={6} py={4} borderTop="1px solid" borderColor="border" bg="bg.alt">
          <HStack justify="flex-end">
            <Button
              onClick={handleNext}
              bg="accent"
              color="bg"
              fontFamily="mono"
              px={8}
              fontWeight="bold"
              _hover={{
                bg: 'accent.dim',
                boxShadow: 'var(--accent-glow)',
                transform: 'translateY(-1px)',
              }}
              _active={{
                transform: 'translateY(0)',
              }}
              transition="all 0.2s"
            >
              <Text mr={2}>CONFIRM</Text>
              <ArrowRight size={18} />
            </Button>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};
