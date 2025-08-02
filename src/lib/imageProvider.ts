// Image and Icon Assets Provider
import logo from "../assets/icons/logo.png";
import circle from "../assets/icons/circle.svg";
import dot from "../assets/icons/dot.svg";
import angle from "../assets/icons/angle.svg";

// Type definitions for better type safety
export interface IconAssets {
    logo: string;
    circle: string;
    dot: string;
    angle: string;
  [key: string]: string;
}

export interface ImageAssets {
  [key: string]: string;
}

export interface AssetCollection {
  icons: IconAssets;
  images: ImageAssets;
}

// Icons collection - typically smaller assets used for UI elements
export const icons: IconAssets = {
  // Add your icons here
  // Example: logo: logoIcon,
  logo,
  circle,
  dot,
  angle,
};

// Images collection - typically larger assets used for content
export const images: ImageAssets = {
  // Add your images here
  // Example: banner: bannerImage,
};

// Asset categories for better organization
export const assets: AssetCollection = {
  icons,
  images,
};

// Utility function to get asset by category and name
export const getAsset = (
  category: keyof AssetCollection,
  name: string,
): string | undefined => {
  return assets[category][name as keyof (typeof assets)[typeof category]];
};

// Utility function to get all assets of a specific category
export const getAssetsByCategory = (category: keyof AssetCollection) => {
  return assets[category];
};

// Utility function to check if an asset exists
export const hasAsset = (
  category: keyof AssetCollection,
  name: string,
): boolean => {
  return name in assets[category];
};

// Default export
export default assets;