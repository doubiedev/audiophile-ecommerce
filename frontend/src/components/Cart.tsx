import { useNavbar } from "../contexts/NavbarContext";
import { useApp, useAppUpdate } from "../contexts/AppContext";
import BtnCartQuantity from "./BtnCartQuantity";
import BtnCheckout from "./BtnCheckout";

const Cart = () => {
    const { isCartMenuOpen } = useNavbar();
    const { cart, cartItems, total } = useApp();
    const { clearCart } = useAppUpdate();

    return (
        <>
            {isCartMenuOpen && (
                <section className="flex flex-col w-[377px] bg-white absolute top-[121px] md:top-[128px] right-0 p-[2rem] rounded-lg">
                    <div className="flex justify-between mb-[2rem]">
                        <h6>
                            CART (<span>{cart.length}</span>)
                        </h6>
                        {/* TODO: Onclick: remove items from cart */}
                        <p
                            className="opacity-50 underline hover:cursor-pointer"
                            onClick={() => clearCart()}
                        >
                            Remove all
                        </p>
                    </div>
                    <div className="flex flex-col gap-[1.5rem] mb-[2rem]">
                        {cartItems.map((product, index) => (
                            <div className="flex" key={index}>
                                <img
                                    src={product.imageSrc}
                                    alt={product.name}
                                    className="w-[4rem] rounded-lg"
                                />
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex flex-col ml-[1rem]">
                                        <p className="text-bold">
                                            {product.name}
                                        </p>
                                        <p className="opacity-50 text-bold">
                                            ${" "}
                                            {(
                                                product.price * product.quantity
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                    <BtnCartQuantity productId={product.id} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between mb-[1.5rem]">
                        <p className="opacity-50 uppercase">Total</p>
                        <h6>$ {total.toLocaleString()}</h6>
                    </div>
                    <BtnCheckout />
                </section>
            )}
        </>
    );
};

export default Cart;
