// app/(tabs)/_layout.tsx

import { useTheme } from "@/hooks/use-theme";
import { Tabs } from "expo-router";
import { House, MessageCircle, Plus, Trophy, Users } from "lucide-react-native";

import { Pressable, useWindowDimensions, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs";
import { createContext, useContext, useState } from "react";

const TAB_BAR_WIDTH = 320;

/* -------------------------------------------------------------------------- */
/*                                   CONTEXT                                  */
/* -------------------------------------------------------------------------- */

type TabBarContextType = {
  hideBottomTab: boolean;
  setHideBottomTab: (value: boolean) => void;
};

const TabBarContext = createContext<TabBarContextType>({
  hideBottomTab: false,
  setHideBottomTab: () => {},
});

export const useBottomTab = () => useContext(TabBarContext);

/* -------------------------------------------------------------------------- */
/*                              FLOATING TAB BAR                              */
/* -------------------------------------------------------------------------- */

function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const theme = useTheme();

  const { hideBottomTab } = useBottomTab();

  const { width: screenWidth } = useWindowDimensions();

  const barWidth = Math.min(TAB_BAR_WIDTH, screenWidth - 32);

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: "absolute",

        bottom: Math.max(insets.bottom - 26),

        left: (screenWidth - barWidth) / 2,

        width: barWidth,

        height: 58,

        borderRadius: 24,

        backgroundColor: theme.menuBackground,

        flexDirection: "row",

        alignItems: "center",

        overflow: "visible",

        elevation: 10,

        shadowColor: "#000",

        shadowOffset: {
          width: 0,
          height: 8,
        },

        shadowOpacity: 0.15,

        shadowRadius: 16,

        transform: [
          {
            translateY: hideBottomTab ? 120 : 0,
          },
        ],

        opacity: hideBottomTab ? 0 : 1,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const focused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name as never);
          }
        };

        const icon = options.tabBarIcon?.({
          focused,
          color: focused ? theme.greenSport : theme.menuIcon,
          size: 22,
        });

        // CENTER BUTTON
        if (route.name === "workout/index") {
          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={{
                width: 72,

                alignItems: "center",

                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 54,

                  height: 54,

                  borderRadius: 999,

                  backgroundColor: theme.greenSport,

                  justifyContent: "center",

                  alignItems: "center",

                  marginBottom: 22,

                  shadowColor: theme.greenSport,

                  shadowOpacity: 0.4,

                  shadowRadius: 14,

                  elevation: 12,
                }}
              >
                {icon}
              </View>
            </Pressable>
          );
        }

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={{
              flex: 1,

              height: "100%",

              alignItems: "center",

              justifyContent: "center",
            }}
          >
            <View
              style={{
                padding: 8,

                borderRadius: 999,

                backgroundColor: focused
                  ? "rgba(255,255,255,0.08)"
                  : "transparent",
              }}
            >
              {icon}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  TAB LAYOUT                                */
/* -------------------------------------------------------------------------- */

export default function TabLayout() {
  const [hideBottomTab, setHideBottomTab] = useState(false);

  return (
    <TabBarContext.Provider
      value={{
        hideBottomTab,
        setHideBottomTab,
      }}
    >
      <Tabs
        tabBar={(props) => <FloatingTabBar {...props} />}
        screenOptions={{
          headerShown: false,

          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ size, color }) => (
              <House size={size} color={color} strokeWidth={2.5} />
            ),
          }}
        />

        <Tabs.Screen
          name="clubs"
          options={{
            tabBarIcon: ({ size, color }) => (
              <Users size={size} color={color} strokeWidth={2.5} />
            ),
          }}
        />

        <Tabs.Screen
          name="workout"
          options={{
            tabBarIcon: () => <Plus size={24} color="#000" strokeWidth={2.5} />,
          }}
        />

        <Tabs.Screen
          name="ranking"
          options={{
            tabBarIcon: ({ size, color }) => (
              <Trophy size={size} color={color} strokeWidth={2.5} />
            ),
          }}
        />

        <Tabs.Screen
          name="webboard"
          options={{
            tabBarIcon: ({ size, color }) => (
              <MessageCircle size={size} color={color} strokeWidth={2.5} />
            ),
          }}
        />
      </Tabs>
    </TabBarContext.Provider>
  );
}
