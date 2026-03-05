import { Box, Text, HStack } from '@chakra-ui/react';
import { Check, X } from 'lucide-react';

export const ToggleInput = ({ value, defaultValue, onChange }) => {
  const effectiveValue = value ?? defaultValue ?? false;

  const options = [
    { value: true, label: 'YES', icon: Check },
    { value: false, label: 'NO', icon: X },
  ];

  return (
    <HStack gap={4}>
      {options.map((option) => {
        const isSelected = option.value === effectiveValue;
        const Icon = option.icon;
        const accentColor = option.value ? 'success' : 'danger';

        return (
          <Box
            key={String(option.value)}
            flex={1}
            p={4}
            borderWidth={1}
            borderRadius="md"
            borderColor={isSelected ? accentColor : 'border'}
            bg={isSelected ? `rgba(${option.value ? '0, 196, 106' : '255, 51, 102'}, 0.1)` : 'surface'}
            cursor="pointer"
            onClick={() => onChange(option.value)}
            _hover={{
              borderColor: isSelected ? accentColor : 'border.bright',
              bg: isSelected ? `rgba(${option.value ? '0, 196, 106' : '255, 51, 102'}, 0.15)` : 'surface.hover',
            }}
            transition="all 0.2s"
            textAlign="center"
            boxShadow={isSelected ? `0 0 20px rgba(${option.value ? '0, 196, 106' : '255, 51, 102'}, 0.3)` : 'none'}
          >
            <HStack justify="center" gap={3}>
              <Box color={isSelected ? accentColor : 'text.subtle'}>
                <Icon size={20} />
              </Box>
              <Text
                fontWeight="medium"
                fontFamily="mono"
                color={isSelected ? accentColor : 'text.muted'}
                letterSpacing="wider"
              >
                {option.label}
              </Text>
            </HStack>
          </Box>
        );
      })}
    </HStack>
  );
};
