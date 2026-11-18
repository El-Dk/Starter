import { Alert, Box, Card, CardContent, Grid, Typography } from "@mui/material";

export function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>Dashboard</Typography>
      <Typography color="text.secondary" mb={3}>Resumen general de la aplicación.</Typography>
      <Grid container spacing={2}>
        {[
          ["Usuarios", "128"],
          ["Sesiones activas", "24"],
          ["Reportes", "16"]
        ].map(([label, value]) => (
          <Grid key={label} size={{ xs: 12, sm: 4 }}>
            <Card><CardContent>
              <Typography color="text.secondary">{label}</Typography>
              <Typography variant="h4" fontWeight={700}>{value}</Typography>
            </CardContent></Card>
          </Grid>
        ))}
      </Grid>
      <Alert severity="info" sx={{ mt: 3 }}>
        Esta pantalla es un ejemplo. Sustituye estos indicadores por datos de tu API.
      </Alert>
    </Box>
  );
}

export function UsersPage() {
  return <Typography variant="h4" fontWeight={700}>Usuarios</Typography>;
}
export function ReportsPage() {
  return <Typography variant="h4" fontWeight={700}>Reportes</Typography>;
}
export function RolesPage() {
  return <Typography variant="h4" fontWeight={700}>Roles y permisos</Typography>;
}
export function SettingsPage() {
  return <Typography variant="h4" fontWeight={700}>Configuración</Typography>;
}
export function ForbiddenPage() {
  return <Alert severity="error">No tienes permisos para acceder a esta sección.</Alert>;
}
