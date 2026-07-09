import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/themed-text";
import {
  Flame,
  Globe,
  MapPin,
  Target,
  Bike,
  Disc,
  Circle,
} from "lucide-react-native";

const TrendingSports = () => {
  const [scope, setScope] = useState<"around" | "global">("around");

  // Mock Data สำหรับสลับสถานะ
  const trendingData = {
    around: [
      {
        id: "1",
        sport: "Badminton",
        count: "12 Courts Active",
        icon: <Target size={20} color="#3b82f6" />,
        color: "text-blue-500",
      },
      {
        id: "2",
        sport: "Football",
        count: "8 Matches",
        icon: <Disc size={20} color="#10b981" />,
        color: "text-emerald-500",
      },
      {
        id: "3",
        sport: "Yoga",
        count: "15 people nearby",
        icon: <Circle size={20} color="#ec4899" />,
        color: "text-pink-500",
      },
    ],
    global: [
      {
        id: "1",
        sport: "Running",
        count: "5.2M Runners",
        icon: <Flame size={20} color="#f97316" />,
        color: "text-orange-500",
      },
      {
        id: "2",
        sport: "Cycling",
        count: "2.1M Cyclists",
        icon: <Bike size={20} color="#8b5cf6" />,
        color: "text-purple-500",
      },
      {
        id: "3",
        sport: "Football",
        count: "1.8M Players",
        icon: <Disc size={20} color="#10b981" />,
        color: "text-emerald-500",
      },
    ],
  };

  const currentData =
    scope === "around" ? trendingData.around : trendingData.global;

  return (
    <View className="mt-10">
      {/* Header & Toggle */}
      <View className="flex-row justify-between items-center mb-6 px-1">
        <View>
          <ThemedText className="text-2xl font-black italic uppercase tracking-tighter leading-none">
            Trending{" "}
            <ThemedText className="text-primary italic">Sports</ThemedText>
          </ThemedText>
          <ThemedText className="text-[10px] font-bold text-muted-foreground uppercase mt-1 tracking-widest opacity-60">
            What's hot today
          </ThemedText>
        </View>

        {/* Toggle Pill */}
        <View className="flex-row bg-secondary/50 p-1 rounded-full border border-border">
          <TouchableOpacity
            onPress={() => setScope("around")}
            className={`px-4 py-2 rounded-full flex-row items-center transition-all ${scope === "around" ? "bg-primary shadow-sm" : ""}`}
          >
            <MapPin
              size={12}
              color={scope === "around" ? "white" : "#64748b"}
            />
            {scope === "around" && (
              <ThemedText className="ml-1.5 text-[8px] font-black uppercase text-white italic">
                Near
              </ThemedText>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setScope("global")}
            className={`px-4 py-2 rounded-full flex-row items-center transition-all ${scope === "global" ? "bg-primary shadow-sm" : ""}`}
          >
            <Globe size={12} color={scope === "global" ? "white" : "#64748b"} />
            {scope === "global" && (
              <ThemedText className="ml-1.5 text-[8px] font-black uppercase text-white italic">
                Global
              </ThemedText>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Trending List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="-mx-2"
      >
        {currentData.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="bg-card border border-border rounded-[32px] p-5 mr-4 flex-row items-center shadow-sm w-52 active:scale-95 transition-transform"
          >
            <View className="w-12 h-12 rounded-2xl bg-secondary items-center justify-center border border-border">
              {item.icon}
            </View>
            <View className="ml-4 flex-1">
              <ThemedText
                className={`text-[9px] font-black uppercase italic tracking-widest ${item.color}`}
              >
                {item.sport}
              </ThemedText>
              <ThemedText
                className="text-xs font-bold text-foreground italic leading-tight"
                numberOfLines={1}
              >
                {item.count}
              </ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TrendingSports;
