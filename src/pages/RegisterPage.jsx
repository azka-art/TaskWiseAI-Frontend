import { useState } from "react";
import { Box, Input, Button, Text, VStack } from "@chakra-ui/react";
import "../assets/styles/registerPage.css"; // ✅ Import login CSS

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    console.log("User Registered:", formData);
    alert("Registration successful!"); // ✅ Replace with API call
  };

  return (
    <Box className="register-container">
      <Box className="register-box">
        <Text className="register-title">Register</Text>
        <VStack spacing={4} align="stretch">
          <Text className="register-label">Username</Text>
          <Input className="register-input" type="text" name="username" placeholder="Enter username" onChange={handleChange} />

          <Text className="register-label">Email</Text>
          <Input className="register-input" type="email" name="email" placeholder="Enter email" onChange={handleChange} />

          <Text className="register-label">Password</Text>
          <Input className="register-input" type="password" name="password" placeholder="Enter password" onChange={handleChange} />

          <Button className="register-button" onClick={handleRegister}>Register</Button>
        </VStack>
      </Box>
    </Box>
  );
}

export default RegisterPage;

