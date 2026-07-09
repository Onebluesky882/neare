import { ThemedText } from "@/components/themed-text";
import {
  Heart,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Share2,
  Trophy,
  Zap,
} from "lucide-react-native";
import { Image, TouchableOpacity, View } from "react-native";

const MOCK_FEED = [
  {
    id: "1",
    user: {
      name: "Sarah Miller",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      isBuddy: true,
    },
    type: "ACTIVITY", // โพสต์ผลการวิ่ง
    content:
      "Morning 5k felt amazing! The air at Lumpini Park is so fresh today. 🏃‍♀️✨",
    image: "https://images.unsplash.com/photo-1502904550040-753d5013be5a?w=800",
    stats: { distance: "5.2 km", pace: "5:45", time: "30m" },
    location: "Lumpini Park, BKK",
    likes: 124,
    comments: 18,
    timeAgo: "12m ago",
  },
  {
    id: "2",
    user: {
      name: "Mike Chen",
      avatar: "https://i.pravatar.cc/150?u=mike",
      isBuddy: false,
    },
    type: "SOCIAL", // โพสต์รูปหมู่/นัดเจอ
    content:
      'Finally met the "Evening Smashers" squad! Great badminton session everyone. 🏸🔥',
    image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800",
    location: "BKK Badminton Club",
    likes: 85,
    comments: 5,
    timeAgo: "45m ago",
  },
  {
    id: "3",
    user: {
      name: "Alex Runner",
      avatar: "https://i.pravatar.cc/150?u=me",
      isBuddy: false,
    },
    type: "ACHIEVEMENT", // โพสต์เหรียญรางวัล
    content: "New Personal Best! 10km under 50 mins. Hard work pays off. 🏅",
    image: "https://images.unsplash.com/photo-1581889470536-467bdbe30ac0?w=800",
    stats: { title: "10K Finisher", rank: "#12 in City" },
    location: "Siam Square",
    likes: 312,
    comments: 42,
    timeAgo: "2h ago",
  },
];

const SocialFeed = () => {
  return (
    <View className="mt-10 pb-32">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6 px-1">
        <View>
          <ThemedText className="text-2xl font-black italic uppercase tracking-tighter">
            Social <ThemedText className="text-primary italic">Feed</ThemedText>
          </ThemedText>
          <ThemedText className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">
            Your community updates
          </ThemedText>
        </View>
        <TouchableOpacity className="bg-secondary p-2 rounded-full border border-border">
          <MoreHorizontal size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* Feed List */}
      {MOCK_FEED.map((item) => (
        <View
          key={item.id}
          className="bg-card border border-border rounded-[40px] mb-8 overflow-hidden shadow-sm"
        >
          {/* Post Header */}
          <View className="flex-row items-center justify-between p-5">
            <View className="flex-row items-center">
              <Image
                source={{ uri: item.user.avatar }}
                className="w-10 h-10 rounded-full border border-border"
              />
              <View className="ml-3">
                <ThemedText className="text-sm font-black uppercase italic tracking-tight">
                  {item.user.name}
                </ThemedText>
                <View className="flex-row items-center">
                  <MapPin size={10} color="#64748b" />
                  <ThemedText className="text-[9px] font-bold text-muted-foreground ml-1 italic">
                    {item.location}
                  </ThemedText>
                </View>
              </View>
            </View>
            <ThemedText className="text-[9px] font-bold text-muted-foreground italic">
              {item.timeAgo}
            </ThemedText>
          </View>

          {/* Post Image with Glass Overlay for Stats */}
          <View className="px-4">
            <View className="relative">
              <Image
                source={{ uri: item.image }}
                className="w-full h-72 rounded-[30px]"
              />

              {item.type === "ACTIVITY" && (
                <View className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md rounded-2xl p-4 flex-row justify-between items-center border border-white/20">
                  <View className="items-center">
                    <ThemedText className="text-[8px] font-black text-white/70 uppercase">
                      Dist
                    </ThemedText>
                    <ThemedText className="text-sm font-black text-white italic">
                      {item?.stats?.distance}
                    </ThemedText>
                  </View>
                  <View className="w-px h-8 bg-white/20" />
                  <View className="items-center">
                    <ThemedText className="text-[8px] font-black text-white/70 uppercase">
                      Pace
                    </ThemedText>
                    <ThemedText className="text-sm font-black text-white italic">
                      {item?.stats?.pace}
                    </ThemedText>
                  </View>
                  <View className="w-px h-8 bg-white/20" />
                  <View className="items-center">
                    <ThemedText className="text-[8px] font-black text-white/70 uppercase">
                      Time
                    </ThemedText>
                    <ThemedText className="text-sm font-black text-white italic">
                      {item?.stats?.time}
                    </ThemedText>
                  </View>
                  <View className="bg-primary p-2 rounded-full">
                    <Zap size={14} color="white" fill="white" />
                  </View>
                </View>
              )}

              {item.type === "ACHIEVEMENT" && (
                <View className="absolute top-4 right-4 bg-orange-500 rounded-2xl p-3 flex-row items-center shadow-lg">
                  <Trophy size={16} color="white" />
                  <ThemedText className="ml-2 text-[10px] font-black text-white uppercase italic">
                    {item?.stats?.title}
                  </ThemedText>
                </View>
              )}
            </View>
          </View>

          {/* Post Content */}
          <View className="p-5">
            <ThemedText className="text-sm font-medium text-foreground/80 leading-5 mb-5 italic">
              {item.content}
            </ThemedText>

            {/* Interaction Bar */}
            <View className="flex-row justify-between items-center border-t border-border/50 pt-4">
              <View className="flex-row items-center gap-6">
                <TouchableOpacity className="flex-row items-center">
                  <Heart
                    size={20}
                    color="#ef4444"
                    fill={item.id === "1" ? "#ef4444" : "transparent"}
                  />
                  <ThemedText className="ml-1.5 text-xs font-bold text-muted-foreground">
                    {item.likes}
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                  <MessageCircle size={20} color="#64748b" />
                  <ThemedText className="ml-1.5 text-xs font-bold text-muted-foreground">
                    {item.comments}
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Share2 size={20} color="#64748b" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="bg-primary/10 px-4 py-2 rounded-xl border border-primary/20">
                <ThemedText className="text-[9px] font-black text-primary uppercase italic">
                  Buddy +
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default SocialFeed;
