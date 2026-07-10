import { useRouter } from "expo-router";
import { ShieldCheck, Users, X } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { ThemedText } from "@/components/themed-text";

// พิกัดใจกลางสวนลุมพินี — จุดเริ่มต้นของแผนที่ (ตัวอย่าง)
const MAP_CENTER = {
  latitude: 13.7303,
  longitude: 100.5417,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const RADIUS_OPTIONS_KM = [1, 5, 10, 20, 30] as const;

type ActivityBreakdown = { label: string; count: number };

type NearbyPoi = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  count: number;
  activities: ActivityBreakdown[];
  updatedMinsAgo: number;
};

// Mock — จุดรวมตัวแบบ aggregate เท่านั้น ไม่มีตำแหน่งรายบุคคล/avatar
// จำนวนจุดที่แสดง ผูกกับรัศมีที่เลือก (รัศมีเล็ก = เห็นน้อยจุด, สะท้อนของจริงตอนผู้ใช้ยังน้อย)
const MOCK_POIS: NearbyPoi[] = [
  {
    id: "lumpini",
    name: "สวนลุมพินี",
    latitude: 13.7303,
    longitude: 100.5417,
    count: 48,
    activities: [
      { label: "วิ่ง", count: 32 },
      { label: "ปั่นจักรยาน", count: 10 },
      { label: "โยคะ", count: 6 },
    ],
    updatedMinsAgo: 3,
  },
  {
    id: "benchakitti",
    name: "สวนเบญจกิติ",
    latitude: 13.7228,
    longitude: 100.5602,
    count: 21,
    activities: [
      { label: "วิ่ง", count: 15 },
      { label: "เดิน", count: 6 },
    ],
    updatedMinsAgo: 6,
  },
  {
    id: "suphachalasai",
    name: "สนามศุภชลาศัย",
    latitude: 13.7466,
    longitude: 100.5291,
    count: 9,
    activities: [
      { label: "วิ่ง", count: 5 },
      { label: "ฟุตบอล", count: 4 },
    ],
    updatedMinsAgo: 12,
  },
];

// จุดที่มีคนน้อยกว่าเกณฑ์นี้ จะไม่แสดงเป็นตัวเลขตรงๆ (ตัวอย่าง privacy rule จาก SECURITY_RULES.md)
const MIN_BUCKET_SIZE = 3;

// ขนาด blob บนแผนที่ตามจำนวนคน (aggregate) — ไม่ใช่ pin รายบุคคล
function densityBlobSize(count: number): number {
  return Math.min(64, 28 + count * 0.6);
}

function poisWithinRadius(radiusKm: number): NearbyPoi[] {
  // Mock ง่ายๆ: รัศมียิ่งเล็ก ยิ่งเห็นจุดน้อยลง (จำลองพฤติกรรมของข้อมูลจริง)
  const visibleCount =
    radiusKm <= 1 ? 1 : radiusKm <= 10 ? 2 : MOCK_POIS.length;
  return MOCK_POIS.slice(0, visibleCount).filter(
    (poi) => poi.count >= MIN_BUCKET_SIZE
  );
}

