import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  const phoneNumber = "50492357673"; // SIN +
  const whatsappMessage = "Hola, quiero información sobre sus productos";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        mt: 6,
        py: 5,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Información tienda */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Nuestra Tienda
            </Typography>
            <Typography variant="body2">
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
            <Typography variant="body2">
              Tel: +504 9999-9999
            </Typography>

            <Link
              href={whatsappLink}
              target="_blank"
              rel="noopener"
              underline="none"
              sx={{ display: "flex", alignItems: "center", mt: 1 }}
            >
              <WhatsAppIcon sx={{ mr: 1, color: "#25D366" }} />
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
            >
              <FacebookIcon />
            </IconButton>

            <IconButton
              component="a"
              href="https://instagram.com"
              target="_blank"
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
            borderTop: "1px solid #ddd",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Skincare. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}