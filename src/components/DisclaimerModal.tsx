import React, { useEffect, useState } from 'react';

interface DisclaimerModalProps {
    onClose: () => void;
}

export function DisclaimerModal({ onClose }: DisclaimerModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Un ligero retardo para que aparezca fluidamente después de que la app arranque
        const t = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Dar tiempo a la animación css
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black transition-opacity duration-300 ${isVisible ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'}`}>
            <div className={`w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <div className="p-6 text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-6">
                        <i className="fa-solid fa-triangle-exclamation text-yellow-600 text-3xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 font-feria text-[#2D6A27]">
                        Aviso Importante
                    </h3>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                        Esta app es solo una guía de consumo para los socios de la caseta. Los precios son orientativos y pueden variar respecto a la carta oficial. El desarrollador no se responsabiliza de posibles diferencias.
                        <br /><br />
                        <span className="font-semibold text-caseta-verde">¡Buena feria y que la disfrutes al máximo! 💃🐎</span>
                    </p>
                    <button
                        onClick={handleClose}
                        className="w-full text-white bg-[#2D6A27] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-3 text-center transition-colors shadow-md"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
}
