import { Box, Text, Input, HStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export const NumberInput = ({ value, defaultValue, min, max, step = 1, onChange }) => {
  const effectiveValue = value ?? defaultValue ?? min ?? 0;
  const [localValue, setLocalValue] = useState(String(effectiveValue));

  useEffect(() => {
    setLocalValue(String(value ?? defaultValue ?? min ?? 0));
  }, [value, defaultValue, min]);

  const handleChange = (e) => {
    const val = e.target.value;
    setLocalValue(val);

    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  const handleBlur = () => {
    let num = parseInt(localValue, 10);
    if (isNaN(num)) {
      num = defaultValue ?? min ?? 0;
    }
    if (min !== undefined && num < min) num = min;
    if (max !== undefined && num > max) num = max;

    setLocalValue(String(num));
    onChange(num);
  };

  return (
    <Box>
      <HStack gap={4} align="center">
        <Text color="accent" fontFamily="mono" fontSize="lg">&gt;_</Text>
        <Input
          type="number"
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          step={step}
          size="lg"
          maxW="200px"
          bg="bg.alt"
          border="1px solid"
          borderColor="border"
          color="text"
          fontFamily="mono"
          fontSize="xl"
          _hover={{
            borderColor: 'border.bright',
          }}
          _focus={{
            borderColor: 'accent',
            boxShadow: '0 0 0 1px var(--accent)',
          }}
          _placeholder={{
            color: 'text.subtle',
          }}
        />
      </HStack>
      {(min !== undefined || max !== undefined) && (
        <Text fontSize="sm" color="text.subtle" mt={3} fontFamily="mono">
          {min !== undefined && max !== undefined
            ? `// RANGE: ${min} - ${max}`
            : min !== undefined
            ? `// MIN: ${min}`
            : `// MAX: ${max}`}
        </Text>
      )}
    </Box>
  );
};
