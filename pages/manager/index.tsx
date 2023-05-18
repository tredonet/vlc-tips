import { Card, Tag } from "components";
import { useTips } from "hooks";
import { useAuth } from "hooks/useAuth";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { capitalize } from "utils";

const Manager: NextPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { token, username } = useAuth();
  const { tips, loadTips } = useTips();
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    loadTips(username);
  });

  return (
    <div className="flex flex-wrap gap-6 justify-between">
      {tips?.map((tip) => (
        <Card className="basis-80" title={tip.name}>
          <div className="border-b border-gray-200 pb-2">Kind: {tip.kind}</div>
          {tip.type &&
            Object.entries(tip.type).map(([key, val]: any) => (
              <div className="border-b border-gray-200 pb-2">
                {capitalize(key)}: {val}
              </div>
            ))}
          <div className="my-2">{tip.description}</div>
          <div className="flex flex-wrap my-1">
            {tip.tags.map((tag) => (
              <Tag text={tag} />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Manager;
