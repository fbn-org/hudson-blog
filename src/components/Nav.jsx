import { NavLink } from "react-router";

export default function Nav({}) {
    return (
        <div className='w-full h-auto flex flex-row justify-center items-center gap-5 p-4'>
            <NavLink to='/hudson' className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>
                Hudson
            </NavLink>
            <NavLink to='/grill' className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>
                Grill
            </NavLink>
        </div>
    );
}
