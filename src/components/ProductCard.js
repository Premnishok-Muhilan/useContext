import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function ProductCard({ itemData }) {
  //Use the cart context
  const { cart, addToCart } = useContext(CartContext);
  // State to manage quantity
  //Each Card has a quantity
  //It is passed to the add to cart function in the Cart Context
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Update the quantity if the item exists in the cart
    const cartItem = cart.find((item) => item.id === itemData.id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      // Default quantity
      setQuantity(1); 
    }
  }, [cart, itemData.id]);

  // Handle quantity change
  const handleQuantityChange = (event) => {
    // Convert value to number
    setQuantity(Number(event.target.value)); 
  };

  // Handle add to cart
  const handleAddToCart = () => {
    // Use the quantity from state
    addToCart(itemData, quantity); 
  };

  // Calculate individual total price
  const individualTotalPrice = itemData.price * quantity;

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%"}}>
      <CardMedia
        component="img"
        image={itemData.image}
        alt={itemData.title}
        sx={{
          width: "100%",
          height: "300px",
          objectFit: "contain",
          marginTop:"25px"
        }}
      />
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography gutterBottom variant="h5" component="div">
          {itemData.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {itemData.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "auto",
          padding: 2,
        }}
      >
        <Typography variant="h6" color="text.primary" sx={{ marginBottom: 1 }}>
          ${itemData.price}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 2 }}
        >
          Rating: {itemData.rating.rate} ({itemData.rating.count} reviews)
        </Typography>
        <TextField
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          sx={{ marginBottom: 2 }}
          inputProps={{ min: 1 }}
        />
        <Typography variant="h6" color="text.primary" sx={{ marginBottom: 1 }}>
          Total: ${individualTotalPrice.toFixed(2)}
        </Typography>
        <Button size="small" onClick={handleAddToCart}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
