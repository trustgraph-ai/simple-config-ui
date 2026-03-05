import { useState, useEffect } from 'react';
import { Box, Button, Heading, Text, VStack, HStack, Code, Spinner } from '@chakra-ui/react';
import { ArrowLeft, Download, RotateCcw, FileText, CheckCircle, AlertTriangle, Zap } from 'lucide-react';
import { useWizardStore } from '../../state/wizard';
import { generateInstallationDocs } from '../../model/transforms';

export const DocsOutput = () => {
  const wizardState = useWizardStore((state) => state.wizardState);
  const reset = useWizardStore((state) => state.reset);
  const setPhase = useWizardStore((state) => state.setPhase);

  const [docs, setDocs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generate = async () => {
      try {
        setLoading(true);
        const content = await generateInstallationDocs(wizardState);
        setDocs(content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    generate();
  }, [wizardState]);

  const handleDownload = () => {
    if (!docs) return;
    const blob = new Blob([docs], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'INSTALLATION.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleBack = () => {
    setPhase('output');
  };

  const handleStartOver = () => {
    reset();
  };

  return (
    <Box minH="100vh" bg="bg" py={8}>
      <VStack gap={6} maxW="3xl" mx="auto" px={4}>
        {/* Header */}
        <HStack w="full" justify="space-between" align="center">
          <HStack gap={2} color="text.subtle" fontFamily="mono" fontSize="sm">
            <FileText size={16} />
            <Text>INSTALLATION GUIDE</Text>
          </HStack>
          {docs && (
            <HStack gap={2} color="success" fontFamily="mono" fontSize="sm">
              <CheckCircle size={16} />
              <Text>GENERATED</Text>
            </HStack>
          )}
        </HStack>

        {/* Content */}
        <Box
          w="full"
          bg="surface"
          borderRadius="lg"
          border="1px solid"
          borderColor="border"
          overflow="hidden"
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, var(--secondary), var(--accent))',
          }}
        >
          <VStack gap={0} align="stretch">
            <Box px={6} py={4} borderBottom="1px solid" borderColor="border">
              <Heading size="lg" fontFamily="mono" color="text">
                Installation Guide
              </Heading>
              <Text color="text.subtle" fontSize="sm" mt={2}>
                Customized deployment instructions for your configuration
              </Text>
            </Box>

            {loading && (
              <HStack justify="center" py={12} gap={3}>
                <Spinner size="lg" color="accent" />
                <Text color="text.muted" fontFamily="mono">
                  GENERATING DOCUMENTATION...
                </Text>
              </HStack>
            )}

            {error && (
              <Box p={6}>
                <HStack
                  p={4}
                  bg="danger.subtle"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="danger"
                >
                  <AlertTriangle size={20} color="var(--danger)" />
                  <Text color="danger" fontFamily="mono" fontSize="sm">
                    ERROR: {error}
                  </Text>
                </HStack>
              </Box>
            )}

            {docs && (
              <>
                {/* Docs preview */}
                <Box
                  bg="bg.alt"
                  p={4}
                  overflow="auto"
                  maxH="350px"
                  fontFamily="mono"
                  fontSize="sm"
                  borderBottom="1px solid"
                  borderColor="border"
                  css={{
                    '&::-webkit-scrollbar': { width: '8px' },
                    '&::-webkit-scrollbar-track': { background: 'var(--bg)' },
                    '&::-webkit-scrollbar-thumb': { background: 'var(--border-bright)', borderRadius: '4px' },
                  }}
                >
                  <Code
                    bg="transparent"
                    color="text.muted"
                    whiteSpace="pre-wrap"
                    display="block"
                  >
                    {docs}
                  </Code>
                </Box>

                {/* Download */}
                <Box px={6} py={6}>
                  <HStack gap={4} justify="center">
                    <Button
                      onClick={handleDownload}
                      bg="transparent"
                      color="secondary"
                      border="1px solid"
                      borderColor="secondary"
                      fontFamily="mono"
                      px={8}
                      _hover={{
                        bg: 'secondary',
                        color: 'bg',
                        boxShadow: 'var(--secondary-glow)',
                      }}
                    >
                      <Download size={18} />
                      <Text ml={2}>DOWNLOAD .MD</Text>
                    </Button>
                  </HStack>
                </Box>
              </>
            )}
          </VStack>
        </Box>

        {/* Success message */}
        <Box
          w="full"
          bg="surface"
          borderRadius="lg"
          border="1px solid"
          borderColor="success"
          p={6}
          position="relative"
          boxShadow="0 0 30px rgba(0, 196, 106, 0.1)"
        >
          <VStack gap={4}>
            <HStack gap={3}>
              <Zap size={24} color="var(--success)" />
              <Heading size="md" fontFamily="mono" color="success">
                DEPLOYMENT READY
              </Heading>
            </HStack>
            <Text color="text.muted" textAlign="center" fontSize="sm">
              Your TrustGraph deployment package and installation guide are ready.
              Extract the ZIP and follow the instructions to initialize your system.
            </Text>
            <Button
              onClick={handleStartOver}
              bg="transparent"
              color="accent"
              border="1px solid"
              borderColor="accent"
              fontFamily="mono"
              _hover={{
                bg: 'accent',
                color: 'bg',
                boxShadow: 'var(--accent-glow)',
              }}
            >
              <RotateCcw size={18} />
              <Text ml={2}>NEW CONFIGURATION</Text>
            </Button>
          </VStack>
        </Box>

        {/* Navigation */}
        <HStack w="full" justify="flex-start">
          <Button
            variant="ghost"
            onClick={handleBack}
            color="text.subtle"
            fontFamily="mono"
            _hover={{
              color: 'text',
              bg: 'surface',
            }}
          >
            <ArrowLeft size={18} />
            <Text ml={2}>BACK</Text>
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
