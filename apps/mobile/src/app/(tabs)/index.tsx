import { FriendStories, MenuPage, UserProfile } from "@/components/homepage";
import SocialFeed from "@/components/homepage/SocialFeed";
import TrendingSports from "@/components/homepage/TrendingSports";
import { ThemedView } from "@/components/themed-view";
import { usePostImage } from "@/hooks/post/use-post-image";
import { useTheme } from "@/hooks/use-theme";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const [newPost, setNewPost] = useState(false);
  const [newPostImage, setNewPostImage] = useState(false);
  const { pickImage } = usePostImage();
  useEffect(() => {
    if (newPost) {
      router.replace("/post/new-post");
    }

    if (newPostImage) {
      pickImage();
      router.replace("/post/post-image");
    }
  }, [newPost, newPostImage]);
  const theme = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false} // ซ่อนแถบเลื่อนเพื่อให้ดูพรีเมียม
        contentContainerStyle={{ flexGrow: 1 }} // ช่วยให้เนื้อหาขยายได้เต็มที่
      >
        <ThemedView className=" relative px-4  flex-1 bg-slate-50 dark:bg-[#0f172a]">
          <MenuPage />
          {/* --- Section 1: User Profile & Location --- */}
          <UserProfile
            newPost={() => setNewPost(true)}
            newPostImage={() => setNewPostImage(true)}
          />
          {/* --- Section 2: Stories (Short Activity Clips) --- */}
          <FriendStories />
          {/* --- Section 3: Trending Sports --- */}
          <TrendingSports />

          <SocialFeed />
          {/* --- will remove --- */}
          {/* --- Section 4: Local Pulse (Community Activity) --- */}
          {/* <LocalPules /> */}
          {/* --- Section 5: Local Feed (Posts & Updates) --- */}
          {/* <LocalFeed /> */}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
