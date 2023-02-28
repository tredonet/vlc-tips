import { useAuth } from "hooks/useAuth";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Manager: NextPage = () => {
  const { token } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if(!token) router.push('/login');
  });

  return <div> Manager!</div>;
};

export default Manager;
