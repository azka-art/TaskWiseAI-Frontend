import { Box, Flex, Link, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Navbar() {
  return (
    <Flex className="neon-navbar" p={4} color="white">
      <Box fontWeight="bold" className="glowing-title">
        TaskWiseAI
      </Box>
      <Spacer />
      <Link as={RouterLink} to="/dashboard" p={2} className="neon-link">
        Dashboard
      </Link>
    </Flex>
  );
}

export default Navbar;

