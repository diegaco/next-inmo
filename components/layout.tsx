import NextLink from "next/link";
import { Box, Container, Image, Stack, Link } from '@chakra-ui/react'
import { useMenu } from "next-drupal";
import { useRouter } from "next/dist/client/router";

export function Layout({ children }) {
  const { asPath } = useRouter();
  const { tree } = useMenu("main");

  return (
    <div className="max-w-screen-lg mx-auto px-6">
      <Box as="header" py={4}>
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
      <main className="container mx-auto py-10">{children}</main>
    </div>
  );
}
