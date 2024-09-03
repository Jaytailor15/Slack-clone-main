"use client"

import { UserButton } from "@/features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useRouter } from "next/navigation";

import { useEffect, useMemo } from "react";

export default function Home() {

  const router = useRouter();

  const [open, setOpen] = useCreateWorkspaceModal();
  const {data, isLoading} = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(()=> {
    if(isLoading) return;

    if(workspaceId){
      router.replace(`/workspace/${workspaceId}`);
      console.log("Redirect to workspace");
    }else if (!open){
      setOpen(true);
    }
  },[workspaceId, isLoading, open, setOpen, router])

  return (
    <div>
      <UserButton/>
    </div>
  );
}
