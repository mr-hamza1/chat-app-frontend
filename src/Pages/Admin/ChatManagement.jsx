import { Avatar, Skeleton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../Components/layout/AdminLayout";
import AvatarCard from "../../Components/shared/AvatarCard";
import Table from "../../Components/shared/Table";
import { useErrors } from "../../Hooks/hook";
import { transformImage } from "../../Lib/features";
import { useAdminChatsQuery } from "../../redux/api/api";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  },

  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },

  {
    field: "groupChat",
    headerName: "Group",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];

const ChatManagement = () => {


  const {isLoading, data , isError, error} = useAdminChatsQuery()
     

      useErrors([
          {
              isError,
              error,
          }
      ])
 

  const [rows, setRows] = useState([]);

    useEffect(() => {
     if(data){
      setRows(
        data?.chats?.map((i) => ({
          ...i,
          id: i._id,
          key : i._id,
          avatar: i.avatar.map((i) => transformImage(i, 50)),
          members: i.members.map((i) => transformImage(i.avatar, 50)),
          creator: {
            name: i.creator.name,
            avatar: transformImage(i.creator.avatar, 50),
          },
        }))
      );
     }
   
  },[data]);

  return (
    <AdminLayout>
 {isLoading ? (
        <Skeleton height={"100vh"} />
      ) :
   
(        <Table heading={"All Chats"} columns={columns} rows={rows} />
)  
  }
    </AdminLayout>
  );
};

export default ChatManagement;