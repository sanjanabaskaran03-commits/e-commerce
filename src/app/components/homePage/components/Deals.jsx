"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Stack, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import LayoutContainer from "@/src/app/components/common/LayoutContainer";
import Image from "next/image";

import Smartwatch from "@/public/images/homepage/deals/watch.png";
import Laptop from "@/public/images/homepage/deals/laptop.png";
import Camera from "@/public/images/homepage/deals/camera.png";
import Headphone from "@/public/images/homepage/deals/headphone.png";
import Phone from "@/public/images/homepage/deals/phone.png";

const MotionBox = motion(Box);

const Deals = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 4);
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          min: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          sec: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const deals = [
    { name: "Smart watches", discount: "-25%", img: Smartwatch },
    { name: "Laptops", discount: "-15%", img: Laptop },
    { name: "Canon cameras", discount: "-25%", img: Camera },
    { name: "Headphones", discount: "-25%", img: Headphone },
    { name: "GoPro cameras", discount: "-40%", img: Phone },
  ];

  return (
    <LayoutContainer>
      <Paper
        variant="outlined"
        sx={{
          mt: 4,
          borderRadius: "8px",
          borderColor: isDark ? "divider" : "#DEE2E7",
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 3,
            width: { xs: "100%", md: "280px" },
            minWidth: { md: "280px" },
            borderRight: { xs: "none", md: `1px solid ${theme.palette.divider}` },
            borderBottom: { xs: `1px solid ${theme.palette.divider}`, md: "none" },
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Deals and offers
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 2, fontSize: "14px" }}>
            Hygiene equipments
          </Typography>

          <Stack direction="row" spacing={1}>
            <TimerBox value={timeLeft.days} label="Days" />
            <TimerBox value={timeLeft.hours} label="Hour" />
            <TimerBox value={timeLeft.min} label="Min" />
            <TimerBox value={timeLeft.sec} label="Sec" />
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            flex: 1,
            width: "100%",
            overflowX: { xs: "auto", md: "visible" },
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {deals.map((item, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(0,0,0,0.01)",
              }}
              sx={{
                flex: { xs: "0 0 160px", md: 1 },
                borderRight:
                  index === deals.length - 1
                    ? "none"
                    : `1px solid ${theme.palette.divider}`,
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <MotionBox
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Box sx={{ position: "relative", height: { xs: 100, md: 120 }, width: 120, mb: 2 }}>
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </Box>
              </MotionBox>

              <Typography
                variant="body2"
                sx={{
                  color: "text.primary",
                  mb: 1,
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {item.name}
              </Typography>

              <Box
                sx={{
                  bgcolor: "#FFE3E3",
                  color: "#EB001B",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {item.discount}
              </Box>
            </MotionBox>
          ))}
        </Box>
      </Paper>
    </LayoutContainer>
  );
};

const TimerBox = ({ value, label }) => (
  <Box
    sx={{
      bgcolor: "#606060",
      color: "#fff",
      width: "50px",
      height: "50px",
      borderRadius: "4px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Typography sx={{ fontWeight: 700, fontSize: "16px", lineHeight: 1 }}>
      {String(value).padStart(2, "0")}
    </Typography>
    <Typography sx={{ fontSize: "10px", opacity: 0.8 }}>{label}</Typography>
  </Box>
);

export default Deals;