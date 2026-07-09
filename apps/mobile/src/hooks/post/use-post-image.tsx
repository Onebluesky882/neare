import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
export const usePostImage = () => {
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImages(result.assets.map((asset) => asset.uri));
    }
  };
  return {
    images,
    setImages,
    pickImage,
  };
};
