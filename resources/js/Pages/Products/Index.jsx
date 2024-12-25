import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ products }) {
    return (
        <AuthenticatedLayout>
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-pink-600 text-center mb-6">Ceramic Products</h1>
                <hr className="border-pink-300 mb-6" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <li key={product.id} className="bg-gray-50 border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <Link href={`/products/${product.id}`} className="block h-full">
                                <div className="p-4">
                                    <img
                                        src={product.image || 'https://via.placeholder.com/150'}
                                        alt={product.name}
                                        className="w-full h-40 object-cover mb-4 rounded-t-lg"
                                    />
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                                    <p className="text-lg text-pink-500 font-bold">${product.price.toFixed(2)}</p>
                                </div>

                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </AuthenticatedLayout>
    );
}
