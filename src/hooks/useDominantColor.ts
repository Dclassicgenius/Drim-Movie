import { useState, useEffect } from "react";
import Vibrant from "node-vibrant";

async function getDominantColor(imageUrl: string): Promise<string> {
  try {
    const palette = await Vibrant.from(imageUrl).getPalette();
    const dominantColor = palette.Vibrant?.hex;
    return dominantColor || "#000000";
  } catch (error) {
    console.error("Error fetching dominant color:", error);
    return "#000000";
  }
}

export function useDominantColor(imageUrl: string): string {
  const [dominantColor, setDominantColor] = useState("#000000");

  useEffect(() => {
    async function fetchDominantColor() {
      const color = await getDominantColor(imageUrl);
      setDominantColor(color);
    }

    fetchDominantColor();
  }, [imageUrl]);

  return dominantColor;
}
