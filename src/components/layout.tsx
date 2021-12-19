import NextLink from "next/link";
import { Box, Container, Image, Stack, Link, Flex } from '@chakra-ui/react'
import { getResource, useMenu } from "next-drupal";
import { useRouter } from "next/dist/client/router";
import Footer from "./footer";
import { site } from '@/config';

export function Layout({ children }) {
  const { asPath } = useRouter();
  const { tree } = useMenu("main");

  return (
    <Flex flexDirection="column" height="100%">
      <Box as="header" py={4} width="100%">
        <Container maxW="container.xl">
          <Stack direction="row" justifyContent="space-between">
            <NextLink href="/" passHref>
              <Image
                src="/logo.png"
                alt="InfoProp"
                width={200}
                _hover={{ cursor: "pointer" }}
              />
            </NextLink>
            <Stack as="nav" direction="row" spacing={4} alignItems="center">
              {tree?.map((link) => (
                <NextLink key={link.id} href={link.url} passHref>
                  <Link
                    fontWeight="semibold"
                    // colorScheme='primary'
                    color="blue.900"
                    _hover={{ color: "teal.500" }}
                    _focus={{ color: "teal.500" }}
                  >
                    {link.title}
                  </Link>
                </NextLink>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Box as="main" className="main-content" width="100%">{children}</Box>
      <Footer copyright={site.copyright}/>
    </Flex>
  );
}
