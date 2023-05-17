import { Card, Tag } from "components";
import tip from "pages/api/tip";
import { Tip } from "types";
import { capitalize } from "utils";

interface EditTipProps {
  tip: Tip;
  show?: boolean;
  setShow: (show: boolean) => void;
}
export const EditTip = ({ tip }) => {
  return (
    <Card className="basis-80" title="Edit Tip">
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
  );
};
