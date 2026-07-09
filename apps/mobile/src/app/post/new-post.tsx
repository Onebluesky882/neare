import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const NewPost = () => {
  const router = useRouter();

  const handleClose = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)");
    }
  };

  return (
    <SafeAreaView>
      <ThemedView className="flex-row justify-between   items-center px-4">
        <X onPress={handleClose} />
        <ThemedText>NewPost</ThemedText>
        <ThemedText> </ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
};
export default NewPost;
