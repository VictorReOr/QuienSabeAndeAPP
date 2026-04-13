import { Outlet } from 'react-router-dom';
import { NavBar } from '../components/NavBar';

export function AppLayout() {

    return (
        <>
            <div className="h-full flex flex-col gap-2 py-2 max-w-screen-sm px-1 mx-auto">

                {/* Content */}
                <div className="flex-grow overflow-y-auto">
                    <Outlet />
                </div>

                {/* Tool Bar */}
                <div className="flex-none">
                    <NavBar />
                </div>

            </div>
        </>
    );
}