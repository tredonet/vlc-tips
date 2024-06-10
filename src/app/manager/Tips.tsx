"use client";
import { TipsListHeader, TipsListContainer, Tip, Button } from "@/components";
import { Tip as ITip } from "@/types";
import { useRouter } from "next/navigation";

export const Tips = ({ tips }: { tips: ITip[] }) => {
  const router = useRouter();
  const categories = Array.from(new Set(tips.map((tip) => tip.kind) || []));
  return categories.map((category) => {
    const filteredTips = tips.filter((tip) => tip.kind === category);
    return (
      <div key={category} className="flex flex-col gap-4">
        <TipsListHeader category={category} onClick={() => {}} />
        <TipsListContainer>
          {filteredTips.map((tip) => (
            <Tip
              key={tip.name}
              tip={tip}
              selected={false}
              onClick={() => router.push(`/manager/${tip._id}`)}
            />
          ))}
        </TipsListContainer>
      </div>
    );
  });
};

export const AddTip = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/manager/new")}
      className="bg-teal-500 h-min"
    >
      Add Tip
    </Button>
  );
};
