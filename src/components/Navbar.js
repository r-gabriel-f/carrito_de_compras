import * as React from "react";
import { useState } from "react";
import ModalCarrito from "./Modal";
import ModalBuy from "./ModalBuy";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Container from "@mui/material/Container";
import Badge from "@mui/material/Badge";
import { Button } from "@mui/material";

function ResponsiveAppBar({ compras, contadorPorPlato }) {
  const [open, setOpen] = useState(false);
  const [openBuy, setOpenBuy] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenBuy = () => setOpenBuy(true);
  const handleCloseBuy = () => setOpenBuy(false);

  return (
    <AppBar position="static">
      <ModalCarrito
        open={open}
        handleClose={handleClose}
        contadorPorPlato={contadorPorPlato}
      />
      <ModalBuy open={openBuy} handleClose={handleCloseBuy} />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Shopping Cart
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Shopping Cart
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <div className="flex gap-2">
            <Button onClick={handleOpenBuy} color="inherit" variant="outlined">
              Payment History
            </Button>
            <IconButton onClick={handleOpen} sx={{ p: 0 }}>
              <Badge badgeContent={compras || 0} color="secondary">
                <AddShoppingCartIcon sx={{ color: "white" }} />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
