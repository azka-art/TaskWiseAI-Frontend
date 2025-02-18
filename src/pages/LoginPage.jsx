import { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Input, Button, Box, Text, VStack, HStack, Spinner, Link } from "@chakra-ui/react";
import useAuthStore from "../store/useAuthStore";
import "../assets/styles/loginPage.css"; // ✅ Import login CSS

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("⚠️ Email dan password harus diisi!");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("⚠️ Format email tidak valid!");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await loginUser({ email, password });
      login({ email, token: response.data.token });
      setSuccess("✅ Login berhasil! Mengarahkan ke dashboard...");
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
      
    } catch (error) {
      setError("🚨 Email atau password salah. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login-container">
      <VStack spacing={4} className="login-box">
        <Text className="login-title">TaskWise-AI</Text>

        {/* ✅ Error & Success Messages */}
        {error && <Text className="error-text">{error}</Text>}
        {success && <Text className="success-text">{success}</Text>}

        {/* ✅ Email Input */}
        <Input 
          className="neon-input" 
          type="email" 
          placeholder="Masukkan Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />

        {/* ✅ Password Input */}
        <Input 
          className="neon-input" 
          type="password" 
          placeholder="Masukkan Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        {/* ✅ Login Button */}
        <Button className="neon-button" onClick={handleLogin} isDisabled={loading}>
          {loading ? <Spinner size="sm" /> : "Login"}
        </Button>

        {/* ✅ Forgot Password & Register Links */}
        <HStack spacing={4} className="forgot-register">
          <Link href="/forgot-password" className="forgot-password">Lupa Password?</Link>
          <Text className="separator">|</Text>
          <Link href="/register" className="register-link">Daftar Sekarang</Link>
        </HStack>
      </VStack>
    </Box>
  );
}

export default LoginPage;


