import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  MapPin,
  Plus,
  Search,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CATEGORIES = [
  { id: "all", label: "All Squads" },
  { id: "run", label: "Runners" },
  { id: "bike", label: "Cyclists" },
  { id: "ball", label: "Ballers" },
];

const POPULAR_CLUBS = [
  {
    id: "1",
    name: "BKK Midnight Runners",
    members: "2.4k",
    activeNow: 42,
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400",
    tags: ["Night Run", "City"],
  },
  {
    id: "2",
    name: "Skylane Pro Cycling",
    members: "1.8k",
    activeNow: 15,
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400",
    tags: ["Fast", "Pro"],
  },
];

const NEARBY_CLUBS = [
  {
    id: "3",
    name: "Siam Square Tennis",
    sport: "Tennis",
    dist: "0.5 km",
    members: 450,
    icon: <Star size={16} color="#f59e0b" />,
  },
  {
    id: "4",
    name: "Lumpini Early Birds",
    sport: "Running",
    dist: "1.2 km",
    members: 890,
    icon: <Zap size={16} color="#ef4444" />,
  },
  {
    id: "5",
    name: "Sukhumvit Smashers",
    sport: "Badminton",
    dist: "2.4 km",
    members: 320,
    icon: <Trophy size={16} color="#3b82f6" />,
  },
];

const Clubs = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <ThemedView className="flex-1 bg-background">
      {/* --- Section 1: Header & Search --- */}
      <View className="px-6 pt-14 pb-8 bg-card border-b border-border rounded-b-[45px] shadow-sm">
        <ThemedText className="text-3xl font-black italic uppercase tracking-tighter mb-5">
          Find your{" "}
          <ThemedText className="text-primary italic">Squad</ThemedText>
        </ThemedText>

        <View className="flex-row items-center bg-secondary/50 rounded-2xl px-4 py-3 border border-border">
          <Search size={18} color="#64748b" />
          <TextInput
            placeholder="Search by club name or sport..."
            className="ml-3 flex-1 text-foreground font-bold"
            placeholderTextColor="#94a3b8"
          />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* --- Section 2: Popular Squads (Horizontal) --- */}
        <View className="mt-8">
          <View className="px-6 flex-row justify-between items-end mb-5">
            <ThemedText className="text-2xl font-black italic uppercase tracking-tighter">
              Popular Now
            </ThemedText>
            <TouchableOpacity>
              <ThemedText className="text-primary text-[10px] font-black uppercase">
                See All
              </ThemedText>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pl-6"
          >
            {POPULAR_CLUBS.map((club) => (
              <TouchableOpacity
                key={club.id}
                className="mr-5 w-72 bg-card border border-border rounded-[40px] overflow-hidden shadow-sm active:scale-95 transition-transform"
              >
                <Image
                  source={{ uri: club.image }}
                  className="w-full h-40 object-cover"
                />
                <View className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full">
                  <ThemedText className="text-white text-[8px] font-black italic uppercase">
                    Hot Activity
                  </ThemedText>
                </View>
                <View className="p-5">
                  <ThemedText className="text-lg font-black italic uppercase tracking-tight mb-2 leading-tight">
                    {club.name}
                  </ThemedText>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center bg-secondary px-3 py-1 rounded-xl border border-border">
                      <Users size={12} color="#2A7FFF" />
                      <ThemedText className="ml-1.5 text-xs font-bold text-primary italic">
                        {club.members}
                      </ThemedText>
                    </View>
                    <View className="flex-row">
                      {[1, 2, 3].map((i) => (
                        <View
                          key={i}
                          className={`w-6 h-6 rounded-full bg-slate-300 border-2 border-card ${i > 1 ? "-ml-2" : ""}`}
                        />
                      ))}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* --- Section 3: Categories --- */}
        <View className="mt-10 pl-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                className={`mr-3 px-6 py-2.5 rounded-full border transition-all ${
                  activeTab === tab.id
                    ? "bg-primary border-primary"
                    : "bg-secondary border-border"
                }`}
              >
                <ThemedText
                  className={`text-[10px] font-black uppercase tracking-widest ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-muted-foreground"
                  }`}
                >
                  {tab.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* --- Section 4: Nearby Squads (List) --- */}
        <View className="mt-8 px-6 pb-24">
          <View className="flex-row items-center mb-5">
            <MapPin size={18} color="#2A7FFF" />
            <ThemedText className="ml-2 text-xl font-black italic uppercase tracking-tighter">
              Nearby You
            </ThemedText>
          </View>

          {NEARBY_CLUBS.map((club) => (
            <TouchableOpacity
              key={club.id}
              className="bg-card border border-border rounded-[30px] p-4 mb-4 flex-row items-center shadow-sm"
            >
              <View className="w-14 h-14 rounded-2xl bg-secondary items-center justify-center border border-border">
                {club.icon}
              </View>
              <View className="ml-4 flex-1">
                <View className="flex-row justify-between">
                  <ThemedText className="text-[10px] font-black text-primary uppercase tracking-widest italic">
                    {club.sport}
                  </ThemedText>
                  <ThemedText className="text-[10px] font-bold text-muted-foreground italic">
                    {club.dist}
                  </ThemedText>
                </View>
                <ThemedText className="text-base font-black italic uppercase tracking-tight">
                  {club.name}
                </ThemedText>
                <ThemedText className="text-[10px] font-bold text-muted-foreground italic">
                  {club.members} Members
                </ThemedText>
              </View>
              <TouchableOpacity className="ml-2 bg-primary p-2 rounded-full shadow-lg shadow-primary/30">
                <Plus size={20} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* --- Floating Action Button --- */}
      <TouchableOpacity
        className="absolute bottom-10 right-6 bg-primary w-16 h-16 rounded-[25px] items-center justify-center shadow-2xl shadow-primary/40 active:scale-90 transition-transform"
        style={{ elevation: 5 }}
      >
        <Trophy size={28} color="white" strokeWidth={3} />
      </TouchableOpacity>
    </ThemedView>
  );
};

export default Clubs;
