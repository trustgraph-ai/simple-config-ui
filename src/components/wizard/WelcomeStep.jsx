import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { Terminal } from 'lucide-react';
import { useWizardStore } from '../../state/wizard';

export const WelcomeStep = () => {
  const start = useWizardStore((state) => state.start);

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="bg"
      position="relative"
    >
      <VStack
        gap={8}
        p={12}
        bg="surface"
        borderRadius="lg"
        border="1px solid"
        borderColor="border"
        maxW="xl"
        textAlign="center"
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          inset: '-2px',
          borderRadius: 'lg',
          padding: '2px',
          background: 'linear-gradient(135deg, var(--accent) 0%, var(--secondary) 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 0.5,
        }}
      >
        <Box
          color="accent"
          className="pulse-glow"
          p={4}
          borderRadius="full"
          bg="bg.alt"
        >
          <Terminal size={64} strokeWidth={1.5} />
        </Box>

        <VStack gap={4}>
          <Heading
            size="2xl"
            fontFamily="mono"
            className="neon-accent"
            letterSpacing="tight"
          >
            TrustGraph
          </Heading>
          <Text
            fontSize="lg"
            color="text.muted"
            fontFamily="mono"
            textTransform="uppercase"
            letterSpacing="widest"
          >
            Configuration Terminal
          </Text>
        </VStack>

        <Text color="text.subtle" maxW="md" lineHeight="tall">
          Initialize your TrustGraph deployment sequence.
          This terminal will guide you through platform selection,
          model configuration, and storage optimization.
        </Text>

        <Button
          size="lg"
          px={12}
          py={6}
          bg="transparent"
          color="accent"
          border="2px solid"
          borderColor="accent"
          fontFamily="mono"
          textTransform="uppercase"
          letterSpacing="wider"
          _hover={{
            bg: 'accent',
            color: 'bg',
            boxShadow: 'var(--accent-glow)',
            transform: 'translateY(-2px)',
          }}
          _active={{
            transform: 'translateY(0)',
          }}
          transition="all 0.2s"
          onClick={start}
        >
          Initialize &gt;_
        </Button>

        <Text fontSize="xs" color="text.subtle" fontFamily="mono">
          Press ENTER or click to begin
        </Text>
      </VStack>
    </Box>
  );
};
