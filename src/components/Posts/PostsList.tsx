import { useScrollToTop } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StoryItem from "components/Stories/StoryItem";
import { useRef } from "react";
import { Animated, Text } from "react-native";
import PostItem from "./PostItem";

interface IPost {
  albumId: string;
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
}

async function fetchPosts() {
  const posts = await axios.get("https://jsonplaceholder.typicode.com/photos");
  return posts.data;
}

type PostsItemData = {
  item: IPost;
};

function renderExpenseItem(itemData: PostsItemData) {
  return (
    <PostItem
      id={itemData.item.id!}
      title={itemData.item.title}
      url={itemData.item.url}
    />
  );
}

type Props = {
  scrollY: any;
};

function PostsList(props: Props) {
  const { scrollY } = props;
  const {
    isLoading,
    error,
    data: posts
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => await fetchPosts()
  });

  const listRef = useRef(null);

  useScrollToTop(listRef);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{(error as Error)?.message}</Text>;
  }

  return (
    <FlashList
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
          useNativeDriver: false
        }
      )}
      ref={listRef}
      data={posts}
      ListHeaderComponent={<StoryItem />}
      removeClippedSubviews
      keyExtractor={(item) => item.id!}
      renderItem={renderExpenseItem}
      showsVerticalScrollIndicator={false}
      estimatedItemSize={800}
      // initialNumToRender={5}
    />
  );
}

export default PostsList;
