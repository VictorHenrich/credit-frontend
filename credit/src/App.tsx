import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react';
import Routes from "./Routes"



const theme: ThemeConfig = extendTheme({
  colors: {
    primary: "#1277BE",
    secondary: "#ffffff",
    tertiary: "#35AFCF"
  }
})

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
  )
}