const NearbyMap = () => {
  const router = useRouter();
  const [radiusKm, setRadiusKm] = useState<number>(5);
  const [selectedPoi, setSelectedPoi] = useState<NearbyPoi | null>(null);

  const visiblePois = useMemo(() => poisWithinRadius(radiusKm), [radiusKm]);

  const handleClose = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)");
    }
  };

  return (
    <View className="flex-1 bg-background">
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        initialRegion={MAP_CENTER}
        onPress={() => setSelectedPoi(null)}
      >
        {visiblePois.map((poi) => {
          const size = densityBlobSize(poi.count);
          return (
            <Marker
              key={poi.id}
              coordinate={{ latitude: poi.latitude, longitude: poi.longitude }}
              onPress={() => setSelectedPoi(poi)}
              tracksViewChanges={false}
            >
              <View
                style={{ width: size, height: size, borderRadius: size / 2 }}
                className="bg-primary/25 border-2 border-primary items-center justify-center"
              >
                <ThemedText className="text-[10px] font-bold text-primary">
                  {poi.count}
                </ThemedText>
              </View>
            </Marker>
          );
        })}
      </MapView>

      <SafeAreaView className="absolute top-0 left-0 right-0" edges={["top"]}>
        {/* Top bar */}
        <View className="flex-row justify-between items-center mx-4 mt-2 bg-card/95 border border-border rounded-2xl px-4 py-3">
          <View>
            <ThemedText className="text-base font-bold text-foreground">
              คนใกล้คุณ
            </ThemedText>
            <View className="flex-row items-center mt-0.5">
              <ShieldCheck size={11} color="#64748b" />
              <ThemedText className="ml-1 text-[10px] text-muted-foreground">
                แสดงแบบรวมกลุ่ม ไม่ระบุตัวตน
              </ThemedText>
            </View>
          </View>
          <Pressable
            onPress={handleClose}
            className="w-9 h-9 rounded-full bg-secondary items-center justify-center"
          >
            <X size={18} />
          </Pressable>
        </View>

        {/* Radius selector — 1–30 กม. */}
        <View className="flex-row bg-card/95 border border-border rounded-full mx-4 mt-3 p-1 self-start">
          {RADIUS_OPTIONS_KM.map((km) => (
            <Pressable
              key={km}
              onPress={() => {
                setRadiusKm(km);
                setSelectedPoi(null);
              }}
              className={`px-3.5 py-2 rounded-full ${radiusKm === km ? "bg-primary" : ""}`}
            >
              <ThemedText
                className={`text-xs font-semibold ${radiusKm === km ? "text-white" : "text-muted-foreground"}`}
              >
                {km} กม.
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </SafeAreaView>

      {/* Bottom card: sparse-state or selected POI or default summary */}
      <SafeAreaView className="absolute bottom-0 left-0 right-0" edges={["bottom"]}>
        <View className="mx-4 mb-4 bg-card border border-border rounded-3xl p-5 shadow-lg">
          {visiblePois.length === 0 ? (
            <View className="items-center py-2">
              <ThemedText className="text-sm font-semibold text-foreground">
                ยังไม่มีคนเปิดแอพอยู่แถวนี้
              </ThemedText>
              <ThemedText className="text-xs text-muted-foreground mt-1 text-center">
                ลองขยายรัศมีการค้นหาดู หรือกลับมาเช็คใหม่อีกครั้ง
              </ThemedText>
            </View>
          ) : selectedPoi ? (
            <View>
              <View className="flex-row items-center justify-between">
                <ThemedText className="text-lg font-bold text-foreground">
                  {selectedPoi.name}
                </ThemedText>
                <View className="flex-row items-center bg-primary/10 rounded-full px-3 py-1">
                  <Users size={12} color="#2A7FFF" />
                  <ThemedText className="ml-1 text-xs font-bold text-primary">
                    ~{selectedPoi.count} คน
                  </ThemedText>
                </View>
              </View>
              <View className="flex-row flex-wrap mt-3">
                {selectedPoi.activities.map((activity) => (
                  <View
                    key={activity.label}
                    className="bg-secondary/60 rounded-full px-3 py-1.5 mr-2 mb-2"
                  >
                    <ThemedText className="text-xs text-foreground">
                      {activity.label} · {activity.count}
                    </ThemedText>
                  </View>
                ))}
              </View>
              <ThemedText className="text-[11px] text-muted-foreground mt-1">
                อัปเดตล่าสุด {selectedPoi.updatedMinsAgo} นาทีที่แล้ว
              </ThemedText>
            </View>
          ) : (
            <View className="flex-row items-center justify-between">
              <View>
                <ThemedText className="text-sm font-semibold text-foreground">
                  แตะจุดสีฟ้าบนแผนที่
                </ThemedText>
                <ThemedText className="text-xs text-muted-foreground mt-0.5">
                  ดูว่าคนกำลังทำกิจกรรมอะไรอยู่แถวนั้น
                </ThemedText>
              </View>
              <View className="flex-row items-center">
                <Users size={14} color="#94a3b8" />
                <ThemedText className="ml-1 text-xs text-muted-foreground">
                  {visiblePois.length} จุด
                </ThemedText>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default NearbyMap;
