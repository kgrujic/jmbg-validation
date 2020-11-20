import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import React from "react";

export interface ProviderProps {}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ChakraProvider>
      <CSSReset />
      {children}
    </ChakraProvider>
  );
};

export default Provider;
