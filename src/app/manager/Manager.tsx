"use client";
import { TipsListHeader, TipsListContainer, Tip, Button } from "@/components";
import { Tip as ITip } from "@/types";
import { useRouter } from "next/navigation";
import logout from "./logout";

export function Manager({ tips }: { tips: ITip[] }) {
  const router = useRouter();
  const categories = Array.from(new Set(tips.map((tip) => tip.kind) || []));
  return (
    <div className="flex gap-16 w-full h-screen bg-slate-600 justify-center p-4">
      {categories.map((category) => {
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
      })}

      <Button
        onClick={() => router.push("/manager/new")}
        className="bg-teal-500 h-min"
      >
        Add Tip
      </Button>

      <form action={logout}>
        <button className="bg-red-500 text-white p-2 rounded" type="submit">
          Logout{" "}
        </button>
      </form>
    </div>
  );
}
