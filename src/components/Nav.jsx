import { NavLink } from "react-router";

export default function Nav({}) {
    return (
        <div className='w-full h-auto flex flex-row justify-center items-center gap-5 p-4 sticky top-0 bg-amber-50'>
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
