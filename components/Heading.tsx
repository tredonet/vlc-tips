import { ComponentProps } from "react";

export const Heading: React.FC<ComponentProps<"div">> = ({ children }) => <div className='text-slate-200 mx-10 mt-5 text-lg font-mono'>
    {children}
</div>
