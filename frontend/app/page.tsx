"use client";
import React, { useState } from "react";
import {
  Button,
  Box,
  Stack,
  useMediaQuery,
  Typography,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import image from "@/publicimage.png"; // Ensure image is imported
import LoginForm from "./components/LoginForm";
import { gpsIcon, googleIcon, toggleIcon } from "./myIcon";
import Link from "next/link";

export default function Home() {
  const isAbove500px = useMediaQuery("(min-width:550px)");

  const [manualMode, setManualMode] = useState(false);
  return (
    <Box p={0} m={0}>
      <Stack
        direction={"column"}
        gap={4}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-around"}
        sx={{ 
          padding: "40px 20px",
          position:"relative",
          marginBottom: isAbove500px ? "120px" :"100px",
         }}
      >
        {!isAbove500px && <Typography variant="h5" alignSelf={"flex-start"}>Welcome back</Typography>}
        {isAbove500px && 
        <Stack  width={"100%"} direction={"row"} justifyContent={"space-between"}>
          <IconButton sx={{width:"50px", height:"50px", borderRadius:"50%"}}>
            <Image alt="logo" src={image} fill style={{borderRadius:"50%"}}/>
          </IconButton>
          <Button
          size="small"
          startIcon={gpsIcon()}
          sx={{
            textTransform:"none",
            color:"black",
             height:"40px",
            borderRadius:"10px"
          }}>
            Abuja
          </Button>
          <Stack direction={"row"} gap={2} justifyContent={"space-between"}>
            <Button 
            size="small"
            sx={{
              textTransform:"none",
              color:"black",
               height:"40px",
              borderRadius:"10px"
            }}>
              Store
            </Button>

            <Button 
            size="small"
            sx={{
              textTransform:"none",
              color:"#B63B56",
              borderBottom:"1px solid #B63B56",
               height:"40px",
              borderRadius:"10px"
            }}>
              login
            </Button>
            <Button 
            size="small"
            sx={{
              textTransform:"none",
              color:"black",
              backgroundColor:"#B63B56",
              height:"40px",
              borderRadius:"10px"
              
            }}>
              Become a Shopper
            </Button>
          </Stack>
        </Stack>}
        <Box
          width="100%"
          sx={{
            position: "relative",
            height: isAbove500px ? "500px" :"300px",
            maxHeight: isAbove500px ? "500px" :"300px",
          }}
        >
          <Image
            src={image} // Use the imported image
            alt="bcg"
            fill
            style={{objectFit: isAbove500px? "fill" :"contain", maxHeight: '100%', width: '100%'}}
          />
        </Box>

        <Stack 
        gap={2}
        sx={{
          position:isAbove500px ? "absolute" : "relative",
          width: isAbove500px ? "400px" : "100%",
          bottom:isAbove500px ? "-70px": "",
          left:isAbove500px ? "90px": "",
          p:isAbove500px ? "40px" : "",
          backgroundColor: isAbove500px ? "white" :"transparent" ,
          borderRadius:isAbove500px? "25px": ""
        }}>
        {isAbove500px && <Typography variant="h6" fontWeight={600}>Welcome back</Typography>}
        {isAbove500px && <Typography variant="body1" color="#585858">Login using:</Typography>}
          {!manualMode ? (
            <Button
              startIcon={googleIcon()}
              fullWidth
              sx={{
                textTransform: "none",
                border: "1px solid #5D5D5D",
                borderRadius: "20px",
                fontWeight:"bold",
                color:"#585858"
              }}
            >
              Log in with Google
            </Button>
          ) : (
            <LoginForm />
          )}
          <Typography>
          <IconButton onClick={() => setManualMode((prev) => !prev)}>
            {toggleIcon()}
          </IconButton>{" "}
          Tap to switch to {manualMode ? "Google" : "manual"}
        </Typography>
        </Stack>

        
      </Stack>
      <Stack
        pt={4}
        pb={4}
        direction={"row"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={4}
        bgcolor={"#F5F5F5"}
        display={isAbove500px? "none" : "flex" }
        position="fixed"     
        bottom={0}           
        left={0} 
        right={0} 
        zIndex={999} 
      >
        {[
          "About",
          "Products",
          "Privacy",
          "Terms",
          "SME",
          "+234 927370584",
          "support@test.com",
        ].map((text, index) => (
          <Link
            key={index}
            href="#"
            style={{
              color: "#5D5D5D",
              fontSize: "0.9em",
            }}
          >
            {text}
          </Link>
        ))}
      </Stack>
    </Box>
  );
}
