// "use server";
import mongoose from "mongoose";

export let userId = new mongoose.Types.ObjectId().toString();
export let assistantId = new mongoose.Types.ObjectId().toString();

export const dotVariants = {
  start: {
    x: "0%",
    opacity: 0,
    scale: 1.25,
    transition: { duration: 0.3 }, // Adjust duration as needed
  },
  end: {
    x: "0%",
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 }, // Adjust duration as needed
  },
  exit: {
    x: "-100%", // Move the element off-screen to the left
    opacity: 0,
    scale: 0, // Shrink the element to disappear
    transition: { duration: 0.3 }, // Adjust duration as needed
  },
};
