import { useNavigate } from 'react-router-dom';
import { BillService } from '../services/bill-service';
import { UserService } from '../services/user-service';

/**
 * NavBar component.
 *
 * @returns {JSX.Element} JSX.Element
 */
export function NavBar() {
    const navigate = useNavigate();

    const addNewBill = () => {
        const bill = BillService.addNew();
        UserService.updateUserConfiguration({ selectedBill: bill.name });
        navigate(0);
    };

    return (
        <>
            <div className="h-16 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
                <div className="grid h-full max-w-lg grid-cols-5 mx-auto">

                    <button onClick={() => navigate('/')} data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <i className="fa-solid fa-house text-xl text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"></i>
                        <span className="sr-only">Home</span>
                    </button>

                    <button onClick={() => navigate('/bills')} data-tooltip-target="tooltip-wallet" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <i className="fa-solid fa-wallet text-xl text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"></i>
                        <span className="sr-only">Histórico</span>
                    </button>

                    <div onClick={addNewBill} className="flex items-center justify-center">
                        <button data-tooltip-target="tooltip-new" type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                            <i className="fa-solid fa-plus text-xl text-gray-200 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-500"></i>
                            <span className="sr-only">Nueva cuenta</span>
                        </button>
                    </div>
                    <div id="tooltip-new" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Create new item
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>

                    <button onClick={() => navigate('/settings')} data-tooltip-target="tooltip-wallet" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <i className="fa-solid fa-sliders text-xl text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"></i>
                        <span className="sr-only">Configuración</span>
                    </button>

                    <button onClick={() => navigate('/info')} data-tooltip-target="tooltip-wallet" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <i className="fa-solid fa-circle-info text-xl text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"></i>
                        <span className="sr-only">Información</span>
                    </button>

                </div>
            </div>

        </>
    );
}