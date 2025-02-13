"use client";
import React from "react"
import { Button, Stack, useMediaQuery, } from "@mui/material"
import Link from "next/link"

export default function LoginForm(){
    const isAbove500px = useMediaQuery("(min-width:550px)");
    return(
        <Stack gap={4}>
            <input
            name="email"
            placeholder="name@email.com"
            type="email"
            className="input"/>
            <Stack gap={1}>
             <input
            name="password"
            placeholder="please enter password"
            type="email"
            className="input"/>
            <Link href="#" style={{
                color:"#5D5D5D",
                fontSize:"0.9em"}}>Forgot Password?</Link>
            </Stack>

            <Button 
            size="large"
            sx={{
                textTransform:"none",
                color:"white",
                backgroundColor:"black", 
                borderRadius:"10px",
                width:isAbove500px ? "50%": "100%"
            }}>Proceed</Button>
        </Stack>
    )
}