import { useEffect, useState } from "react";
import { DaoService } from '../services/dao-service';
import { UserService } from "../services/user-service";
import { IndexedCatalogs } from "../types";

export function SettingsPage() {

    const user = UserService.getUserConfiguration();

    const [refreshingCatalogs, setRefreshingCatalogs] = useState(false);
    const [isPatner, setIsPatner] = useState(user.isPatner || false);
    const [catalogs, setCatalogs] = useState([] as string[]);
    const [indexedCatalogs, setIndexedCatalogs] = useState({} as IndexedCatalogs);
    const selectedCatalog = '';

    useEffect(() => {
        DaoService.getCatalogs().then((ic: IndexedCatalogs) => {
            setIndexedCatalogs(ic);
            setCatalogs(Object.keys(ic));
        });
    }, []);

    const selectPatner = () => {
        const newIstPatner = !isPatner;
        setIsPatner(newIstPatner);
        UserService.updateUserConfiguration({ isPatner: newIstPatner });
    }

    const refreshCatalogs = () => {
        setRefreshingCatalogs(true);
        DaoService.getCatalogs(false).then((ic: IndexedCatalogs) => {
            setIndexedCatalogs(ic);
            setCatalogs(Object.keys(ic));
            setRefreshingCatalogs(false);
        });
    }

    return (
        <div className="h-full flex flex-col">
            {/* Header: Title */}
            <div className="flex-none mb-4 p-2">
                <div className="flex content-center">
                    <h1 className="flex-grow dark:text-gray-400 text-2xl">Configuración</h1>
                </div>
            </div>

            {/* Catalog list */}
            <div className="flex-none mb-2 p-2">
                <div className="flex content-center">
                    <span className="flex-grow dark:text-gray-400">Soy socio</span>
                    <div className="flex-none dark:text-gray-400 text-2xl">
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" checked={isPatner} onChange={selectPatner} />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Catalog list */}

            <div className="flex-none p-3">
                <div className="flex content-center">
                    <h2 className="flex-grow dark:text-gray-400">Lista de catálogos</h2>
                    <button type="button" onClick={refreshCatalogs}
                        className={"px-3 py-1 text-xs font-medium text-center inline-flex items-center text-white  rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 " + (refreshingCatalogs ? "bg-gray-700 dark:bg-gray-600" : "bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700" )}
                        disabled={refreshingCatalogs}
                    >
                        <i className="fa-solid fa-sync pr-2"></i>
                        Actualizar
                    </button>
                </div>
            </div>

            <div className="flew-grow overflow-y-auto">
                <div className="flex-grow overflow-y-auto mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {catalogs && catalogs?.map((name: string) => (
                            <div className="py-2 cursor-pointer" key={name}>
                                <div className="flex items-center">
                                    <div className="relative flex-shrink-0">
                                        <i className={"fa-brands fa-product-hunt " + (selectedCatalog === name ? "dark:text-blue-500" : "dark:text-gray-400")} ></i>
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className={"text-sm font-medium truncate " + (selectedCatalog === name ? "text-blue-900 dark:text-blue-500 font-bold" : "text-gray-900 dark:text-white")}>
                                            {name}
                                            <span className="pl-4">{selectedCatalog === name ? 'Actual' : ''}</span>
                                        </p>
                                    </div>
                                    <div className="min-w-28 text-right text-base text-gray-700 dark:text-blue-500">
                                        {indexedCatalogs[name].length} productos
                                    </div>
                                </div>
                            </div>
                        ))}
                        {catalogs?.length === 0 && <div className="dark:text-gray-400 text-center">No hay catálogos disponibles</div>}

                    </div>
                </div>
            </div>
        </div>
    );
}
