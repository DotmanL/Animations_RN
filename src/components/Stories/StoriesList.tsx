import StoryModal from "./StoryModal";
import { IUserStory } from "./storiesData";

type Props = {
  data: IUserStory[];
  userName: string;
  isModalVisible: boolean;
  activeStoryIndex: number;
  setActiveStoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function StoriesList(props: Props) {
  const {
    data,
    userName,
    activeStoryIndex,
    setActiveStoryIndex,
    isModalVisible,
    setIsModalVisible
  } = props;

  const activeIndexStoryAssets = data.find(
    (_, index) => index === activeStoryIndex
  );

  return (
    <>
      {!!activeIndexStoryAssets && (
        <>
          <StoryModal
            userName={userName}
            isModalVisible={
              activeStoryIndex >= 0 && isModalVisible ? true : false
            }
            allData={data}
            activeStoryIndex={activeStoryIndex}
            setActiveStoryIndex={setActiveStoryIndex}
            setIsModalVisible={setIsModalVisible}
            maxStoriesLength={data.length}
            stories={activeIndexStoryAssets.assets}
          />
        </>
      )}
    </>
  );
}

export default StoriesList;
