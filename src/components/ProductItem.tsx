import { Product } from '../types';

export function ProductItem(
    { product, isPatner, total, onAdd, onRemove }: {
        product: Product,
        isPatner?: boolean,
        total?: number,
        onAdd?: (product: Product) => void,
        onRemove?: (product: Product) => void
    }) {

    return (
        <div className="flex items-center">
            <div className="relative flex-shrink-0">
                {product.category === 'food' && <i className="text-[#2D6A27] fa-solid fa-utensils"></i>}
                {product.category === 'drink' && <i className="text-[#E8628A] fa-solid fa-martini-glass"></i>}
                {total && <div className="absolute inline-flex items-center justify-center min-w-5 min-h-5 text-xs font-bold text-white bg-[#2D6A27] border-2 border-white rounded-full -bottom-2 -end-3">{total}</div>}
            </div>
            <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-[#2D6A27] truncate">
                    {product.name}
                    <span className="pl-4 text-xs text-[#DFC48A] truncate">
                        {product.description}
                    </span>
                </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {typeof product.price === 'number' ? (
                    <>
                        {!isPatner && <span className="text-[#2D6A27]">{product.price.toFixed(2)}<span className="text-gray-500">&nbsp;€</span></span>}
                        {isPatner && <span className="font-semibold text-[#FFD700]">{(product.price * 0.8).toFixed(2).replace('.00','')}<span className="text-[#FFD700] brightness-75">&nbsp;€</span></span>}
                    </>
                ) : (
                    <span className="text-gray-800 dark:text-gray-300 font-bold">{product.price}</span>
                )}
            </div>
            <div className="inline-flex items-center pl-4">
                <button type="button"
                    onClick={() => onRemove && onRemove(product)}
                    className="text-[#E8628A] border border-[#E8628A] hover:bg-[#E8628A] hover:text-white focus:ring-4 focus:outline-none focus:ring-[#E8628A]/30 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                >
                    <i className="fa-solid fa-trash-can"></i>
                </button>
            </div>
            <div className="inline-flex items-center pl-2">
                <button type="button"
                    onClick={() => onAdd && onAdd(product)}
                    className="text-[#2D6A27] border border-[#2D6A27] hover:bg-[#2D6A27] hover:text-white focus:ring-4 focus:outline-none focus:ring-[#2D6A27]/30 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                >
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>
    );
}
