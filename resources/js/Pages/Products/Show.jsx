import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ product }) {
    return (
        <AuthenticatedLayout>
        <div className="max-w-4xl mx-auto p-5">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">{product.name}</h1>
                <p className="text-gray-600 text-lg mb-4">{product.description}</p>
                <h4 className="text-xl font-bold text-gray-700 mb-6">Price: ${product.price}</h4>
                <hr className="my-4" />

                <img
                    src={product.image || 'https://via.placeholder.com/150'}
                    alt={product.name}
                    className="h-60 w-60 object-cover mx-auto mb-6 rounded-lg"
                />

                <div className="flex justify-center">
                    <Link
                        href="/products"
                        className="bg-pink-500 text-white px-6 py-2 rounded-full text-lg hover:bg-pink-700 transition duration-300"
                    >
                        Back to All Products
                    </Link>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
    );
}
