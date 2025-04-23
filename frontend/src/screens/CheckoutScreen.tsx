import { useNavigate } from "react-router";
import LayoutContainer from "../components/LayoutContainer";
import { useState } from "react";
import BtnOrange from "../components/BtnOrange";

const CheckoutScreen = () => {
    const navigate = useNavigate();

    const halfWidthClass =
        "w-full border border-[#cfcfcf] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-dark";
    const labelClass = "block text-sm font-semibold mb-2";
    const [paymentMethod, setPaymentMethod] = useState("e-money");

    return (
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
                                <label htmlFor="name" className={labelClass}>
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
                                <label htmlFor="email" className={labelClass}>
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
                                <label htmlFor="phone" className={labelClass}>
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
                                <label htmlFor="address" className={labelClass}>
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
                                <label htmlFor="city" className={labelClass}>
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
                                <label htmlFor="country" className={labelClass}>
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
                                        checked={paymentMethod === "e-money"}
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
                                        onChange={() => setPaymentMethod("cod")}
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
                    <section className="flex flex-col w-[350px] h-[612px] bg-white p-[2rem]">
                        <h6>Summary</h6>
                        <div className="flex flex-col">
                            <div>xx99mk2</div>
                            <div>xx59</div>
                            <div>yx1</div>
                        </div>
                        <div className="flex flex-col">
                            <div>total</div>
                            <div>shipping</div>
                            <div>vat (included)</div>
                            <div>grand total</div>
                        </div>
                        <button className="w-[10rem] h-[3rem] bg-orange-dark hover:bg-orange-light hover:cursor-pointer">
                            <p className="subtitle text-white">
                                Continue & Pay
                            </p>
                        </button>
                    </section>
                </div>
            </LayoutContainer>
        </div>
    );
};

export default CheckoutScreen;
