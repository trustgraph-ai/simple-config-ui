import { useState, useEffect } from 'react';
import { Box, Button, Heading, Text, VStack, HStack, Code, Spinner } from '@chakra-ui/react';
import { ArrowLeft, Download, RotateCcw, Package, CheckCircle, AlertTriangle, FileText, Zap } from 'lucide-react';
import { useWizardStore } from '../../state/wizard';
import { transformToConfig, generateInstallationDocs } from '../../model/transforms';

// Convert external API URL to local proxy path for development
const toProxyUrl = (apiUrl) => {
  try {
    const url = new URL(apiUrl);
    return url.pathname;
  } catch {
    return apiUrl;
  }
};

// Get human-readable labels for configuration values
const getConfigSummary = (wizardState, steps) => {
  const summary = [];

  for (const [stepId, step] of Object.entries(steps)) {
    if (!step.state_key || step.type === 'review') continue;

    const value = wizardState[step.state_key];
    if (value === undefined) continue;

    let displayValue = value;
    if (step.input?.options) {
      const option = step.input.options.find(o => o.value === value);
      if (option) displayValue = option.label;
    } else if (typeof value === 'boolean') {
      displayValue = value ? 'Yes' : 'No';
    }

    const label = step.title?.replace(/\?$/, '').replace(/^Which /, '').replace(/^How .* /, '');
    summary.push({ label, value: displayValue });
  }

  return summary;
};

export const ConfigOutput = () => {
  const wizardState = useWizardStore((state) => state.wizardState);
  const steps = useWizardStore((state) => state.steps);
  const setPhase = useWizardStore((state) => state.setPhase);
  const reset = useWizardStore((state) => state.reset);

  const [config, setConfig] = useState(null);
  const [docs, setDocs] = useState(null);
  const [docsLoading, setDocsLoading] = useState(true);
  const [docsError, setDocsError] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);
  const [downloaded, setDownloaded] = useState(false);

  const summary = getConfigSummary(wizardState, steps);

  useEffect(() => {
    transformToConfig(wizardState).then(setConfig);
  }, [wizardState]);

  useEffect(() => {
    const generate = async () => {
      try {
        setDocsLoading(true);
        const content = await generateInstallationDocs(wizardState);
        setDocs(content);
      } catch (err) {
        setDocsError(err.message);
      } finally {
        setDocsLoading(false);
      }
    };
    generate();
  }, [wizardState]);

  const handleDownloadZip = async () => {
    if (!config) return;

    setDownloading(true);
    setDownloadError(null);

    try {
      const { api_url, templates } = config;
      const url = toProxyUrl(api_url);

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templates),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text || response.statusText}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'deploy.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);

      setDownloaded(true);
    } catch (err) {
      setDownloadError(err.message);
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadDocs = () => {
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
    setPhase('review');
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
            <Package size={16} />
            <Text>DEPLOYMENT PACKAGE</Text>
          </HStack>
          {downloaded && (
            <HStack gap={2} color="success" fontFamily="mono" fontSize="sm">
              <CheckCircle size={16} />
              <Text>DOWNLOADED</Text>
            </HStack>
          )}
        </HStack>

        {/* Success banner */}
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
              Your TrustGraph configuration has been generated.
            </Text>

            {/* Configuration summary */}
            <HStack wrap="wrap" gap={2} justify="center" pt={2}>
              {summary.slice(0, 6).map(({ label, value }) => (
                <Box
                  key={label}
                  px={3}
                  py={1}
                  bg="bg.alt"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="border"
                >
                  <Text fontFamily="mono" fontSize="xs" color="accent">
                    {value}
                  </Text>
                </Box>
              ))}
            </HStack>
          </VStack>
        </Box>

        {/* Installation Guide */}
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
              <HStack gap={2}>
                <FileText size={18} color="var(--accent)" />
                <Heading size="md" fontFamily="mono" color="text">
                  Installation Guide
                </Heading>
              </HStack>
              <Text color="text.subtle" fontSize="sm" mt={2}>
                Follow these steps to deploy your configuration
              </Text>
            </Box>

            {docsLoading && (
              <HStack justify="center" py={12} gap={3}>
                <Spinner size="lg" color="accent" />
                <Text color="text.muted" fontFamily="mono">
                  GENERATING GUIDE...
                </Text>
              </HStack>
            )}

            {docsError && (
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
                    ERROR: {docsError}
                  </Text>
                </HStack>
              </Box>
            )}

            {docs && (
              <Box
                bg="bg.alt"
                p={4}
                overflow="auto"
                maxH="400px"
                fontFamily="mono"
                fontSize="sm"
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
            )}
          </VStack>
        </Box>

        {/* Download errors */}
        {downloadError && (
          <HStack
            w="full"
            p={4}
            bg="danger.subtle"
            borderRadius="md"
            border="1px solid"
            borderColor="danger"
          >
            <AlertTriangle size={20} color="var(--danger)" />
            <Text color="danger" fontFamily="mono" fontSize="sm">
              DOWNLOAD ERROR: {downloadError}
            </Text>
          </HStack>
        )}

        {/* Download success */}
        {downloaded && (
          <HStack
            w="full"
            p={4}
            bg="success.subtle"
            borderRadius="md"
            border="1px solid"
            borderColor="success"
          >
            <CheckCircle size={20} color="var(--success)" />
            <Text color="success" fontFamily="mono" fontSize="sm">
              DOWNLOAD COMPLETE: deploy.zip
            </Text>
          </HStack>
        )}

        {/* Download buttons */}
        <HStack gap={4} justify="center" w="full">
          <Button
            onClick={handleDownloadZip}
            disabled={downloading || !config}
            bg="accent"
            color="bg"
            fontFamily="mono"
            px={8}
            py={6}
            fontWeight="bold"
            _hover={{
              bg: 'accent.dim',
              boxShadow: 'var(--accent-glow)',
              transform: 'translateY(-1px)',
            }}
            _disabled={{
              opacity: 0.5,
              cursor: 'not-allowed',
            }}
            transition="all 0.2s"
          >
            {downloading ? (
              <HStack gap={2}>
                <Spinner size="sm" />
                <Text>DOWNLOADING...</Text>
              </HStack>
            ) : (
              <HStack gap={2}>
                <Download size={18} />
                <Text>DOWNLOAD ZIP</Text>
              </HStack>
            )}
          </Button>

          <Button
            onClick={handleDownloadDocs}
            disabled={!docs}
            bg="transparent"
            color="secondary"
            border="1px solid"
            borderColor="secondary"
            fontFamily="mono"
            px={8}
            py={6}
            _hover={{
              bg: 'secondary',
              color: 'bg',
              boxShadow: 'var(--secondary-glow)',
            }}
            _disabled={{
              opacity: 0.5,
              cursor: 'not-allowed',
            }}
            transition="all 0.2s"
          >
            <FileText size={18} />
            <Text ml={2}>DOWNLOAD GUIDE</Text>
          </Button>
        </HStack>

        {/* Start over */}
        <Button
          onClick={handleStartOver}
          bg="transparent"
          color="text.subtle"
          border="1px solid"
          borderColor="border"
          fontFamily="mono"
          _hover={{
            borderColor: 'accent',
            color: 'accent',
          }}
          transition="all 0.2s"
        >
          <RotateCcw size={18} />
          <Text ml={2}>NEW CONFIGURATION</Text>
        </Button>

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
