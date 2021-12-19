import { Container, HStack, Text } from "@chakra-ui/react";

interface FooterProps {
  copyright?: string
}

export default function Footer({ copyright }: FooterProps) {
  return (
    <HStack as="footer" bgColor="gray.100" py="8" width="100%" mt="auto">
      <Container maxW="container.xl">
        {copyright ? (
          <Text fontSize="sm" color="gray.600">
            {copyright}
          </Text>
        ) : null}
      </Container>
    </HStack>
  );
}
