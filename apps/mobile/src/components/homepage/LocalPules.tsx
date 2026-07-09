import { ChevronRight, MapPin, Users } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { ThemedText } from "../themed-text";

export const LocalPules = () => {
  return (
    <View className="mt-10 ">
      <View className="flex-row justify-between items-end mb-5">
        <View>
          <ThemedText className="text-2xl font-black italic uppercase tracking-tighter">
            Local <ThemedText className="text-primary italic">Pulse</ThemedText>
          </ThemedText>
          <View className="h-1.5 w-12 bg-primary rounded-full mt-1 shadow-lg shadow-primary/40" />
        </View>
      </View>

      <Pressable className="bg-card border border-border rounded-[35px] p-5 shadow-sm overflow-hidden flex-row items-center">
        {/* Mock Map Preview */}
        <View className="w-20 h-20 bg-secondary rounded-2xl items-center justify-center border border-border overflow-hidden">
          <View className="w-4 h-4 bg-primary/20 rounded-full animate-ping absolute" />
          <MapPin size={24} color="#2A7FFF" />
        </View>
        <View className="ml-5 flex-1">
          <ThemedText className="text-lg font-black italic uppercase tracking-tight leading-tight">
            Lumpini Park
          </ThemedText>
          <ThemedText className="text-[10px] font-bold text-muted-foreground italic mb-2">
            Popular destination today
          </ThemedText>
          <View className="flex-row items-center">
            <Users size={12} color="#2A7FFF" />
            <ThemedText className="ml-2 text-[10px] font-black text-primary italic">
              52 Online Now
            </ThemedText>
          </View>
        </View>
        <ChevronRight size={20} color="#cbd5e1" />
      </Pressable>
    </View>
  );
};
