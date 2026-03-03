import { Box, Text, Input, HStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export const TextInput = ({ value, defaultValue, placeholder, onChange }) => {
  const effectiveValue = value ?? defaultValue ?? '';
  const [localValue, setLocalValue] = useState(effectiveValue);

  useEffect(() => {
    setLocalValue(value ?? defaultValue ?? '');
  }, [value, defaultValue]);

  const handleChange = (e) => {
    const val = e.target.value;
    setLocalValue(val);
    onChange(val);
  };

  return (
    <Box>
      <HStack gap={4} align="center">
        <Text color="accent" fontFamily="mono" fontSize="lg">&gt;_</Text>
        <Input
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          size="lg"
          bg="bg.alt"
          border="1px solid"
          borderColor="border"
          color="text"
          fontFamily="mono"
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
    </Box>
  );
};
