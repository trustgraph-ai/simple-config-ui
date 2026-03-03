import { Box, Button, Heading, Text, VStack, HStack } from '@chakra-ui/react';
import { Rocket, Edit, Database, Check } from 'lucide-react';
import { useWizardStore } from '../../state/wizard';

const flattenState = (obj, prefix = '') => {
  const result = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result.push(...flattenState(value, fullKey));
    } else {
      result.push({ key: fullKey, value });
    }
  }
  return result;
};

const formatValue = (value) => {
  if (typeof value === 'boolean') {
    return value ? 'YES' : 'NO';
  }
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  return String(value);
};

// Get the display label for a value from the step's options
const getValueLabel = (steps, stateKey, value) => {
  for (const step of Object.values(steps)) {
    if (step.state_key === stateKey && step.input?.options) {
      const option = step.input.options.find(o => o.value === value);
      if (option) return option.label;
    }
  }
  return formatValue(value);
};

const stateKeyToStepId = (steps, stateKey) => {
  for (const [stepId, step] of Object.entries(steps)) {
    if (step.state_key === stateKey) {
      return stepId;
    }
  }
  return null;
};

export const ReviewStep = () => {
  const wizardState = useWizardStore((state) => state.wizardState);
  const steps = useWizardStore((state) => state.steps);
  const history = useWizardStore((state) => state.history);
  const goToStep = useWizardStore((state) => state.goToStep);
  const setPhase = useWizardStore((state) => state.setPhase);

  const flatState = flattenState(wizardState);

  const handleEdit = (stateKey) => {
    const stepId = stateKeyToStepId(steps, stateKey);
    if (stepId) {
      goToStep(stepId);
    }
  };

  const handleGenerate = () => {
    setPhase('output');
  };

  return (
    <Box minH="100vh" bg="bg" py={8} px={4}>
      <Box maxW="2xl" mx="auto">
        {/* Header */}
        <HStack gap={3} mb={8} justify="center">
          <Database size={20} color="var(--success)" />
          <Text
            fontFamily="mono"
            fontSize="sm"
            color="text.subtle"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            Configuration Complete
          </Text>
        </HStack>

        {/* Stacked review with circuit line */}
        <Box position="relative" pl={8}>
          {/* Circuit trace line */}
          <Box
            position="absolute"
            left="12px"
            top="0"
            bottom="80px"
            width="2px"
            bg="success"
            boxShadow="0 0 10px rgba(0, 196, 106, 0.3)"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-3px',
              width: '8px',
              height: '8px',
              borderRadius: 'full',
              bg: 'success',
              boxShadow: 'var(--success-glow)',
            }}
          />

          <VStack gap={2} align="stretch" mb={6}>
            {flatState.map(({ key, value }, index) => (
              <Box
                key={key}
                position="relative"
              >
                {/* Node on circuit */}
                <Box
                  position="absolute"
                  left="-32px"
                  top="50%"
                  transform="translateY(-50%)"
                  width="8px"
                  height="8px"
                  borderRadius="full"
                  bg="success"
                  border="2px solid"
                  borderColor="bg"
                  zIndex={1}
                />

                {/* Connector */}
                <Box
                  position="absolute"
                  left="-26px"
                  top="50%"
                  width="18px"
                  height="2px"
                  bg="border"
                />

                {/* Card */}
                <Box
                  bg="surface"
                  border="1px solid"
                  borderColor="border"
                  borderRadius="md"
                  px={4}
                  py={2}
                  cursor="pointer"
                  onClick={() => handleEdit(key)}
                  transition="all 0.2s"
                  _hover={{
                    borderColor: 'accent',
                    bg: 'surface.hover',
                    '& .edit-icon': { opacity: 1 },
                  }}
                >
                  <HStack justify="space-between" align="center">
                    <HStack gap={3}>
                      <Check size={12} color="var(--success)" />
                      <Text
                        fontFamily="mono"
                        fontSize="xs"
                        color="text.subtle"
                        textTransform="uppercase"
                      >
                        {key}
                      </Text>
                    </HStack>
                    <HStack gap={3}>
                      <Text
                        fontFamily="mono"
                        fontSize="sm"
                        color="accent"
                      >
                        {getValueLabel(steps, key, value)}
                      </Text>
                      <Box
                        className="edit-icon"
                        opacity={0}
                        transition="opacity 0.2s"
                        color="text.subtle"
                      >
                        <Edit size={12} />
                      </Box>
                    </HStack>
                  </HStack>
                </Box>
              </Box>
            ))}
          </VStack>

          {/* Deploy button - final node */}
          <Box position="relative">
            <Box
              position="absolute"
              left="-32px"
              top="50%"
              transform="translateY(-50%)"
              width="14px"
              height="14px"
              borderRadius="full"
              bg="success"
              border="3px solid"
              borderColor="bg"
              boxShadow="var(--success-glow)"
              zIndex={1}
            />

            <Box
              position="absolute"
              left="-26px"
              top="50%"
              width="18px"
              height="2px"
              bg="success"
              boxShadow="0 0 10px rgba(0, 196, 106, 0.5)"
            />

            <Button
              onClick={handleGenerate}
              w="full"
              bg="success"
              color="bg"
              fontFamily="mono"
              size="lg"
              py={7}
              fontWeight="bold"
              _hover={{
                bg: 'success.dim',
                boxShadow: 'var(--success-glow)',
                transform: 'translateX(4px)',
              }}
              transition="all 0.2s"
            >
              <Rocket size={20} />
              <Text ml={3}>DEPLOY CONFIGURATION</Text>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
