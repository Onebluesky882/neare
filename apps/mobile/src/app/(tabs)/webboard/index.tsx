import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  Bike,
  Filter,
  Heart,
  MapPin,
  MessageSquare,
  Plus,
  Search,
  Trophy,
  Zap,
} from "lucide-react-native";
import { useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";

const CATEGORIES = [
  { id: "nearby", label: "Nearby", icon: <MapPin size={16} color="#2A7FFF" /> },
  { id: "running", label: "Running", icon: <Zap size={16} color="#ef4444" /> },
  { id: "cycling", label: "Cycling", icon: <Bike size={16} color="#8b5cf6" /> },
  { id: "events", label: "Events", icon: <Trophy size={16} color="#f59e0b" /> },
];

const MOCK_POSTS = [
  {
    id: "1",
    type: "EVENT",
    tag: "Running",
    title: "Bangkok Midnight Run 2024",
    content: "ใครไปงานนี้บ้างครับ หาเพื่อนหารค่ารถจากแถวบางนาครับ...",
    location: "Siam Square",
    time: "2h ago",
    author: "Admin_Snackig",
    comments: 24,
    likes: 152,
    isOfficial: true,
  },
  {
    id: "2",
    type: "COMMUNITY",
    tag: "Cycling",
    title: "พรุ่งนี้เช้ามีใครไปปั่นที่ Sky Lane ไหมครับ?",
    content: "อยากหาคนปั่นนำทางหน่อยครับ พึ่งเริ่มปั่นหมอบได้ไม่นาน...",
    location: "Suvarnabhumi",
    time: "45m ago",
    author: "BikeLover_BKK",
    comments: 8,
    likes: 12,
    isOfficial: false,
  },
  {
    id: "3",
    type: "EVENT",
    tag: "Cycling",
    title: "Tour de Town: ปั่นชมเมือง",
    content: "ประกาศงานปั่นจักรยานชมเมืองเก่า เริ่มต้นที่ลานคนเมือง...",
    location: "Old Town BKK",
    time: "1d ago",
    author: "BKK_Cycling_Club",
    comments: 56,
    likes: 89,
    isOfficial: true,
  },
];

const Webboard = () => {
  const [activeTab, setActiveTab] = useState("nearby");

  return (
    <ThemedView className="flex-1 bg-background">
      {/* --- Header & Search --- */}
      <View className="px-6 pt-14 pb-4 bg-card border-b border-border rounded-b-[40px] shadow-sm">
        <ThemedText className="text-3xl font-black italic uppercase tracking-tighter mb-4">
          Commu<ThemedText className="text-primary italic">nity</ThemedText>
        </ThemedText>

        <View className="flex-row items-center bg-secondary/50 rounded-2xl px-4 py-3 border border-border">
          <Search size={18} color="#64748b" />
          <TextInput
            placeholder="Search activities, events..."
            className="ml-3 flex-1 text-foreground font-bold"
            placeholderTextColor="#94a3b8"
          />
          <TouchableOpacity>
            <Filter size={18} color="#2A7FFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* --- Category Tabs --- */}
        <View className="mt-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pl-6"
          >
            {CATEGORIES.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                className={`mr-3 flex-row items-center px-5 py-3 rounded-full border transition-all ${
                  activeTab === tab.id
                    ? "bg-primary border-primary"
                    : "bg-card border-border"
                }`}
              >
                {tab.icon}
                <ThemedText
                  className={`ml-2 text-[10px] font-black uppercase tracking-widest ${
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

        {/* --- Main Feed --- */}
        <View className="px-6 mt-8 pb-24">
          {MOCK_POSTS.map((post) => (
            <TouchableOpacity
              key={post.id}
              className="bg-card border border-border rounded-[35px] p-6 mb-5 shadow-sm active:scale-[0.98] transition-transform overflow-hidden"
            >
              {/* Background Glow for Official Posts */}
              {post.isOfficial && (
                <View className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full" />
              )}

              <View className="flex-row justify-between items-center mb-4">
                <View className="flex-row items-center">
                  <View className="bg-secondary p-1.5 rounded-full border border-border">
                    <View className="bg-primary w-2 h-2 rounded-full" />
                  </View>
                  <ThemedText className="ml-2 text-[10px] font-black uppercase text-primary italic tracking-widest">
                    {post.tag} • {post.type}
                  </ThemedText>
                </View>
                <ThemedText className="text-[10px] font-bold text-muted-foreground">
                  {post.time}
                </ThemedText>
              </View>

              <ThemedText className="text-xl font-black italic uppercase tracking-tighter mb-2 leading-tight">
                {post.title}
              </ThemedText>
              <ThemedText
                className="text-muted-foreground text-sm font-medium mb-4 leading-5"
                numberOfLines={2}
              >
                {post.content}
              </ThemedText>

              <View className="flex-row items-center mb-5 bg-secondary/30 self-start px-3 py-1.5 rounded-xl border border-border">
                <MapPin size={12} color="#64748b" />
                <ThemedText className="ml-1 text-[10px] font-bold text-muted-foreground">
                  {post.location}
                </ThemedText>
              </View>

              <View className="flex-row justify-between items-center border-t border-border/50 pt-4">
                <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-full bg-slate-200 border border-border" />
                  <ThemedText className="ml-2 text-[10px] font-black uppercase italic tracking-tighter opacity-60">
                    {post.author}
                  </ThemedText>
                </View>

                <View className="flex-row items-center gap-4">
                  <View className="flex-row items-center gap-1">
                    <Heart size={16} color="#64748b" />
                    <ThemedText className="text-xs font-bold text-muted-foreground">
                      {post.likes}
                    </ThemedText>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <MessageSquare size={16} color="#64748b" />
                    <ThemedText className="text-xs font-bold text-muted-foreground">
                      {post.comments}
                    </ThemedText>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* --- Floating Post Button --- */}
      <TouchableOpacity
        className="absolute bottom-10 right-6 bg-primary w-16 h-16 rounded-[25px] items-center justify-center shadow-2xl shadow-primary/40 active:scale-90 transition-transform"
        style={{ elevation: 5 }}
      >
        <Plus size={28} color="white" strokeWidth={3} />
      </TouchableOpacity>
    </ThemedView>
  );
};

export default Webboard;
