import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  ChevronDown,
  ChevronUp,
  Crown,
  Globe,
  MapPin,
  Medal,
  Trophy,
  Users,
} from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const RANK_DATA = [
  {
    id: "4",
    name: "Alex Runner",
    score: "142.5",
    rank: 4,
    trend: "up",
    avatar: "https://i.pravatar.cc/150?u=4",
  },
  {
    id: "5",
    name: "Sarah Biker",
    score: "138.2",
    rank: 5,
    trend: "down",
    avatar: "https://i.pravatar.cc/150?u=5",
  },
  {
    id: "6",
    name: "Mike Smash",
    score: "125.0",
    rank: 6,
    trend: "up",
    avatar: "https://i.pravatar.cc/150?u=6",
  },
  {
    id: "7",
    name: "Jane Doe",
    score: "118.9",
    rank: 7,
    trend: "none",
    avatar: "https://i.pravatar.cc/150?u=7",
  },
];

const TOP_THREE = [
  {
    id: "2",
    name: "Lucas",
    score: "185.2",
    rank: 2,
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: "1",
    name: "Sophia",
    score: "210.5",
    rank: 1,
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: "3",
    name: "Ethan",
    score: "168.0",
    rank: 3,
    avatar: "https://i.pravatar.cc/150?u=3",
  },
];

const Ranking = () => {
  const [activeTab, setActiveTab] = useState("local");

  return (
    <ThemedView className="flex-1 bg-background">
      {/* --- Section 1: Header & Tabs --- */}
      <View className="px-6 pt-14 pb-6 bg-card border-b border-border rounded-b-[45px] shadow-sm">
        <ThemedText className="text-3xl font-black italic uppercase tracking-tighter mb-6 text-center">
          Leader<ThemedText className="text-primary italic">board</ThemedText>
        </ThemedText>

        {/* Custom Tabs */}
        <View className="flex-row bg-secondary/50 p-1.5 rounded-[25px] border border-border">
          <TabButton
            label="Global"
            active={activeTab === "global"}
            onPress={() => setActiveTab("global")}
            icon={
              <Globe
                size={14}
                color={activeTab === "global" ? "white" : "#64748b"}
              />
            }
          />
          <TabButton
            label="Local"
            active={activeTab === "local"}
            onPress={() => setActiveTab("local")}
            icon={
              <MapPin
                size={14}
                color={activeTab === "local" ? "white" : "#64748b"}
              />
            }
          />
          <TabButton
            label="Friends"
            active={activeTab === "friends"}
            onPress={() => setActiveTab("friends")}
            icon={
              <Users
                size={14}
                color={activeTab === "friends" ? "white" : "#64748b"}
              />
            }
          />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* --- Section 2: The Podium (Top 3) --- */}
        <View className="flex-row justify-center items-end mt-10 px-6 h-64">
          {/* 2nd Place */}
          <PodiumStep
            user={TOP_THREE[0]}
            height="h-40"
            color="bg-slate-300"
            medal={<Medal size={20} color="#94a3b8" />}
          />

          {/* 1st Place */}
          <PodiumStep
            user={TOP_THREE[1]}
            height="h-52"
            color="bg-amber-400"
            isWinner
            medal={<Crown size={28} color="#f59e0b" />}
          />

          {/* 3rd Place */}
          <PodiumStep
            user={TOP_THREE[2]}
            height="h-32"
            color="bg-orange-400"
            medal={<Medal size={20} color="#c2410c" />}
          />
        </View>

        {/* --- Section 3: The List (Rank 4+) --- */}
        <View className="px-6 mt-10 pb-32">
          {RANK_DATA.map((item) => (
            <View
              key={item.id}
              className="bg-card border border-border rounded-3xl p-4 mb-3 flex-row items-center shadow-sm"
            >
              <ThemedText className="w-8 text-lg font-black italic text-muted-foreground">
                {item.rank}
              </ThemedText>
              <Image
                source={{ uri: item.avatar }}
                className="w-12 h-12 rounded-full border-2 border-secondary"
              />
              <View className="ml-4 flex-1">
                <ThemedText className="text-sm font-black uppercase italic tracking-tight">
                  {item.name}
                </ThemedText>
                <ThemedText className="text-[10px] font-bold text-muted-foreground italic">
                  {item.score} km this week
                </ThemedText>
              </View>
              <View className="items-end">
                {item.trend === "up" ? (
                  <ChevronUp size={20} color="#10b981" />
                ) : item.trend === "down" ? (
                  <ChevronDown size={20} color="#ef4444" />
                ) : (
                  <View className="h-5 w-5 bg-slate-200 rounded-full" />
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* --- Section 4: Current User Sticky Rank --- */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-10 pt-4 bg-primary rounded-t-[40px] shadow-2xl">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <ThemedText className="text-2xl font-black italic text-white mr-4">
              24
            </ThemedText>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?u=me" }}
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <View className="ml-3">
              <ThemedText className="text-white font-black uppercase italic tracking-tight">
                You (Pro)
              </ThemedText>
              <ThemedText className="text-white/70 text-[10px] font-bold uppercase italic tracking-widest">
                85.4 km to next rank
              </ThemedText>
            </View>
          </View>
          <Trophy size={28} color="white" opacity={0.5} />
        </View>
      </View>
    </ThemedView>
  );
};

// --- Sub-components ---

const TabButton = ({ label, active, onPress, icon }: any) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-1 flex-row items-center justify-center py-2.5 rounded-[20px] transition-all ${active ? "bg-primary shadow-lg shadow-primary/30" : ""}`}
  >
    {icon}
    <ThemedText
      className={`ml-2 text-[10px] font-black uppercase tracking-widest ${active ? "text-white" : "text-muted-foreground"}`}
    >
      {label}
    </ThemedText>
  </TouchableOpacity>
);

const PodiumStep = ({ user, height, color, isWinner = false, medal }: any) => (
  <View className="items-center mx-2">
    <View className="relative mb-2">
      <Image
        source={{ uri: user.avatar }}
        className={`${isWinner ? "w-20 h-20" : "w-16 h-16"} rounded-full border-4 border-card`}
      />
      <View className="absolute -top-6 left-0 right-0 items-center">
        {medal}
      </View>
    </View>
    <View
      className={`${color} ${height} w-20 rounded-t-3xl items-center pt-4 shadow-sm`}
    >
      <ThemedText className="text-white font-black italic text-xl">
        {user.rank}
      </ThemedText>
      <ThemedText
        className="text-white/80 font-black uppercase italic text-[8px] mt-1 tracking-tighter"
        numberOfLines={1}
      >
        {user.name}
      </ThemedText>
      <ThemedText className="text-white font-bold text-[10px] mt-2 italic">
        {user.score}
      </ThemedText>
    </View>
  </View>
);

export default Ranking;
