import { useRouter } from "expo-router";
import { ChevronRight, ShieldCheck, Users } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { ThemedText } from "@/components/themed-text";

// Mock — จำนวนคนใกล้เคียงแบบรวม (aggregate) ไม่ผูกกับ backend จริง
const MOCK_NEARBY = {
  totalCount: 48,
  radiusKm: 5,
  topActivities: [
    { label: "วิ่ง", count: 32 },
    { label: "ปั่นจักรยาน", count: 10 },
    { label: "โยคะ", count: 6 },
  ],
};

const NearbyPulse = () => {
  const router = useRouter();

  return (
    <View className="mt-10">
      <View className="flex-row justify-between items-end mb-5">
        <View>
          <ThemedText className="text-xl font-bold tracking-tight">
            คนใกล้คุณตอนนี้
          </ThemedText>
          <ThemedText className="text-xs text-muted-foreground mt-1">
            อัปเดตจากคนที่เปิดแอพอยู่ตอนนี้ ในรัศมี {MOCK_NEARBY.radiusKm} กม.
          </ThemedText>
        </View>
      </View>

      <Pressable
        onPress={() => router.push("/nearby")}
        className="bg-card border border-border rounded-3xl p-5 active:opacity-80"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-14 h-14 rounded-2xl bg-primary/10 items-center justify-center">
              <Users size={24} color="#2A7FFF" />
            </View>
            <View className="ml-4">
              <ThemedText className="text-2xl font-bold text-foreground">
                {MOCK_NEARBY.totalCount} คน
              </ThemedText>
              <ThemedText className="text-xs text-muted-foreground">
                กำลังทำกิจกรรมใกล้คุณ
              </ThemedText>
            </View>
          </View>
          <ChevronRight size={20} color="#94a3b8" />
        </View>

        {/* Activity breakdown chips */}
        <View className="flex-row flex-wrap mt-4 -mb-2">
          {MOCK_NEARBY.topActivities.map((activity) => (
            <View
              key={activity.label}
              className="bg-secondary/60 border border-border rounded-full px-3 py-1.5 mr-2 mb-2"
            >
              <ThemedText className="text-xs font-medium text-foreground">
                {activity.label} · {activity.count}
              </ThemedText>
            </View>
          ))}
        </View>

        {/* Privacy note */}
        <View className="flex-row items-center mt-3 pt-3 border-t border-border">
          <ShieldCheck size={13} color="#64748b" />
          <ThemedText className="ml-1.5 text-[11px] text-muted-foreground">
            แสดงผลแบบรวมกลุ่มเท่านั้น ไม่ระบุตัวตนรายบุคคล
          </ThemedText>
        </View>
      </Pressable>
    </View>
  );
};

export default NearbyPulse;
