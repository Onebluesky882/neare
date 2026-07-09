import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

export const Post = () => {
  return (
    <ThemedView className="flex-1 items-center justify-center absolute inset-0 bg-amber-400">
      <ThemedText>New Post</ThemedText>
    </ThemedView>
  );
};
