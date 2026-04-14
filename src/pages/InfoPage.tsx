import portada from '../images/LupaInfo.png';
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

            <div className="flex-grow overflow-y-auto flex flex-col items-center gap-4 px-2 pb-4">
                {/* Imagen portada */}
                <img className="rounded-xl shadow-lg w-full max-w-xs" src={portada} alt="Quien sabe ande" />

                {/* Info caseta */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quien sabe ande</h2>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">Caseta de la Asociación cultural Club Veneciana.</p>
                    <p className="mt-1 text-sm text-gray-400">Juan Belmonte, 202</p>
                    <p className="mt-1 text-gray-500">
                        <i className="fa-solid fa-location-dot pr-1 text-red-400"></i>
                        Pulse <a href="https://maps.app.goo.gl/YcvmKzsn97v3MnNh9" className="text-blue-500 underline" target="_blank" rel="noreferrer">aquí</a> para ver la localización.
                    </p>
                </div>

                {/* Desarrollador */}
                <div className="flex flex-col items-center pt-2">
                    <img className="w-20 h-20 mb-2 rounded-full shadow-lg object-cover" src={user} alt="Victor" />
                    <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Víctor Reina</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Desarrollador Web</span>
                </div>
            </div>

        </div>
    );
}
