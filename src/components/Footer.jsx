import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  useTheme,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  const theme = useTheme();

  const phoneNumber = "50499999999";
  const whatsappMessage = "Hola, quiero información sobre sus productos";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        mt: 6,
        py: 5,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Información tienda */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Nuestra Tienda
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Avenida Principal, Local #12
              <br />
              Tegucigalpa, Honduras
            </Typography>
          </Grid>

          {/* Contacto */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contacto
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Tel: +504 9999-9999
            </Typography>

            <Link
              href={whatsappLink}
              target="_blank"
              rel="noopener"
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 1,
              }}
            >
              <WhatsAppIcon sx={{ mr: 1 }} />
              Escríbenos por WhatsApp
            </Link>
          </Grid>

          {/* Redes Sociales */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Síguenos
            </Typography>

            <IconButton
              component="a"
              href="https://facebook.com"
              target="_blank"
              color="inherit"
            >
              <FacebookIcon />
            </IconButton>

            <IconButton
              component="a"
              href="https://instagram.com"
              target="_blank"
              color="inherit"
            >
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* Línea inferior */}
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Skincare Eshop. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}