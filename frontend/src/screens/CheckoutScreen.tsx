import { useNavigate } from "react-router";
import LayoutContainer from "../components/LayoutContainer";

const CheckoutScreen = () => {
    const navigate = useNavigate();

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
                        <p className="subtitle text-orange-dark">
                            Billing Details
                        </p>
                        {/* TODO: Grid form components for checkout page */}
                        <form className="grid grid-cols-2 gap-x-4 gap-y-6">
                            {/* Name */}
                            <div className="col-span-1">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full border border-grey-light px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-dark"
                                    placeholder="Alexei Ward"
                                />
                            </div>

                            {/* Email */}
                            <div className="col-span-1">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold mb-2"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full border border-grey-light px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-dark"
                                    placeholder="alexei@mail.com"
                                />
                            </div>

                            {/* Phone */}
                            <div className="col-span-1">
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-semibold mb-2"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="w-full border border-grey-light px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-dark"
                                    placeholder="+1 202-555-0136"
                                />
                            </div>
                        </form>
                        <p className="subtitle text-orange-dark">
                            Shipping Info
                        </p>
                        <p className="subtitle text-orange-dark">
                            Payment Details
                        </p>
                    </section>
                    <section className="w-[350px] h-[612px] bg-white">
                        Summary
                    </section>
                </div>
            </LayoutContainer>
        </div>
    );
};

export default CheckoutScreen;
