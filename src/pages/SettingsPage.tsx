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
        <div className="h-full flex flex-col gap-3 p-3">
            {/* Header */}
            <h1 className="text-2xl font-bold dark:text-gray-200">Configuración</h1>

            {/* Tarjeta: Modo socio */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Soy socio</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Activa para ver precios con 20% de descuento
                        </p>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" checked={isPatner} onChange={selectPatner} />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                </div>
                {isPatner && (
                    <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-xs text-yellow-800 flex items-center gap-1.5">
                            <i className="fa-solid fa-star text-yellow-500"></i>
                            Modo socio activo — precios con <strong>&nbsp;20% dto.</strong>
                        </p>
                    </div>
                )}
            </div>

            {/* Tarjeta: Catálogos */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex-1 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="font-semibold text-gray-900 dark:text-white">Lista de catálogos</h2>
                    <button
                        type="button"
                        onClick={refreshCatalogs}
                        className={"px-3 py-1 text-xs font-medium inline-flex items-center gap-1.5 text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 " + (refreshingCatalogs ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800")}
                        disabled={refreshingCatalogs}
                    >
                        <i className={"fa-solid fa-sync " + (refreshingCatalogs ? "animate-spin" : "")}></i>
                        Actualizar
                    </button>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700 overflow-y-auto">
                    {catalogs && catalogs.map((name: string, index: number) => (
                        <div className={index % 2 ? "px-4 py-3 bg-gray-50 dark:bg-gray-800" : "px-4 py-3 bg-white dark:bg-gray-900"} key={name}>
                            <div className="flex items-center">
                                <i className="fa-solid fa-book text-[#2D6A27] mr-3"></i>
                                <p className="flex-1 text-sm font-medium text-gray-900 dark:text-white truncate">{name}</p>
                                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{indexedCatalogs[name].length} productos</span>
                            </div>
                        </div>
                    ))}
                    {catalogs?.length === 0 && (
                        <div className="p-6 text-center text-gray-400">No hay catálogos disponibles</div>
                    )}
                </div>
            </div>
        </div>
    );
}
