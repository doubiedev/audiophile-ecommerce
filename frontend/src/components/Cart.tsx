import cart from "../cart.json"
import { useApp } from "../contexts/AppContext"

const Cart = () => {
    const { isCartOpen } = useApp()

    return (
        <>
            {isCartOpen &&
                <section className="flex flex-col bg-white absolute top-[121px] md:top-[128px] right-0">
                    <div>
                        <h5>CART (<span>numItems</span>)</h5>
                        <p>Remove all</p>
                    </div>
                    <div>
                        Map over cart items here as cards
                    </div>
                    <div>
                        <p>Total</p>
                        <p>$totalPrice</p>
                    </div>
                    <div>CheckoutBtn</div>
                </section>}
        </>
    )
}

export default Cart
