import { useTheme } from "@/hooks/use-theme";
import { Menu, MessageCircleMore, Plus } from "lucide-react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

export const MenuPage = () => {
  const theme = useTheme();
  return (
    <ThemedView className="flex-row justify-between items-center gap-2 align-middle  w-full py-4 -mt-4 ">
      <ThemedView className="flex-row items-center gap-2">
        <Menu size={24} color={theme.icon} />
        <ThemedText className="text-lg font-extrabold">Snackig</ThemedText>
      </ThemedView>
      <ThemedView className="flex-row items-center gap-2">
        <Plus size={24} color={theme.icon} />
        <MessageCircleMore size={24} color={theme.icon} />
      </ThemedView>
    </ThemedView>
  );
};
