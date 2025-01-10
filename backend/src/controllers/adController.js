import { z } from "zod";
import { Home } from "../models/homeAd.js";
import { v2 as cloudinary } from "cloudinary";
import { Flat } from "../models/flatAd.js";
import { Land } from "../models/landAd.js";
import { Shop } from "../models/shopAd.js";

const homePropertySchema = z.object({
  agentId: z.string().nonempty("Agent ID is required"), // Assuming
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  pincode: z.number().optional(),
  location: z.string().nonempty("Location is required"),
  price: z.number().min(0, "Price must be a positive number"),
  area: z.number().min(0, "Area must be a positive number"),
  bedrooms: z.number().min(0, "Bedrooms must be a positive number"),
  bathrooms: z.number().min(0, "Bathrooms must be a positive number"),
  parking: z.boolean().default(false),
  garden: z.boolean().default(false),
  amenities: z.array(z.string()).default([]),
  nearby: z.array(z.string()).default([]),
});

export const postHomeAd = async (req, res) => {
  const { id } = req.agent;

  const parseIfNumber = (value) => {
    return isNaN(value) ? value : parseInt(value, 10);
  };

  const parseIfBoolean = (value) => {
    if (typeof value === "string") {
      return value.toLowerCase() === "true"; // Convert "true" to true and others to false
    }
    return Boolean(value); // Convert numbers (e.g., 1 or 0) to true/false
  };

  const {
    title,
    description,
    pincode,
    location,
    price,
    area,
    bedrooms,
    bathrooms,
    parking,
    garden,
    amenities,
    nearby,
  } = req.body;

  // console.log("this is req.cody",req.body)

  const parsed = homePropertySchema.safeParse({
    agentId: id,
    title,
    description,
    pincode: parseIfNumber(pincode),
    location,
    price: parseIfNumber(price),
    area: parseIfNumber(area),
    bedrooms: parseIfNumber(bedrooms),
    bathrooms: parseIfNumber(bathrooms),
    parking: parseIfBoolean(parking),
    garden: parseIfBoolean(garden),
    amenities,
    nearby,
  });

  const files = req.files;

  
  const cropParams = {
      gravity: "auto",
      width: 300,
      height: 300,
      crop: "crop",
    };
 
    
    try {
       
        const uploadResults = []; 
        console.log(files)

        if (files ) {
         
             for (const file of files) {
               try {
               
                 const result = await cloudinary.uploader.upload(file.path, {
                   folder: "agents",
                   resource_type: "raw",
                   transformation: cropParams, 
                 });

                
                 uploadResults.push(result.secure_url);

                
                 fs.unlink(file.path, (err) => {
                   if (err) {
                     console.error("Error deleting the file:", err);
                   }
                 });
               } catch (error) {
                 console.error("Error uploading file to Cloudinary:", error);
               }
             }
     }
        
        console.log(uploadResults)
 
        

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }
    // console.log("parsed success");

    const homeAd = await Home.create({
      ...parsed.data,images:uploadResults
    });
        
        // console.log(homeAd)

    if (homeAd) {
      return res.status(201).json({
        success: true,
        message: "Agent homesAd add successfully",
        homeAd,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const flatPropertySchema = z.object({
  agentId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"), // Validates a MongoDB ObjectId
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  pincode: z.number().optional(),
  price: z.number().positive("Price must be a positive number"),
  area: z.number().positive("Area must be a positive number"),
  bedrooms: z.number().positive("Bedrooms must be a positive number"),
  bathrooms: z.number().positive("Bathrooms must be a positive number"),
  floor: z.number().optional(),
  totalFloors: z.number().optional(),
  furnished: z.enum(["unfurnished", "furnished", "semifurnished"]).optional(),
  amenities: z.array(z.string()).optional().default([]),
  age: z.number().positive("Age must be a positive number").optional(),
  maintenance: z
    .number()
    .positive("Maintenance must be a positive number")
    .optional(),
  nearby: z.array(z.string()).optional().default([]),
  images: z.array(z.string().url("Invalid URL")).optional().default([]),
});

export const postFlatAd = async (req, res) => {
  
  const { id } = req.agent;
  
    const parseIfNumber = (value) => {
      return isNaN(value) ? value : parseInt(value, 10);
    };

    const parseIfBoolean = (value) => {
      if (typeof value === "string") {
        return value.toLowerCase() === "true"; // Convert "true" to true and others to false
      }
      return Boolean(value); // Convert numbers (e.g., 1 or 0) to true/false
  };
  
const {
  title,
  description,
  location,
  pincode,
  price,
  area,
  bedrooms,
  bathrooms,
  floor,
  totalFloors,
  furnished,
  amenities,
  age,
  maintenance,
  nearby,
  } = req.body;
  

  const parsed = flatPropertySchema.safeParse({
    agentId: id,
    title,
    description,
    pincode: parseIfNumber(pincode),
    location,
    price: parseIfNumber(price),
    area: parseIfNumber(area),
    bedrooms: parseIfNumber(bedrooms),
    bathrooms: parseIfNumber(bathrooms),
    floor: parseIfNumber(floor),
    totalFloors: parseIfNumber(totalFloors),
    furnished,
    amenities,
    age: parseIfNumber(age),
    maintenance: parseIfNumber(maintenance),
    nearby,
  });

    const files = req.files;

    const cropParams = {
      gravity: "auto",
      width: 300,
      height: 300,
      crop: "crop",
    };
 
  


  try {

     const uploadResults = [];
     console.log(files);

     if (files) {
       for (const file of files) {
         try {
           const result = await cloudinary.uploader.upload(file.path, {
             folder: "agents",
             resource_type: "raw",
             transformation: cropParams,
           });

           uploadResults.push(result.secure_url);

           fs.unlink(file.path, (err) => {
             if (err) {
               console.error("Error deleting the file:", err);
             }
           });
         } catch (error) {
           console.error("Error uploading file to Cloudinary:", error);
         }
       }
    }
    
        if (!parsed.success) {
          return res.status(400).json({
            success: false,
            error: parsed.error.errors.map((err) => ({
              path: err.path,
              message: err.message,
            })),
          });
        }
        // console.log("parsed success");

        const flatAd = await Flat.create({
          ...parsed.data,
          images: uploadResults,
        });

        // console.log(homeAd)

        if (flatAd) {
          return res.status(201).json({
            success: true,
            message: "Agent flatsAd add successfully",
            flatAd,
          });
        }
    
  } catch (error) {
    console.log(error.me)
  }
};


const landPropertySchema = z.object({
  agentId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"), // Validates a MongoDB ObjectId
  title: z.string().min(1, "Title is required"), // Non-empty string
  description: z.string().min(1, "Description is required"), // Non-empty string
  location: z.string().min(1, "Location is required"), // Non-empty string
  pincode: z.number().int("Pincode must be an integer").optional(), // Optional integer
  price: z.number().positive("Price must be a positive number"), // Positive number
  area: z.number().positive("Area must be a positive number"), // Positive number
  zoneType: z
    .string()
    .min(1, "Zone Type is required")
    .refine(
      (value) => ["Residential", "Commercial", "Agricultural"].includes(value),
      "Zone Type must be 'Residential', 'Commercial', or 'Agricultural'"
    ), // Restricted string values
  roadAccess: z.boolean().default(false), // Boolean with default `false`
  nearby: z.array(z.string()).optional().default([]), // Array of strings (default: empty array)
  images: z
    .array(z.string().url("Invalid URL for image"))
    .optional()
    .default([]), // Array of valid image URLs (default: empty array)
});


export const postLandAd = async (req, res) => {
  const { id } = req.agent;

  const parseIfNumber = (value) => {
    return isNaN(value) ? value : parseInt(value, 10);
  };

  const parseIfBoolean = (value) => {
    if (typeof value === "string") {
      return value.toLowerCase() === "true"; // Convert "true" to true and others to false
    }
    return Boolean(value); // Convert numbers (e.g., 1 or 0) to true/false
  };

  const {
    title,
    description,
    pincode,
    location,
    price,
    area,
    zoneType,
 roadAccess,   
    nearby,
  } = req.body;

  // console.log("this is req.cody",req.body)

  const parsed = landPropertySchema.safeParse({
    agentId: id,
    title,
    description,
    pincode: parseIfNumber(pincode),
    location,
    price: parseIfNumber(price),
    area: parseIfNumber(area),
   zoneType,
    roadAccess: parseIfBoolean(roadAccess),   
    nearby,
  });

  const files = req.files;

  const cropParams = {
    gravity: "auto",
    width: 300,
    height: 300,
    crop: "crop",
  };

  try {
    const uploadResults = [];
    console.log(files);

    if (files) {
      for (const file of files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "agents",
            resource_type: "raw",
            transformation: cropParams,
          });

          uploadResults.push(result.secure_url);

          fs.unlink(file.path, (err) => {
            if (err) {
              console.error("Error deleting the file:", err);
            }
          });
        } catch (error) {
          console.error("Error uploading file to Cloudinary:", error);
        }
      }
    }

    console.log(uploadResults);

  
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }
    // console.log("parsed success");

    const landAd = await Land.create({
      ...parsed.data,
      images: uploadResults,
    });

    // console.log(homeAd)

    if (landAd) {
      return res.status(201).json({
        success: true,
        message: "Agent landsAd add successfully",
        landAd,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};



const shopPropertySchema = z.object({
  agentId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"), // Validates a MongoDB ObjectId
  title: z.string().min(1, "Title is required"), // Non-empty string
  description: z.string().min(1, "Description is required"), // Non-empty string
  location: z.string().min(1, "Location is required"), // Non-empty string
  pincode: z.number().int("Pincode must be an integer").optional(), // Optional integer
  price: z.number().positive("Price must be a positive number"), // Positive number
  area: z.number().positive("Area must be a positive number"), // Positive number
  floor: z
    .number()
    .int("Floor must be an integer")
    .positive("Floor must be a positive number"), // Required positive integer
  furnished: z.boolean().default(false), // Boolean with default `false`
  parking: z.boolean().default(false), // Boolean with default `false`
  nearby: z.array(z.string()).optional().default([]), // Array of strings (default: empty array)
  images: z
    .array(z.string().url("Invalid URL for image"))
    .optional()
    .default([]), // Array of valid image URLs (default: empty array)
});


export const postShopAd = async (req, res) => {
  const { id } = req.agent;

  const parseIfNumber = (value) => {
    return isNaN(value) ? value : parseInt(value, 10);
  };

  const parseIfBoolean = (value) => {
    if (typeof value === "string") {
      return value.toLowerCase() === "true"; // Convert "true" to true and others to false
    }
    return Boolean(value); // Convert numbers (e.g., 1 or 0) to true/false
  };

  const {
    title,
    description,
    location,
    pincode,
    price,
    area,
    floor,
    furnished,
    parking,
    nearby,
  } = req.body;



  const parsed = shopPropertySchema.safeParse({
    agentId: id,
    title,
    description,
    pincode: parseIfNumber(pincode),
    location,
    price: parseIfNumber(price),
    area: parseIfNumber(area),
    floor: parseIfNumber(floor),
    furnished: parseIfBoolean(furnished),
    parking: parseIfBoolean(parking),
    nearby,
  });

  const files = req.files;

  const cropParams = {
    gravity: "auto",
    width: 300,
    height: 300,
    crop: "crop",
  };

  try {
    const uploadResults = [];
    console.log(files);

    if (files) {
      for (const file of files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "agents",
            resource_type: "raw",
            transformation: cropParams,
          });

          uploadResults.push(result.secure_url);

          fs.unlink(file.path, (err) => {
            if (err) {
              console.error("Error deleting the file:", err);
            }
          });
        } catch (error) {
          console.error("Error uploading file to Cloudinary:", error);
        }
      }
    }

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }
    // console.log("parsed success");

    const shopAd = await Shop.create({
      ...parsed.data,
      images: uploadResults,
    });

    // console.log(homeAd)

    if (shopAd) {
      return res.status(201).json({
        success: true,
        message: "Agent shopsAd add successfully",
        shopAd,
      });
    }
  } catch (error) {
    console.log(error.me);
  }
};