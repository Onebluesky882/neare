import { ChevronRight, Plus } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

export const LocalFeed = () => {
  return (
    <ThemedView className="mt-10  pb-20">
      <View className="flex-row justify-between items-center mb-6">
        <ThemedText className="text-2xl font-black italic uppercase tracking-tighter">
          Activity Feed
        </ThemedText>
        <Pressable className="flex-row items-center">
          <ThemedText className="text-primary text-[10px] font-black uppercase tracking-widest italic mr-1">
            More
          </ThemedText>
          <ChevronRight size={14} color="#2A7FFF" />
        </Pressable>
      </View>

      {/* Activity List: 4-5 Items */}
      {[
        {
          sport: "Football",
          title: "Need 2 more players",
          time: "18:30",
          dist: "0.4km",
          joined: "12/14",
        },
        {
          sport: "Badminton",
          title: "Intermediate Doubles",
          time: "Now",
          dist: "1.2km",
          joined: "3/4",
        },
        {
          sport: "Running",
          title: "5km Sunset Run",
          time: "17:15",
          dist: "0.8km",
          joined: "5/10",
        },
        {
          sport: "Cycling",
          title: "City Night Ride",
          time: "20:00",
          dist: "2.5km",
          joined: "8/20",
        },
      ].map((item, index) => (
        <Pressable
          key={index}
          className="bg-card border border-border p-5 rounded-[30px] mb-4 flex-row items-center shadow-sm"
        >
          <View className="w-12 h-12 rounded-xl bg-secondary items-center justify-center border border-border">
            <ThemedText className="text-primary font-black italic">
              {item.sport[0]}
            </ThemedText>
          </View>
          <View className="ml-4 flex-1">
            <View className="flex-row justify-between">
              <ThemedText className="text-[9px] font-black uppercase text-primary tracking-widest italic">
                {item.sport}
              </ThemedText>
              <ThemedText className="text-[9px] font-bold text-muted-foreground italic">
                {item.dist}
              </ThemedText>
            </View>
            <ThemedText
              className="text-sm font-black italic uppercase tracking-tight"
              numberOfLines={1}
            >
              {item.title}
            </ThemedText>
            <ThemedText className="text-[9px] font-bold text-muted-foreground italic leading-none">
              {item.time} • {item.joined} Joined
            </ThemedText>
          </View>
          <Pressable className="bg-primary/10 p-2 rounded-full border border-primary/20 ml-2">
            <Plus size={16} color="#2A7FFF" strokeWidth={3} />
          </Pressable>
        </Pressable>
      ))}
    </ThemedView>
  );
};
