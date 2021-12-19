// import NextImage from 'next/image';
import SearchForm from "@/components/search-form";
import { Box, Container, Heading, Image, Stack } from "@chakra-ui/react";

export default function ParagraphHero({ paragraph, ...props }) {
  const heroImage = paragraph.field_background_image;

  return (
    <Stack position="relative" spacing="0">
      <Container
        maxW="container.lg"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex="2"
      >
        <Stack alignItems="center">
          <Heading
            size="2xl"
            lineHeight="1.25"
            mb="8"
            textAlign="center"
            color="white"
            textShadow="0 0 6px rgba(0,0,0,.3)"
          >
            {paragraph.field_title}
          </Heading>
          <SearchForm />
        </Stack>
      </Container>
      <Box
        position="relative"
        pb="27.77777%"
        minH="500px"
        backgroundColor="black"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${heroImage.uri.url}`}
          alt={heroImage.resourceIdObjMeta.alt}
          width="100%"
          height="100%"
          position="absolute"
          fit="cover"
          opacity=".65"
        />
      </Box>
    </Stack>
  );
}
