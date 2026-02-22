import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { createOrder, uploadProof } from "../services/appService";

export default function CheckoutModal({ open, onClose }) {
  const { cart, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const [customerName, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const handleConfirm = async () => {
    try {
      setLoading(true);

      const res = await createOrder({
        items: cart.map((i) => ({
          productId: i._id,
          quantity: i.quantity,
        })),
        paymentMethod,
        customerName,
        phone,
        address,
      });

      if (paymentMethod === "transfer" && file) {
        await uploadProof(res.data._id, file);
      }

      clearCart();
      onClose();
      alert("Pedido creado correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al crear pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Finalizar compra</DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 2 }}>Total: L. {total}</Typography>
        <TextField
          fullWidth
          label="Nombre del cliente"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Número de teléfono"
          variant="outlined"
          onChange={(e) => setPhone(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Dirección de envío"
          variant="outlined"
          onChange={(e) => setAddress(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Select
          fullWidth
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          sx={{ mt: 2 }}
        >
          <MenuItem value="transfer">Transferencia bancaria</MenuItem>
          <MenuItem value="cash">Pago contra entrega</MenuItem>
        </Select>

        {paymentMethod === "transfer" && (
          <TextField
            type="file"
            fullWidth
            sx={{ mt: 2 }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleConfirm} disabled={loading}>
          Confirmar pedido
        </Button>
      </DialogActions>
    </Dialog>
  );
}
