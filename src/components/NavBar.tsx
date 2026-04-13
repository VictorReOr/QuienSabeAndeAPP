import { useLocation, useNavigate } from 'react-router-dom';
import { BillService } from '../services/bill-service';
import { UserService } from '../services/user-service';

/**
 * NavBar component.
 *
 * @returns {JSX.Element} JSX.Element
 */
export function NavBar() {
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const addNewBill = () => {
        const bill = BillService.addNew();
        UserService.updateUserConfiguration({ selectedBill: bill.name });
        navigate(0);
    };

    return (
        <>
            <div className="h-16 bg-[#2D6A27] border border-[#DFC48A] rounded-full bottom-4 left-1/2">
                <div className="grid h-full max-w-2xl grid-cols-5 mx-auto">

                    <button onClick={() => navigate('/')} type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-[#1a4a18] group">
                        <i className="fa-solid fa-list-check text-xl text-white/70 group-hover:text-[#FFD700]"></i>
                        <span className={"text-xs " + (pathname === '/' ? 'text-[#FFD700]' : 'text-white/70')}>Carta</span>
                    </button>

                    <button onClick={() => navigate('/bills')} type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-[#1a4a18] group">
                        <i className="fa-solid fa-wallet text-xl text-white/70 group-hover:text-[#FFD700]"></i>
                        <span className={"text-xs " + (pathname === '/bills' ? 'text-[#FFD700]' : 'text-white/70')}>Histórico</span>
                    </button>

                    <div onClick={addNewBill} className="flex items-center justify-center">
                        <button type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-[#DFC48A] rounded-full hover:bg-[#cfa863] group focus:ring-4 focus:ring-[#DFC48A]/50 focus:outline-none text-[#1a4a18]">
                            <i className="fa-solid fa-plus text-xl text-[#1a4a18]"></i>
                            <span className="sr-only">Nueva cuenta</span>
                        </button>
                    </div>

                    <button onClick={() => navigate('/settings')} type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-[#1a4a18] group">
                        <i className="fa-solid fa-sliders text-xl text-white/70 group-hover:text-[#FFD700]"></i>
                        <span className={"text-xs " + (pathname === '/settings' ? 'text-[#FFD700]' : 'text-white/70')}>Configuración</span>
                    </button>

                    <button onClick={() => navigate('/info')} type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-[#1a4a18] group">
                        <i className="fa-solid fa-circle-info text-xl text-white/70 group-hover:text-[#FFD700]"></i>
                        <span className={"text-xs " + (pathname === '/info' ? 'text-[#FFD700]' : 'text-white/70')}>Info</span>
                    </button>

                </div>
            </div>

        </>
    );
}
