import { extendTheme, theme } from '@chakra-ui/react';

export default extendTheme({
  config: {
    initialColorMode: 'white',
    useSystemColorMode: false,
  },
  colors: {
    primary: theme.colors.blue
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  styles: {
    global: {
      'html, body': {
        height: '100%',
        // color: 'blue.900'
      },
      a: {
        color: 'teal.500',
        fontWeight: 500
      },
    }
  },
});
