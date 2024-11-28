import { NavLink } from "react-router";

export default function Nav({}) {
    return (
        <div className='w-auto h-auto flex flex-row justify-center items-center gap-5 p-4'>
            <NavLink
                to='/hudson'
                className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600 text-right'
            >
                Hudson
            </NavLink>
            <p>R.</p>
            <NavLink
                to='/grill'
                className=' underline text-blue-600 hover:text-blue-800 visited:text-purple-600 text-left'
            >
                Grill
            </NavLink>
        </div>
    );
}
