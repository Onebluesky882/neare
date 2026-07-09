import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { MaterialIcons } from "@expo/vector-icons";
import { MapPin } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";
type Props = {
  newPost: () => void;
  newPostImage: () => void;
};
export const UserProfile = ({ newPost, newPostImage }: Props) => {
  const theme = useTheme();
  return (
    <View className=" *: pb-8 bg-card  ">
      <View className="flex-row justify-between items-center mb-6">
        <View className="flex-row items-center">
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=me" }}
            className="w-12 h-12 rounded-full border-2 border-primary"
          />
          <ThemedView className="ml-3">
            <Pressable onPress={newPost}>
              <ThemedText>Share your workout activity</ThemedText>
            </Pressable>
          </ThemedView>
        </View>
        <Pressable
          className="p-3 bg-secondary   relative"
          onPress={newPostImage}
        >
          <MaterialIcons name="photo" size={24} color={theme.icon} />
        </Pressable>
      </View>

      {/* Live Location Badge */}
      <View className="flex-row items-center bg-secondary/80 self-start px-4 py-2.5 rounded-2xl border border-border">
        <View className="bg-primary/20 p-1.5 rounded-full mr-3 animate-pulse">
          <MapPin size={14} color="#2A7FFF" />
        </View>
        <ThemedText className="text-[10px] font-black uppercase italic tracking-tighter text-foreground/80">
          Siam Paragon, BKK •{" "}
          <ThemedText className="text-primary italic">
            14 Active nearby
          </ThemedText>
        </ThemedText>
      </View>
    </View>
  );
};
