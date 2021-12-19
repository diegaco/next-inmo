import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, FormControl, HStack, Input } from "@chakra-ui/react";
import React from "react";

export default function SearchForm () {
  return (
    <Box as="form" maxW="3xl" width="100%">
      <FormControl
        bgColor="white"
        boxShadow="lg"
        borderRadius="full"
        overflow="hidden"
      >
        <HStack spacing="1" p="1" shadow="lg">
          <Input
            id="search"
            border="0"
            borderRadius="0"
            type="text"
            placeholder="Buscá por ubicación o palabra clave"
            _focus={{ borderColor: "transparent" }}
          />
          <Button
            mt={4}
            minW="initial"
            width="12"
            flexGrow="12"
            height="12"
            colorScheme="teal"
            type="submit"
            borderRadius="full"
            aria-label="Submit"
          >
            <SearchIcon />
          </Button>
        </HStack>
      </FormControl>
    </Box>
  );
}
