import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export function PrevArrow({ onClick }) {
  const theme = useTheme();

  return (
    <Box
      onClick={onClick}
      className="slick-arrow-custom slick-prev"
      sx={{
        position: "absolute",
        left: 8,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",
        p: 1,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(138, 4, 4, 0.12)"
            : "rgba(0,0,0,0.06)",
        color:
          theme.palette.mode === "dark"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
    </Box>
  );
}

export function NextArrow({ onClick }) {
  const theme = useTheme();

  return (
    <Box
      onClick={onClick}
      className="slick-arrow-custom slick-next"
      sx={{
        position: "absolute",
        right: 8,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",
        p: 1,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.12)"
            : "rgba(0,0,0,0.06)",
        color:
          theme.palette.mode === "dark"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
    </Box>
  );
}