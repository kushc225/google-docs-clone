"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

import FullScreenLoader from "@/components/fullscreen-loader";
import { getUser, getDocuments } from "./actions";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";
type User  = {id : string, name : string, avatar : string, color : string}
export function Room({ children }: { children: ReactNode }) {
    const params = useParams()

    const [users, setUsers] =  useState<User[]>([]);
    const fetchUsers = useMemo(() => async () => { 
      try {
        const list = await getUser()
        setUsers(list);
      } catch (error) {
        console.error(error)
        toast.error("Failed to fetch User")
      }
    }, [])

  useEffect(() => {
    fetchUsers()
  },[fetchUsers])
  return (
    <LiveblocksProvider
    throttle={16}
    authEndpoint={async () => {
        const endpoint = '/api/liveblocks-auth';
        const room = params.documentId as string;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ room }),
        });
        return response.json(); 
    }}
    resolveUsers={({userIds}) => {
      return userIds.map((UserId) => users.find((user) => user.id === UserId)) ?? undefined;
    }}
    resolveMentionSuggestions={({text}) => {
      let filteredUsers = users;
      if(text) {
        filteredUsers = users.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()))
      }

      return filteredUsers.map((user) => user.id);
    }}
    resolveRoomsInfo={ async ({roomIds}) => {
      const documents = await getDocuments(roomIds as Id<"documents">[])
      return documents.map((document) => ({id : document.id, name : document.name}));
    }}
    >
      <RoomProvider id={params.documentId as string} initialStorage={{leftMargin : 56, rightMargin : 56}}>
        <ClientSideSuspense fallback={<div><FullScreenLoader label="Room Loading..." /></div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}