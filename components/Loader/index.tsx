import { Spinner, Center, Box } from "@chakra-ui/react";

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  return (
    <Box
      display={isLoading ? "block" : "none"}
      position="fixed"
      zIndex="9999"
      width="100vw"
      height="100vh"
      backgroundColor="rgba(255, 255, 255, 0.8)"
      backdropFilter="blur(5px)"
    >
      <Center width="100vw" height="100vh">
        <Spinner size="xl" color="blue" />
      </Center>
    </Box>
  );
};

export default Loader;
