import { Product } from '../types';

export function ProductItem(
    { product, total, onAdd, onRemove }: {
        product: Product,
        total?: number,
        onAdd?: (product: Product) => void,
        onRemove?: (product: Product) => void
    }) {

    return (
        <div className="flex items-center">
            <div className="relative flex-shrink-0">
                {product.category === 'food' && <i className="text-red-500 fa-solid fa-utensils"></i>}
                {product.category === 'drink' && <i className="text-blue-500 fa-solid fa-martini-glass"></i>}
                {total && <div className="absolute inline-flex items-center justify-center min-w-5 min-h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -bottom-2 -end-3 dark:border-gray-900">{total}</div>}
            </div>
            <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {product.name}
                    <span className="pl-4 text-xs text-gray-500 truncate dark:text-gray-400">
                        {product.description}
                    </span>
                </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {Math.round(product.price * 100) / 100} €
            </div>
            <div className="inline-flex items-center pl-4">
                <button type="button"
                    onDoubleClick={() => onRemove && onRemove(product)}
                    className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500"
                >
                    <i className="fa-solid fa-trash-can"></i>
                </button>
            </div>
            <div className="inline-flex items-center pl-2">
                <button type="button"
                    onClick={() => onAdd && onAdd(product)}
                    className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                >
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>
    );
}