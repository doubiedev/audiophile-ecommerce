import { useState } from "react";

const BtnAddToCart = () => {
    const [numItems, setNumItems] = useState(1);
    return (
        <div className="flex gap-[1rem]">
            <div className="flex items-center w-[120px] h-[3rem] bg-grey-light">
                <div
                    className="flex justify-center flex-1 hover:cursor-pointer opacity-25"
                    onClick={() => setNumItems(Math.max(numItems - 1, 1))}
                >
                    -
                </div>
                <p className="flex justify-center flex-1">{numItems}</p>
                <p
                    className="flex justify-center flex-1 hover:cursor-pointer opacity-25"
                    onClick={() => setNumItems(numItems + 1)}
                >
                    +
                </p>
            </div>
            <button className="w-[10rem] h-[3rem] bg-orange-dark hover:bg-orange-light hover:cursor-pointer">
                <p className="subtitle text-white">Add To Cart</p>
            </button>
        </div>
    );
};

export default BtnAddToCart;
