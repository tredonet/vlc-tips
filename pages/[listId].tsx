import { useTips } from "hooks";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ListId: NextPage = () => {
  const router = useRouter();
  const { listId } = router.query;
  const { setListId, reloadTips } = useTips();
  useEffect(() => {
    setListId(listId?.toString() || "");
    reloadTips();
    router.push("/");
  });
  return <div> List ID: {listId}</div>;
};

export default ListId;
