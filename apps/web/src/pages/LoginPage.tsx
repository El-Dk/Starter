import { useState } from "react";
import { Alert, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Admin123!");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate(location.state?.from?.pathname ?? "/dashboard", { replace: true });
    } catch {
      setError("No se pudo iniciar sesión. Verifica tus credenciales.");
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2 }}>
      <Card sx={{ width: "100%", maxWidth: 420 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight={700} mb={1}>Iniciar sesión</Typography>
          <Typography color="text.secondary" mb={3}>Accede a tu espacio de trabajo.</Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} display="grid" gap={2}>
            <TextField label="Correo electrónico" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
            <TextField label="Contraseña" type="password" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" variant="contained" size="large">Entrar</Button>
          </Box>
          <Typography variant="caption" color="text.secondary" display="block" mt={2}>
            Demo: admin@example.com / Admin123!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
