import { useTheme } from "@/hooks/use-theme";
import { Plus } from "lucide-react-native";
import { Image, Pressable, ScrollView, View } from "react-native";
import { ThemedText } from "../themed-text";

export const FriendStories = () => {
  const theme = useTheme();
  return (
    <View className=" ">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className=" "
      >
        {/* Your Story */}
        <Pressable className="  items-center">
          <View className="w-16 h-16 rounded-[24px] border-2 border-dashed border-muted-foreground items-center justify-center">
            <Plus size={24} color="#64748b" />
          </View>
          <ThemedText
            className="text-center mt-2"
            style={{
              lineHeight: 16,
            }}
          >
            {"Create\nstory"}
          </ThemedText>
        </Pressable>

        {/* Friends Stories */}
        {[1, 2, 3, 4, 5].map((i) => (
          <Pressable key={i} className=" pl-4  items-center">
            <View className="p-[3px] rounded-[24px] border-2 border-primary shadow-lg shadow-primary/30">
              <Image
                source={{ uri: `https://i.pravatar.cc/150?u=${i}` }}
                className="w-14 h-14 rounded-[21px]"
              />
              <View className="absolute -bottom-1 -right-1 bg-primary px-1.5 py-0.5 rounded-md">
                <ThemedText className="text-[6px] font-black text-white italic uppercase">
                  Live
                </ThemedText>
              </View>
            </View>
            <ThemedText className="text-[8px] font-black uppercase mt-2 text-foreground italic">
              Buddy {i}
            </ThemedText>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};
