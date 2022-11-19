import { useState } from "react";
import { useLocation } from "hooks";
import { Location } from "types";
import { uniqueValues } from "utils";

export const TipsList: React.FC = () => {
    const { locations } = useLocation();
    if (!locations) return <></>;
    const categories = uniqueValues(locations.map(loc => loc.kind));
    return <>
        {categories.map(category =>
            <div className='my-4'>
                <List title={category} items={locations.filter(location => location.kind === category)} />
            </div>)}
    </>
}

const List: React.FC<{ title: string, items: Location[] }> = ({ title, items }) => {
    const { selectedLocation, setSelectedLocation } = useLocation();
    const [open, setOpen] = useState<Boolean>(true);
    const onToggle = () => setOpen(x => !x);
    return <div className='flex justify-center'>
        <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
            <li className='px-6 py-2 border-b border-gray-200 w-full' onClick={onToggle}>{title}</li>
            {open && items.map(item => <li className={
                `px-6 py-2 border-b border-gray-200 w-full
        ${item.name === selectedLocation?.name ? ' bg-blue-600 text-white' : ''}
        `} onClick={() => setSelectedLocation(item)}>{item.name}</li>)}
        </ul>
    </div>
}
