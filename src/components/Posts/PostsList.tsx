import { useScrollToTop } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { Text } from "react-native";
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

function PostsList() {
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
      ref={listRef}
      data={posts}
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
