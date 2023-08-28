import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import StoryItem from "./StoryItem";

interface IStory {
  id: string;
  userName: string;
  assets: any[];
}

type PostsItemData = {
  index: number;
  item: IStory;
};

function renderExpenseItem(itemData: PostsItemData) {
  return (
    <StoryItem
      index={itemData.index}
      id={itemData.item.id}
      userName={itemData.item.userName}
      assets={itemData.item.assets}
    />
  );
}

type Props = {
  data: any;
};

function StoriesList(props: Props) {
  const { data } = props;
  console.log(data);

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 5
      }}
    >
      <FlashList
        data={data}
        keyExtractor={(item) => item.id!}
        renderItem={renderExpenseItem}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={800}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default StoriesList;
