import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';

function App({ children }) {
  return (
    <Box>
      <Navbar />
      <Box p={4}>{children}</Box>
    </Box>
  );
}

export default App;
