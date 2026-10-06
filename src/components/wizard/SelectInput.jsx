import { Box, Text, VStack, HStack, Badge, SimpleGrid } from '@chakra-ui/react';
import { ChevronRight } from 'lucide-react';

export const SelectInput = ({ options, value, defaultValue, onChange }) => {
  const effectiveValue = value ?? defaultValue
    ?? options.find(o => o.recommended)?.value
    ?? options[0]?.value;

  const isCompact = options.length > 4;
  const columns = isCompact ? { base: 1, md: 2, xl: 3 } : 1;

  return (
    <SimpleGrid columns={columns} gap={2}>
      {options.map((option) => {
        const isSelected = option.value === effectiveValue;

        return (
          <Box
            key={option.value}
            px={3}
            py={isCompact ? 2 : 4}
            borderWidth={1}
            borderRadius="md"
            borderColor={isSelected ? 'accent' : 'border'}
            bg={isSelected ? 'accent.subtle' : 'surface'}
            cursor={option.disabled ? 'not-allowed' : 'pointer'}
            opacity={option.disabled ? 0.4 : 1}
            onClick={() => !option.disabled && onChange(option.value)}
            position="relative"
            transition="all 0.2s"
            _hover={!option.disabled ? {
              borderColor: isSelected ? 'accent' : 'border.bright',
              bg: isSelected ? 'rgba(0, 212, 212, 0.08)' : 'surface.hover',
              transform: 'translateX(4px)',
            } : {}}
            _before={isSelected ? {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '3px',
              height: '60%',
              bg: 'accent',
              borderRadius: 'full',
              boxShadow: 'var(--accent-glow)',
            } : {}}
          >
            <HStack justify="space-between" align="flex-start">
              <VStack align="flex-start" gap={1}>
                <HStack gap={2}>
                  <Text
                    fontWeight="medium"
                    fontFamily="mono"
                    fontSize={isCompact ? 'sm' : 'md'}
                    color={isSelected ? 'accent' : 'text'}
                  >
                    {option.label}
                  </Text>
                  {option.recommended && (
                    <Badge
                      bg="success"
                      color="bg"
                      fontFamily="mono"
                      fontSize="xs"
                      px={2}
                      borderRadius="sm"
                    >
                      REC
                    </Badge>
                  )}
                  {option.badge && (
                    <Badge
                      bg={
                        option.badge === 'stable' ? 'accent' :
                        option.badge === 'beta' ? 'warning' :
                        option.badge === 'pre-release' ? 'secondary' : 'border'
                      }
                      color="bg"
                      fontFamily="mono"
                      fontSize="xs"
                      px={2}
                      borderRadius="sm"
                    >
                      {option.badge.toUpperCase()}
                    </Badge>
                  )}
                </HStack>
                {option.description && (
                  <Text fontSize="xs" color="text.subtle" lineHeight="short">
                    {option.description}
                  </Text>
                )}
                {option.disabled && option.disabled_reason && (
                  <Text fontSize="sm" color="danger">
                    {option.disabled_reason}
                  </Text>
                )}
              </VStack>

              <Box
                color={isSelected ? 'accent' : 'text.subtle'}
                transition="all 0.2s"
              >
                <ChevronRight size={isCompact ? 16 : 20} />
              </Box>
            </HStack>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};
