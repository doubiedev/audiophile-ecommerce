import { useNavigate } from "react-router";
import LayoutContainer from "../components/LayoutContainer";
import { useState, useEffect, useMemo } from "react";
import SummaryProductCard from "../components/SummaryProductCard";
import data from "../data.json";
import cart from "../cart.json";
import Tick from "../assets/checkout/icon-order-confirmation.svg";

const CheckoutScreen = () => {
    const navigate = useNavigate();

    const halfWidthClass =
        "w-full border border-[#cfcfcf] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-dark";
    const labelClass = "block text-sm font-semibold mb-2";
    const [paymentMethod, setPaymentMethod] = useState("e-money");
    const [subtotal, setSubtotal] = useState(0);
    const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);

    useEffect(() => {
        let total = 0;

        cart.forEach((cartItem) => {
            const product = data.find((p) => p.id === cartItem.id);
            if (product) {
                total += cartItem.quantity * product.price;
            }
        });

        setSubtotal(total);
    }, []);

    return (
        <>
            {isOrderSuccessful && <OrderConfirmation subtotal={subtotal} />}
            <div className="w-full h-full bg-grey-dark pb-[140px]">
                <LayoutContainer>
                    <p
                        onClick={() => navigate(-1)}
                        className="opacity-50 pt-[80px] mb-[3.5rem] hover:cursor-pointer"
                    >
                        Go Back
                    </p>
                    <div className="flex gap-[30px] justify-between">
                        <section className="w-[730px] bg-white p-[3rem] pt-[3.5rem]">
                            <h3 className="mb-[2.5rem]">Checkout</h3>
                            <p className="subtitle text-orange-dark mb-[1rem]">
                                Billing Details
                            </p>
                            <form className="grid grid-cols-2 gap-x-4 gap-y-6">
                                {/* Name */}
                                <div className="col-span-1">
                                    <label
                                        htmlFor="name"
                                        className={labelClass}
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className={halfWidthClass}
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Email */}
                                <div className="col-span-1">
                                    <label
                                        htmlFor="email"
                                        className={labelClass}
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={halfWidthClass}
                                        placeholder="johndoe@mail.com"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="col-span-1">
                                    <label
                                        htmlFor="phone"
                                        className={labelClass}
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className={halfWidthClass}
                                        placeholder="+1 123-456-7890"
                                    />
                                </div>

                                {/* Section Title: Shipping Info */}
                                <div className="col-span-2 mt-[3.5rem]">
                                    <p className="subtitle text-orange-dark">
                                        Shipping Info
                                    </p>
                                </div>

                                {/* Address - Full Width */}
                                <div className="col-span-2">
                                    <label
                                        htmlFor="address"
                                        className={labelClass}
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        className="w-full border border-[#cfcfcf] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-dark"
                                        placeholder="1137 Williams Avenue"
                                    />
                                </div>

                                {/* ZIP Code */}
                                <div className="col-span-1">
                                    <label htmlFor="zip" className={labelClass}>
                                        ZIP Code
                                    </label>
                                    <input
                                        type="text"
                                        id="zip"
                                        name="zip"
                                        className={halfWidthClass}
                                        placeholder="10001"
                                    />
                                </div>

                                {/* City */}
                                <div className="col-span-1">
                                    <label
                                        htmlFor="city"
                                        className={labelClass}
                                    >
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        className={halfWidthClass}
                                        placeholder="New York"
                                    />
                                </div>

                                {/* Country */}
                                <div className="col-span-1">
                                    <label
                                        htmlFor="country"
                                        className={labelClass}
                                    >
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        className={halfWidthClass}
                                        placeholder="United States"
                                    />
                                </div>

                                {/* Section Title: Payment Details */}
                                <div className="col-span-2 mt-[3.5rem]">
                                    <p className="subtitle text-orange-dark">
                                        Payment Details
                                    </p>
                                </div>

                                {/* Payment Method Label */}
                                <div className="col-span-1">
                                    <label className={labelClass}>
                                        Payment Method
                                    </label>
                                </div>

                                {/* Radio Buttons */}
                                <div className="col-span-1 flex flex-col gap-4">
                                    <label
                                        className={`flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer border ${paymentMethod === "e-money"
                                                ? "border-orange-dark"
                                                : "border-[#cfcfcf]"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="e-money"
                                            className="accent-orange-dark"
                                            checked={
                                                paymentMethod === "e-money"
                                            }
                                            onChange={() =>
                                                setPaymentMethod("e-money")
                                            }
                                        />
                                        e-Money
                                    </label>

                                    <label
                                        className={`flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer border ${paymentMethod === "cod"
                                                ? "border-orange-dark"
                                                : "border-[#cfcfcf]"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            className="accent-orange-dark"
                                            checked={paymentMethod === "cod"}
                                            onChange={() =>
                                                setPaymentMethod("cod")
                                            }
                                        />
                                        Cash on Delivery
                                    </label>
                                </div>

                                {/* e-Money Number */}
                                <div className="col-span-1">
                                    <label
                                        htmlFor="emoneyNumber"
                                        className={labelClass}
                                    >
                                        e-Money Number
                                    </label>
                                    <input
                                        type="text"
                                        id="emoneyNumber"
                                        name="emoneyNumber"
                                        className={halfWidthClass}
                                        placeholder="238521993"
                                    />
                                </div>

                                {/* e-Money PIN */}
                                <div className="col-span-1">
                                    <label
                                        htmlFor="emoneyPin"
                                        className={labelClass}
                                    >
                                        e-Money PIN
                                    </label>
                                    <input
                                        type="text"
                                        id="emoneyPin"
                                        name="emoneyPin"
                                        className={halfWidthClass}
                                        placeholder="6891"
                                    />
                                </div>
                            </form>
                        </section>
                        <section className="flex flex-col w-[350px] h-[612px] bg-white p-[2rem] gap-[2rem]">
                            <h6>Summary</h6>
                            <div className="flex flex-col gap-[1.5rem]">
                                <SummaryProductCard id={1} />
                                <SummaryProductCard id={3} />
                                <SummaryProductCard id={6} />
                            </div>
                            <div className="flex flex-col gap-[0.5rem]">
                                <div className="flex justify-between">
                                    <p className="uppercase opacity-50">
                                        Total
                                    </p>
                                    <div className="font-bold text-[18px]">
                                        $ {subtotal.toLocaleString()}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <p className="uppercase opacity-50">
                                        Shipping
                                    </p>
                                    <div className="font-bold text-[18px]">
                                        $50
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <p className="uppercase opacity-50">
                                        VAT (included)
                                    </p>
                                    <div className="font-bold text-[18px]">
                                        ${" "}
                                        {Math.round(
                                            0.2 * subtotal,
                                        ).toLocaleString()}
                                    </div>
                                </div>
                                <div className="mt-[1rem] flex justify-between">
                                    <p className="uppercase opacity-50">
                                        Grand Total
                                    </p>
                                    <div className="font-bold text-[18px] text-orange-dark">
                                        $ {(subtotal + 50).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <button
                                className="h-[3rem] bg-orange-dark hover:bg-orange-light hover:cursor-pointer"
                                onClick={() => setIsOrderSuccessful(true)}
                            >
                                <p className="subtitle text-white">
                                    Continue & Pay
                                </p>
                            </button>
                        </section>
                    </div>
                </LayoutContainer>
            </div>
        </>
    );
};

interface OrderConfirmationProps {
    subtotal: number;
}

const OrderConfirmation = ({ subtotal }: OrderConfirmationProps) => {
    const navigate = useNavigate();
    const firstCartItem = cart[0];
    const product = data.find((item) => item.id === firstCartItem.id);

    const images = useMemo(
        () =>
            import.meta.glob("../assets/**/*.{jpg,png,jpeg,webp,svg}", {
                eager: true,
                import: "default",
            }),
        [],
    );

    if (!product) return <p>Product not found.</p>;
    const productFullName = product.name + " " + product.category;

    const imagePath = `../assets/${product.image.desktop}`;
    const imageSrc = images[imagePath] as string;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 bg-white rounded-lg p-[3rem] w-[540px]">
                <div className="flex flex-col">
                    <Tick />
                    <h3 className="mt-[2rem]">
                        Thank you
                        <br />
                        for your order
                    </h3>
                    <p className="mt-[1.5rem] opacity-50">
                        You will receive an email confirmation shortly.
                    </p>
                    <div className="mt-[2rem] flex w-full">
                        <div className="bg-grey-dark rounded-l-lg w-[246px] p-[1.5rem]">
                            <div className="flex">
                                {imageSrc && (
                                    <img
                                        src={imageSrc}
                                        className="w-[50px] h-[50px]"
                                        alt={productFullName}
                                    />
                                )}
                                <div className="flex flex-col w-full ml-[1rem]">
                                    <div className="flex justify-between text-center">
                                        <p className="text-bold uppercase">
                                            {product.name}
                                        </p>
                                        <div className="opacity-50 font-bold text-[15px]">
                                            x
                                            {firstCartItem &&
                                                firstCartItem.quantity}
                                        </div>
                                    </div>
                                    <div className="opacity-50 text-[14px] font-bold uppercase">
                                        $ {product.price.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            {cart.length > 1 && (
                                <>
                                    <div className="h-[1px] w-full bg-black opacity-[8%] my-[0.75rem]"></div>
                                    <div className="text-[12px] opacity-50 font-bold text-center">
                                        and {cart.length - 1} other item(s)
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="flex items-center bg-black rounded-r-lg grow">
                            <div className="ml-[2rem]">
                                <div className="text-white opacity-50 uppercase text-[15px]">
                                    Grand Total
                                </div>
                                <h6 className="text-white">
                                    $ {(subtotal + 50).toLocaleString()}
                                </h6>
                            </div>
                        </div>
                    </div>
                    <button
                        className="mt-[3rem] py-[15px] bg-orange-dark text-white uppercase text-[13px] tracking-[1px] font-bold hover:cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutScreen;
