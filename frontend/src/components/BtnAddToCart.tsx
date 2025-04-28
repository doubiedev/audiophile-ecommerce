import { useState } from "react";

interface BtnAddToCartProps {
    smallBtn?: boolean;
}

const BtnAddToCart: React.FC<BtnAddToCartProps> = ({ smallBtn = false }) => {
    const [numItems, setNumItems] = useState(1);

    return (
        <div className={`${!smallBtn && "flex gap-[1rem]"}`}>
            <div
                className={`${smallBtn ? "w-[6rem] h-[2rem]" : "w-[120px] h-[3rem]"} flex items-center bg-grey-dark`}
            >
                <div
                    className="flex justify-center flex-1 hover:cursor-pointer opacity-25 select-none"
                    onClick={() => setNumItems(Math.max(numItems - 1, 1))}
                >
                    -
                </div>
                <p className="flex justify-center flex-1">{numItems}</p>
                <p
                    className="flex justify-center flex-1 hover:cursor-pointer opacity-25 select-none"
                    onClick={() => setNumItems(numItems + 1)}
                >
                    +
                </p>
            </div>
            {!smallBtn && (
                <button className="w-[10rem] h-[3rem] bg-orange-dark hover:bg-orange-light hover:cursor-pointer">
                    <p className="subtitle text-white">Add To Cart</p>
                </button>
            )}
        </div>
    );
};

export default BtnAddToCart;
