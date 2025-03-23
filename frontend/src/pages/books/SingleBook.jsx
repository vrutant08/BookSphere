import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";

import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error happened while loading book info</div>;
    if (!book) return <div>No book found</div>;

    return (
        <div className="max-w-lg shadow-md p-5">
            <h1 className="text-2xl font-bold mb-6">{book.title}</h1>

            <div className=''>
                <div>
                    <img
                        src={`${getImgUrl(book.coverImage)}`}
                        alt={book.title}
                        className="mb-8"
                    />
                </div>

                <div className='mb-5'>
                    <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.author || 'admin'}</p>
                    <p className="text-gray-700 mb-2"><strong>Category:</strong> {book.category}</p>
                    <p className="text-gray-700 mb-2"><strong>Price:</strong> ${book.newPrice}</p>
                    <p className="text-gray-700 mb-2"><strong>Description:</strong> {book.description}</p>
                </div>

                <button
                    onClick={() => handleAddToCart(book)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    <FiShoppingCart className="inline-block mr-2" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default SingleBook;