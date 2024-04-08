import portada from '../images/portada.png';
import user from '../images/user.png';

export function InfoPage() {
    return (
        <div className="h-full flex flex-col">
            {/* Header: Title */}
            <div className="flex-none mb-4 p-2">
                <div className="flex content-center">
                    <h1 className="flex-grow dark:text-gray-400 text-2xl">Información</h1>
                </div>
            </div>

            <div className="flew-grow overflow-y-auto">
                <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img className="rounded-t-lg w-full max-w-40 pt-4" src={portada} alt="" />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center py-4">Quien sabe ande</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center pb-4">Caseta de la Asociación cultural Club Veneciana.</p>
                        <p className="font-xs text-gray-400 text-center">Juan Belmonte, 202</p>
                        <p className="text-center text-gray-500">
                            <i className="fa-solid fa-location-dot pr-2"></i>
                            Pulse <a href="https://maps.app.goo.gl/YcvmKzsn97v3MnNh9" className="text-blue-500" target="_blank" rel="noreferrer">aquí</a> para ver la localización.</p>

                        <div className="flex flex-col items-center pb-10 pt-10">
                            <img className="w-28 h-28 mb-3 rounded-full shadow-lg" src={user} alt="Victor" />
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Víctor Reina</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Desarrollador Web</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
