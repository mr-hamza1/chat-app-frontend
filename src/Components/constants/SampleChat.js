import moment from "moment";

export const SampleChats = [{
    name: 'John Doe',
    _id: '1',
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    groupChat: false,
    members: ['1', '2'],
},

{
    name: 'John boi',
    _id: '2',
    avatar: ["https://www.w3schools.com/howto/img_avatar.png",
        "https://www.w3schools.com/howto/img_avatar.png",
        "https://www.w3schools.com/howto/img_avatar.png",
        "https://www.w3schools.com/howto/img_avatar.png"
    ],
    groupChat: true,
    members: ['1', '2','3'],
},
];

export const SampleUsers = [{
    name: 'John Doe',
    _id: '1',
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
},
{
    name: 'John boi',
    _id: '2',
    avatar: ["https://www.w3schools.com/howto/img_avatar.png" ],
},
{
    name: 'John boi',
    _id: '3',
    avatar: ["https://www.w3schools.com/howto/img_avatar.png" ],
},
{
    name: 'John boi',
    _id: '4',
    avatar: ["https://www.w3schools.com/howto/img_avatar.png" ],
},
{
    name: 'John boi',
    _id: '5',
    avatar: ["https://www.w3schools.com/howto/img_avatar.png" ],
},
{
    name: 'John boi',
    _id: '6',
    avatar: ["https://www.w3schools.com/howto/img_avatar.png" ],
},
];

export const SampleNotifications = [{
    sender: {
        name: 'John Doe',
    _id: '1',
   },
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
},
{
    sender: {
    name: 'John boi',
    _id: '2',},
    avatar: ["https://www.w3schools.com/howto/img_avatar.png" ],
},
];

export const SampleMessage = [
  {
    attachments: [
      {
        public_id: "asdsad 2",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "how are you?",
    _id: "sfnsdjkfsdnfkdjkfs",
    sender: {
      _id: "user._id",
      name: "john Boi ",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },

  {
    attachments: [
      {
        public_id: "asdsad 2",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "",
    _id: "sfnsdjkfsdnfkddfdfddjsbnd",
    sender: {
      _id: "abcd",
      name: "John Doe",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },
  {
    attachments: [

    ],
    content: " i am fine",
    _id: "sfnsdjkfsdnfkdddjsbdfmlkfljkfsdnd",
    sender: {
      _id: "abcd",
      name: "John Doe",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },
  {
    attachments: [

    ],
    content: " fdk fdofsj fodo dof dkfd kfde  kd fd f ddj domfd ",
    _id: "sfnsdjkfsdnfkdjkfsddjsbnd",
    sender: {
      _id: "abcd",
      name: "John Doe",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },

 
];

export const dashboardData = {
  users: [
    {
      name: "John Doe",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "1",
      username: "john_doe",
      friends: 20,
      groups: 5,
            joinedAt: moment().format('ddd,MM,yy, HH:mm:ss')
    },
    {
      name: "John Boi",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "2",
      username: "john_boi",
      friends: 20,
      groups: 25,
            joinedAt: moment().format('ddd,MM,yy, HH:mm:ss')

    },
  ],
  
  chats: [
    {
      name: "Coding Group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "John Doe",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      name: "Programmers MERN STACK Group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "2",
      groupChat: true,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "John Boi",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
  ],

  messages: [
    {
      attachments: [],
      content: "how are you",
      _id: "sfnsdjkfsdnfkjsbnd",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "john boi ",
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2024-02-12T10:41:30.630Z",
    },

    {
      attachments: [
        {
          public_id: "asdsad 2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "hi i m fine",
      _id: "sfnsdjkfsdnfkdddjsbnd",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "john doe",
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2024-02-12T10:41:30.630Z",
    },
  ],
  

}
