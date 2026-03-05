import { Box, HStack, Text } from '@chakra-ui/react';
import { Check, ChevronRight } from 'lucide-react';
import { keyframes } from '@emotion/react';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const formatValue = (value) => {
  if (value === undefined || value === null) return '—';
  if (typeof value === 'boolean') return value ? 'YES' : 'NO';
  if (typeof value === 'number') return String(value);
  return String(value);
};

// Get the label from a step's input options
const getValueLabel = (step, value) => {
  if (!step?.input?.options) return formatValue(value);

  const option = step.input.options.find(o => o.value === value);
  if (option) {
    return option.label;
  }
  return formatValue(value);
};

export const CompletedStep = ({ step, value, onEdit }) => {
  if (!step) return null;

  const displayValue = getValueLabel(step, value);
  const title = step.title?.replace(/\?$/, '') || 'Step';

  return (
    <Box
      position="relative"
      mb={2}
      animation={`${slideIn} 0.3s ease-out`}
    >
      {/* Node on the circuit line */}
      <Box
        position="absolute"
        left="-32px"
        top="50%"
        transform="translateY(-50%)"
        width="10px"
        height="10px"
        borderRadius="full"
        bg="success"
        border="2px solid"
        borderColor="bg"
        boxShadow="0 0 10px rgba(0, 196, 106, 0.5)"
        zIndex={1}
      />

      {/* Connector line segment */}
      <Box
        position="absolute"
        left="-26px"
        top="50%"
        width="20px"
        height="2px"
        bg="border"
      />

      {/* Collapsed card */}
      <Box
        bg="surface"
        border="1px solid"
        borderColor="border"
        borderRadius="md"
        px={4}
        py={3}
        cursor="pointer"
        onClick={onEdit}
        transition="all 0.2s"
        _hover={{
          borderColor: 'accent',
          bg: 'surface.hover',
          '& .edit-hint': {
            opacity: 1,
          },
        }}
      >
        <HStack justify="space-between" align="center">
          <HStack gap={3} flex={1}>
            <Box color="success">
              <Check size={14} strokeWidth={3} />
            </Box>
            <Text
              fontFamily="mono"
              fontSize="sm"
              color="text.subtle"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              {title}
            </Text>
          </HStack>

          <HStack gap={3}>
            <Text
              fontFamily="mono"
              fontSize="sm"
              color="accent"
              fontWeight="medium"
            >
              {displayValue}
            </Text>
            <Box
              className="edit-hint"
              color="text.subtle"
              opacity={0}
              transition="opacity 0.2s"
            >
              <ChevronRight size={14} />
            </Box>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};
