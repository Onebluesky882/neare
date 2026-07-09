import { ThemedText } from "@/components/themed-text";
import { usePostImage } from "@/hooks/post/use-post-image";
import { useRouter } from "expo-router";
import { Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const PostImage = () => {
  const router = useRouter();
  const { images } = usePostImage();
  console.log("images :", images);
  const handleClose = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        horizontal
        className="mt-4"
        showsHorizontalScrollIndicator={false}
      >
        <ThemedText onPress={handleClose}>back</ThemedText>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={{
              width: 200,

              height: 200,
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default PostImage;
