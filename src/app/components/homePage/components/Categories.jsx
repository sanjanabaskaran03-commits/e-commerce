"use client";
import { Box } from "@mui/material";
import LayoutContainer from "@/src/app/components/common/LayoutContainer";
import CategorySection from "@/src/app/components/common/CategorySection";
import ElectronicsBanner from "@/public/images/homepage/categories/electronics.png";
import Homedecor from "@/public/images/homepage/categories/homedecor.png";
import Softchairs from "@/public/images/homepage/categories/softchair1.png"
import Lamp from "@/public/images/homepage/categories/lamp.png"
import Mattress from "@/public/images/homepage/categories/mattress.png"
import Mudvessel from "@/public/images/homepage/categories/pot.png"
import Kitchenmixer from "@/public/images/homepage/categories/chopper.png"
import Blenders from "@/public/images/homepage/categories/blender.png" 
import Homeappliance from "@/public/images/homepage/categories/kitchen appliance.png"

import Smartwatches from "@/public/images/homepage/deals/watch.png"
import Cameras from "@/public/images/homepage/deals/camera.png"
import Headphone from "@/public/images/homepage/categories/headphone1.png"
import Electrickettle from "@/public/images/homepage/categories/coffee maker.png"
import Laptops from "@/public/images/homepage/deals/laptop.png"
import Tab from "@/public/images/homepage/categories/tab.png"
import Smartphone from "@/public/images/homepage/categories/mobile.png"
import Headphone1 from "@/public/images/homepage/categories/headphone1.png"

const Categories = () => {
  const homeItems = [
    { title: "Soft chairs", price: "19", img: Softchairs },
    { title: "Lamp", price: "19", img:Lamp  },
    { title: "Mattress", price: "19", img:  Mattress},
    { title: "Mud vessel", price: "19", img:  Mudvessel},
    { title: "Kitchen mixer", price: "100", img: Kitchenmixer },
    { title: "Blenders", price: "39", img: Blenders},
    { title: "Home appliance", price: "19", img: Homeappliance},
    { title: "Home decor", price: "10", img: Homedecor}
  ];

  const electronicsItems = [
    { title: "Smart watches", price: "19", img: Smartwatches },
    { title: "Cameras", price: "89", img: Cameras },
    { title: "Headphone", price: "10", img: Headphone },
    { title: "Electric kettle", price: "90", img:Electrickettle },
    { title: "Laptops & PC", price: "340", img:Laptops  },
    { title: "Tab", price: "19", img: Tab },
    { title: "Smartphone", price: "240", img: Smartphone},
    { title: "Headphone1", price: "34", img: Headphone1 },
  ];

  return (
    <LayoutContainer>
      <Box sx={{ py: 2 }}>
        <CategorySection 
          title="Home and outdoor" 
          bannerImg={ElectronicsBanner} 
          items={homeItems} 
        />

        <CategorySection 
          title="Consumer electronics and gadgets" 
          bannerImg={Homedecor}
          items={electronicsItems} 
        />
      </Box>
    </LayoutContainer>
  );
};

export default Categories;











