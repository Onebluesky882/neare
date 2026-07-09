import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  ArrowRight,
  Bike,
  Camera,
  ChevronRight,
  Circle,
  Disc,
  Flame,
  Globe,
  Share,
  Target,
  Timer,
  Trophy,
  Users,
  Zap,
} from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

import { LucideIcon } from "lucide-react-native";
type Sport = {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
};

const SPORTS: Sport[] = [
  {
    id: "run",
    name: "Running",
    icon: Zap,
    color: "bg-blue-500",
  },
  {
    id: "bike",
    name: "Cycling",
    icon: Bike,
    color: "bg-purple-500",
  },
  {
    id: "foot",
    name: "Football",
    icon: Disc,
    color: "bg-emerald-500",
  },
  {
    id: "bash",
    name: "Basketball",
    icon: Target,
    color: "bg-amber-500",
  },
  {
    id: "badm",
    name: "Badminton",
    icon: Circle,
    color: "bg-pink-500",
  },
];

const CreateWorkout = () => {
  const [selectedSport, setSelectedSport] = useState("run");
  const [goal, setGoal] = useState("5.0");
  const [shareToFeed, setShareToFeed] = useState(false);
  const [liveStory, setLiveStory] = useState(false);

  return (
    <ThemedView className="flex-1 bg-background">
      {/* --- Header --- */}
      <View className="px-6 pt-14 pb-4">
        <ThemedText className="text-3xl font-black italic uppercase tracking-tighter">
          New <ThemedText className="text-primary italic">Workout</ThemedText>
        </ThemedText>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* --- Section 1: Sport Selection (Top Slice Menu) --- */}
        <View className="mt-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pl-6"
            contentContainerStyle={{ paddingRight: 40 }}
          >
            {SPORTS.map((sport) => (
              <TouchableOpacity
                key={sport.id}
                onPress={() => setSelectedSport(sport.id)}
                className={`mr-4 items-center justify-center px-6 py-4 rounded-[30px] border-2 transition-all ${
                  selectedSport === sport.id
                    ? "bg-primary border-primary scale-105 shadow-lg shadow-primary/40"
                    : "bg-card border-border"
                }`}
              >
                <View
                  className={`p-2 rounded-full mb-1 ${selectedSport === sport.id ? "bg-white/20" : "bg-secondary"}`}
                >
                  <sport.icon
                    size={22}
                    color={selectedSport === sport.id ? "white" : "#2A7FFF"}
                  />
                </View>
                <ThemedText
                  className={`text-[10px] font-black uppercase italic ${selectedSport === sport.id ? "text-white" : "text-muted-foreground"}`}
                >
                  {sport.name}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* --- Section 2: Set Goal (Weight/Distance Target) --- */}
        <View className="mt-10 px-6">
          <ThemedText className="text-xl font-black italic uppercase tracking-tighter mb-4">
            Set Your Goal
          </ThemedText>
          <View className="bg-card border border-border rounded-[40px] p-8 items-center shadow-sm">
            <View className="flex-row items-center justify-center mb-6">
              <TouchableOpacity
                onPress={() => setGoal((parseFloat(goal) - 0.5).toFixed(1))}
                className="bg-secondary w-12 h-12 rounded-full items-center justify-center border border-border"
              >
                <ThemedText className="text-2xl font-black text-primary">
                  -
                </ThemedText>
              </TouchableOpacity>

              <View className="mx-10 items-center">
                <ThemedText className="text-5xl font-black italic text-foreground tracking-tighter">
                  {goal}
                </ThemedText>
                <ThemedText className="text-xs font-black uppercase text-primary italic tracking-[0.2em]">
                  Kilometers
                </ThemedText>
              </View>

              <TouchableOpacity
                onPress={() => setGoal((parseFloat(goal) + 0.5).toFixed(1))}
                className="bg-secondary w-12 h-12 rounded-full items-center justify-center border border-border"
              >
                <ThemedText className="text-2xl font-black text-primary">
                  +
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* Quick Presets */}
            <View className="flex-row gap-2">
              {["3.0", "5.0", "10.0"].map((val) => (
                <TouchableOpacity
                  key={val}
                  onPress={() => setGoal(val)}
                  className={`px-6 py-2 rounded-full border ${goal === val ? "bg-primary border-primary" : "bg-background border-border"}`}
                >
                  <ThemedText
                    className={`text-[10px] font-black italic ${goal === val ? "text-white" : "text-muted-foreground"}`}
                  >
                    {val}K
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        {/* --- Section 3: Social & Sharing (NEW!) --- */}
        <View className="mt-10">
          <View className="flex-row items-center justify-between mb-5">
            <ThemedText className="text-xl font-black italic uppercase tracking-tighter">
              Social Settings
            </ThemedText>
            <Share size={18} color="#2A7FFF" />
          </View>

          <View className="bg-card border border-border rounded-[40px] p-2 space-y-2">
            {/* Option 1: Post to Social Feed */}
            <TouchableOpacity
              onPress={() => setShareToFeed(!shareToFeed)}
              className="flex-row items-center justify-between p-5 rounded-[35px] bg-secondary/30"
            >
              <View className="flex-row items-center flex-1">
                <View
                  className={`p-3 rounded-2xl ${shareToFeed ? "bg-primary shadow-lg shadow-primary/30" : "bg-slate-200 dark:bg-slate-700"}`}
                >
                  <Globe size={18} color={shareToFeed ? "white" : "#64748b"} />
                </View>
                <View className="ml-4">
                  <ThemedText className="text-sm font-black uppercase italic">
                    Post to Feed
                  </ThemedText>
                  <ThemedText className="text-[9px] font-bold text-muted-foreground italic tracking-tight">
                    Auto-share results after finish
                  </ThemedText>
                </View>
              </View>
              <Switch
                value={shareToFeed}
                onValueChange={setShareToFeed}
                trackColor={{ false: "#64748b", true: "#2A7FFF" }}
              />
            </TouchableOpacity>

            {/* Option 2: Live Story / Snap */}
            <TouchableOpacity
              onPress={() => setLiveStory(!liveStory)}
              className="flex-row items-center justify-between p-5 rounded-[35px] bg-secondary/30"
            >
              <View className="flex-row items-center flex-1">
                <View
                  className={`p-3 rounded-2xl ${liveStory ? "bg-orange-500 shadow-lg shadow-orange-300" : "bg-slate-200 dark:bg-slate-700"}`}
                >
                  <Camera size={18} color={liveStory ? "white" : "#64748b"} />
                </View>
                <View className="ml-4">
                  <ThemedText className="text-sm font-black uppercase italic">
                    Live Story
                  </ThemedText>
                  <ThemedText className="text-[9px] font-bold text-muted-foreground italic tracking-tight">
                    Show buddies I'm active now
                  </ThemedText>
                </View>
              </View>
              <Switch
                value={liveStory}
                onValueChange={setLiveStory}
                trackColor={{ false: "#64748b", true: "#f97316" }}
              />
            </TouchableOpacity>

            {/* Option 3: Invite Nearby Buddies */}
            <TouchableOpacity className="flex-row items-center justify-between p-5 rounded-[35px]">
              <View className="flex-row items-center flex-1">
                <View className="p-3 rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-300">
                  <Users size={18} color="white" />
                </View>
                <View className="ml-4">
                  <ThemedText className="text-sm font-black uppercase italic">
                    Invite Buddies
                  </ThemedText>
                  <ThemedText className="text-[9px] font-bold text-muted-foreground italic tracking-tight">
                    Ping nearby people to join
                  </ThemedText>
                </View>
              </View>
              <ChevronRight size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- Section 3: Summary (Planned Stats) --- */}
        <View className="mt-10 px-6 pb-40">
          <ThemedText className="text-xl font-black italic uppercase tracking-tighter mb-4">
            Workout Summary
          </ThemedText>
          <View className="flex-row flex-wrap justify-between">
            <SummaryCard
              icon={<Timer size={20} color="#10b981" />}
              label="EST. TIME"
              value="28:00"
              color="text-emerald-500"
            />
            <SummaryCard
              icon={<Flame size={20} color="#ef4444" />}
              label="EST. BURN"
              value="350 kcal"
              color="text-destructive"
            />
          </View>

          <TouchableOpacity className="bg-card border border-border rounded-[30px] p-5 mt-4 flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center">
              <View className="bg-primary/10 p-3 rounded-2xl">
                <Trophy size={20} color="#2A7FFF" />
              </View>
              <View className="ml-4">
                <ThemedText className="text-sm font-black uppercase italic tracking-tight">
                  Personal Record
                </ThemedText>
                <ThemedText className="text-[10px] font-bold text-muted-foreground italic">
                  Beat your 4.25km best!
                </ThemedText>
              </View>
            </View>
            <ChevronRight size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* --- Section 4: Summary --- */}
        <View className="mt-10 pb-40">
          <ThemedText className="text-xl font-black italic uppercase tracking-tighter mb-4">
            Summary
          </ThemedText>
          <View className="flex-row justify-between">
            <SummaryCard
              icon={<Timer size={20} color="#10b981" />}
              label="TIME"
              value="28:00"
              color="text-emerald-500"
            />
            <SummaryCard
              icon={<Flame size={20} color="#ef4444" />}
              label="BURN"
              value="350 kcal"
              color="text-destructive"
            />
          </View>
        </View>

        {/* --- Start Button --- */}
        <View className="absolute bottom-10 left-6 right-6">
          <TouchableOpacity className="bg-primary flex-row items-center justify-center py-6 rounded-[35px] shadow-2xl shadow-primary/40">
            <ThemedText className="text-white text-xl font-black italic uppercase tracking-tighter mr-2 italic">
              Start Activity
            </ThemedText>
            <ArrowRight size={24} color="white" strokeWidth={3} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* --- Floating Start Button --- */}
      <View className="absolute bottom-10 left-6 right-6">
        <TouchableOpacity
          className="bg-primary flex-row items-center justify-center py-6 rounded-[35px] shadow-2xl shadow-primary/40 active:scale-95 transition-transform"
          style={{ elevation: 10 }}
        >
          <ThemedText className="text-white text-xl font-black italic uppercase tracking-tighter mr-2">
            Start Activity
          </ThemedText>
          <ArrowRight size={24} color="white" strokeWidth={3} />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

// Sub-component: Summary Card
const SummaryCard = ({ icon, label, value, color }: any) => (
  <View className="bg-card border border-border w-[48%] rounded-[35px] p-6 mb-4 shadow-sm">
    <View className="bg-secondary w-10 h-10 rounded-2xl items-center justify-center mb-4">
      {icon}
    </View>
    <ThemedText className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">
      {label}
    </ThemedText>
    <ThemedText
      className={`text-lg font-black italic tracking-tighter ${color}`}
    >
      {value}
    </ThemedText>
  </View>
);

export default CreateWorkout;
