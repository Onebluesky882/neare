import { ThemedText } from "@/components/themed-text";
import { MapPin, Navigation, Users, X } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";

const { width, height } = Dimensions.get("window");

// พิกัดใจกลางสวนลุมพินี (ตัวอย่าง)
const PARK_CENTER = {
  latitude: 13.7303,
  longitude: 100.5417,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

// ฟังก์ชันจำลองนักวิ่ง 50 คนรอบสวน
const generateRunners = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `runner-${i}`,
    latitude: PARK_CENTER.latitude + (Math.random() - 0.5) * 0.008,
    longitude: PARK_CENTER.longitude + (Math.random() - 0.5) * 0.008,
    sport: Math.random() > 0.5 ? "Running" : "Cycling",
    avatar: `https://i.pravatar.cc/100?u=${i}`,
  }));
};

export const LiveSportMap = ({ onClose }: { onClose: () => void }) => {
  const runners = useMemo(() => generateRunners(50), []);
  const [selectedRunner, setSelectedRunner] = useState<any>(null);

  return (
    <View className="flex-1 bg-[#0f172a]">
      {/* --- Map View --- */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        initialRegion={PARK_CENTER}
        customMapStyle={mapDarkStyle} // ปรับสไตล์แมพเป็น Dark Blue
      >
        {/* วงเงินแสดงเขตสวนสาธารณะ */}
        <Circle
          center={PARK_CENTER}
          radius={400}
          fillColor="rgba(42, 127, 255, 0.1)"
          strokeColor="rgba(42, 127, 255, 0.3)"
          strokeWidth={2}
        />

        {/* แสดงนักวิ่ง 50 คน */}
        {runners.map((runner) => (
          <Marker
            key={runner.id}
            coordinate={{
              latitude: runner.latitude,
              longitude: runner.longitude,
            }}
            onPress={() => setSelectedRunner(runner)}
            tracksViewChanges={false} // สำคัญ! ช่วยให้ลื่นไหล ประหยัดแบต
          >
            <View className="items-center justify-center">
              {/* Pulse Effect จางๆ */}
              <View className="absolute w-8 h-8 bg-primary/20 rounded-full animate-pulse" />
              <View
                className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${runner.sport === "Running" ? "bg-orange-500" : "bg-blue-500"}`}
              />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* --- UI Overlays --- */}

      {/* 1. Top Bar: Park Info */}
      <View className="absolute top-14 left-6 right-6 flex-row justify-between items-center bg-[#1e293b]/90 p-4 rounded-[30px] border border-slate-700 backdrop-blur-md">
        <View className="flex-row items-center">
          <View className="bg-primary/20 p-2 rounded-full">
            <MapPin size={20} color="#2A7FFF" />
          </View>
          <View className="ml-3">
            <ThemedText className="text-white font-black italic uppercase tracking-tighter">
              Lumpini Park
            </ThemedText>
            <View className="flex-row items-center">
              <Users size={12} color="#94a3b8" />
              <ThemedText className="ml-1 text-[10px] font-bold text-slate-400 uppercase">
                52 Athletes Online
              </ThemedText>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={onClose} className="p-2">
          <X size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* 2. Bottom Card: Selected Runner / Quick Join */}
      <View className="absolute bottom-10 left-6 right-6">
        {selectedRunner ? (
          <View className="bg-white dark:bg-[#1e293b] p-6 rounded-[40px] shadow-2xl flex-row items-center border border-primary/20">
            <Image
              source={{ uri: selectedRunner.avatar }}
              className="w-16 h-16 rounded-[22px] border-2 border-primary"
            />
            <View className="ml-4 flex-1">
              <ThemedText className="text-lg font-black italic uppercase text-primary leading-tight">
                Buddy Match!
              </ThemedText>
              <ThemedText className="text-xs font-bold text-slate-500 uppercase">
                {selectedRunner.sport} • 200m away
              </ThemedText>
              <TouchableOpacity className="mt-2 bg-primary self-start px-6 py-2 rounded-full">
                <ThemedText className="text-white font-black text-[10px] uppercase italic">
                  Say Hi!
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="bg-primary p-6 rounded-[40px] shadow-2xl items-center flex-row justify-between overflow-hidden">
            <View className="absolute -right-5 -top-5 w-24 h-24 bg-white/10 rounded-full" />
            <View>
              <ThemedText className="text-white text-xl font-black italic uppercase tracking-tighter">
                Start Group Run
              </ThemedText>
              <ThemedText className="text-white/70 text-xs font-bold uppercase tracking-widest italic">
                Join 12 others in 15 mins
              </ThemedText>
            </View>
            <TouchableOpacity className="bg-white p-4 rounded-full">
              <Navigation size={24} color="#2A7FFF" fill="#2A7FFF" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

// สไตล์แมพสีเข้ม (Midnight Blue) เพื่อประหยัดพลังงานจอ OLED และดูทันสมัย
const mapDarkStyle = [
  { elementType: "geometry", stylers: [{ color: "#0f172a" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#475569" }] },
  {
    feature: "water",
    elementType: "geometry",
    stylers: [{ color: "#1e293b" }],
  },
  {
    feature: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#1e293b" }],
  },
  // ... (คุณสามารถนำ JSON สไตล์จาก SnazzyMaps มาใส่ที่นี่ได้)
];
