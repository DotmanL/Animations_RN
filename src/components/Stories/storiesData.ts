export interface IUserStory {
  id: string;
  userName: string;
  assets: any[];
}

export const UserStories: IUserStory[] = [
  {
    id: "sdsdasdasd",
    userName: "Ola",
    assets: [
      {
        story: require("./stories/story2.jpg"),
        type: "image"
      },
      {
        story: require("./stories/story1.jpg"),
        type: "image"
      },
      {
        story: require("./stories/story3.mp4"),
        type: "video"
      },
      {
        story: require("./stories/story2.jpg"),
        type: "image"
      },
      {
        story: require("./stories/story1.jpg"),
        type: "image"
      },
      {
        story: require("./stories/story3.mp4"),
        type: "video"
      }
    ]
  },
  {
    id: "abcdef",
    userName: "Ayodeji",
    assets: [
      {
        story: require("./stories/story1.jpg"),
        type: "image"
      },
      {
        story: require("./stories/story2.jpg"),
        type: "image"
      },
      {
        story: require("./stories/story3.mp4"),
        type: "video"
      },
      {
        story: require("./stories/story1.jpg"),
        type: "image"
      },
      {
        story: require("./stories/story2.jpg"),
        type: "image"
      },
      {
        story: require("./stories/story3.mp4"),
        type: "video"
      },
      {
        story: require("./stories/story1.jpg"),
        type: "image"
      },
      {
        story: require("./stories/story2.jpg"),
        type: "image"
      },
      {
        story: require("./stories/story3.mp4"),
        type: "video"
      }
    ]
  },
  {
    id: "dsasdaswe",
    userName: "Lanre",
    assets: [
      {
        story: require("./stories/story2.jpg"),
        type: "image"
      },
      {
        story: require("./stories/story3.mp4"),
        type: "video"
      },

      {
        story: require("./stories/story2.jpg"),
        type: "image"
      }
    ]
  },
  {
    id: "sdsdasdsasered",
    userName: "Nurus",
    assets: [
      {
        story: require("./stories/story1.jpg"),
        type: "image"
      },
      {
        story: require("./stories/story3.mp4"),
        type: "video"
      },

      {
        story: require("./stories/story2.jpg"),
        type: "image"
      }
    ]
  },
  {
    id: "abererercderereef",
    userName: "John",
    assets: [
      {
        story: require("./stories/story2.jpg"),
        type: "image"
      },
      {
        story: require("./stories/story3.mp4"),
        type: "video"
      },
      {
        story: require("./stories/story1.jpg"),
        type: "image"
      }
    ]
  }
];
