import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { server } from '../../Components/constants/congfig.js';


const api = createApi({

    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
    tagTypes: ["Chat", "User", "Message","Admin"],                                            /// to used cashe  data 
    
    endpoints: (builder) => ({     /// in query (get) we use providesTags but in mutation (post, put ,delete)  we  used invalidateTags

        myChats: builder.query({
            query: () => ({
                url: "chat/my",
                credentials: "include",
            }),
            providesTags: ["Chat"],
        }),

        searchUser: builder.query({
            query: (name) => ({
                url: `user/search?name=${name}`,
                credentials: "include",
            }),
            providesTags: ["User"],
        }),

        sendRequest: builder.mutation({
            query: (data) => ({
                url: `user/sendrequest`,
                method: "PUT",
                credentials: "include",
                body: data,
            }),
            invalidateTag: ["User"],
        }),

        getNotifications: builder.query({
            query: () => ({
                url: `user/notifications`,
                credentials: "include",
            }),
            keepUnusedDataFor: 0,
        }),
 
          
        acceptFriendRequest: builder.mutation({
            query: (data) => ({
                url: `user/acceptrequest`,
                method: "PUT",
                credentials: "include",
                body: data,
            }),
            invalidateTag: ["Chat"],
        }),

        chatDetails: builder.query({
            query: ({ chatId, populate = false }) => {

                let url = `chat/${chatId}`;
                if (populate) url += "?populate=true";
                return {
                    url,
                    credentials: "include",
                }
            },
            providesTags: ["Chat"],
        }),

        getMessages: builder.query({
            query: ({ chatId, page}) => ({
                url: `chat/message/${chatId}?page=${page}`,
                credentials: "include",
            }),
            keepUnusedDataFor: 0,
        }),  
        
        sendAttachement: builder.mutation({
            query: (data) => ({
                url: `chat/message`,
                method: "POST",
                credentials: "include",
                body: data,
            }),
        }),

        myGroups: builder.query({    //// start group api's from here
            query: () => ({
                url: "chat/my/groups",
                credentials: "include",
            }),
            providesTags: ["Chat"],
        }),

        availableFriends: builder.query({
            query: (chatId) => {
              let url = `user/friends`;
              if (chatId) url += `?chatId=${chatId}`;
      
              return {
                url,
                credentials: "include",
              };
            },
            providesTags: ["Chat"],
          }),

        newGroup: builder.mutation({
            query: ({name, members}) => ({
                url: `chat/new`,
                method: "POST",
                credentials: "include",
                body: {name, members},
            }),
            invalidateTag: ["Chat"],
        }),

        renameGroup: builder.mutation({
            query: ({chatId, name}) => ({
                url: `chat/${chatId}`,
                method: "PUT",
                credentials: "include",
                body: {name},
            }),
            invalidateTag: ["Chat"],

        }),

        removeGroupMember: builder.mutation({
            query: ({chatId, userId}) => ({
                url: `chat/removeMember`,
                method: "DELETE",
                credentials: "include",
                body: {chatId, userId},
            }),
            invalidateTag: ["Chat"],

        }),

        addGroupMember: builder.mutation({
            query: ({ members, chatId}) => ({
                url: `chat/addMembers`,
                method: "PUT",
                credentials: "include",
                body: { members, chatId},
            }),
            invalidateTag: ["Chat"],

        }),

        deleteChat: builder.mutation({
            query: (chatId) => ({
                url: `chat/${chatId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidateTag: ["Chat"],

        }),

        leaveGroup: builder.mutation({
            query: (chatId) => ({
                url: `chat/leaveGroup/${chatId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidateTag: ["Chat"],

        }),

        adminStats: builder.query({ 
            query: () => ({
                url: "admin/stats",
                credentials: "include",
            }),
            providesTags: ["Admin"],
        }),

        adminUsers: builder.query({ 
            query: () => ({
                url: "admin/Users",
                credentials: "include",
            }),
            providesTags: ["Admin"],
        }),

        adminChats: builder.query({ 
            query: () => ({
                url: "admin/chats",
                credentials: "include",
            }),
            providesTags: ["Admin"],
        }),

        adminMessages: builder.query({ 
            query: () => ({
                url: "admin/messages",
                credentials: "include",
            }),
            providesTags: ["Admin"],
        }),




    })


});


export default api;

export const {
    useMyChatsQuery,
    useLazySearchUserQuery,
    useSendRequestMutation,
    useGetNotificationsQuery,
    useAcceptFriendRequestMutation,
    useChatDetailsQuery,
    useGetMessagesQuery,
    useSendAttachementMutation,
    useMyGroupsQuery,
    useAvailableFriendsQuery,
    useNewGroupMutation,
    useRenameGroupMutation,
    useRemoveGroupMemberMutation,
    useAddGroupMemberMutation,
    useDeleteChatMutation,
    useLeaveGroupMutation,
    useAdminStatsQuery,
    useAdminUsersQuery,
    useAdminChatsQuery,
    useAdminMessagesQuery,
 } = api;

