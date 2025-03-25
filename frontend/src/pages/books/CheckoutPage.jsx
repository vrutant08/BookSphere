import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import Swal from 'sweetalert2';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const { currentUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    const [isChecked, setIsChecked] = useState(false);

    const onSubmit = async (data) => {
        const newOrder = {
            name: data.name,
            email: currentUser?.email, // Placeholder email
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode,
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: totalPrice,
        };

        try {
            await createOrder(newOrder).unwrap();
            Swal.fire({
                icon: 'success',
                title: 'Order placed successfully',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error("Error creating an order", error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to place the order',
                text: 'Please try again later.',
            });
        }
    };

    if (isLoading) return <div>Loading...</div>;
    return (
        <section>
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div>
                            <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delivery</h2>
                            <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
                            <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>
                        </div>

                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Personal Details</p>
                                    <p>Please fill out all the fields.</p>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="full_name">Full Name</label>
                                            <input
                                                {...register('name', { required: true })}
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                            {errors.name && <span className="text-red-500">This field is required</span>}
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                {...register('email', { required: true })}
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                            {errors.email && <span className="text-red-500">This field is required</span>}
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="phone">Phone</label>
                                            <input
                                                {...register('phone', { required: true })}
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                            {errors.phone && <span className="text-red-500">This field is required</span>}
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="city">City</label>
                                            <input
                                                {...register('city', { required: true })}
                                                type="text"
                                                name="city"
                                                id="city"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                            {errors.city && <span className="text-red-500">This field is required</span>}
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="country">Country</label>
                                            <input
                                                {...register('country', { required: true })}
                                                type="text"
                                                name="country"
                                                id="country"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                            {errors.country && <span className="text-red-500">This field is required</span>}
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="state">State</label>
                                            <input
                                                {...register('state', { required: true })}
                                                type="text"
                                                name="state"
                                                id="state"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                            {errors.state && <span className="text-red-500">This field is required</span>}
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="zipcode">Zipcode</label>
                                            <input
                                                {...register('zipcode', { required: true })}
                                                type="text"
                                                name="zipcode"
                                                id="zipcode"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                            {errors.zipcode && <span className="text-red-500">This field is required</span>}
                                        </div>

                                        <div className="md:col-span-5">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="billing_same"
                                                    name="billing_same"
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                                    onChange={() => setIsChecked(!isChecked)}
                                                />
                                                <label htmlFor="billing_same" className="ml-2">
                                                    I agree to the <Link className='underline underline-offset-2 text-blue-600'>Terms & Conditions</Link> and <Link className='underline underline-offset-2 text-blue-600'>Shopping Policy.</Link>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button 
                                                    type="submit"
                                                    disabled={!isChecked}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Place an Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;