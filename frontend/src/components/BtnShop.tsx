import ArrowRight from "../assets/shared/desktop/icon-arrow-right.svg";
import { NavLink } from "react-router";

interface BtnShopProps {
    link: string;
}

// FIX: Slightly off-center ArrowRight vs text
const BtnShop: React.FC<BtnShopProps> = ({ link }) => {
    return (
        <NavLink to={link} className="flex items-center h-fit w-fit">
            <p className="subtitle tracking-[1px] opacity-50 font-bold text-[13px]/0 hover:text-orange-dark hover:opacity-100">
                SHOP &nbsp;
            </p>
            <ArrowRight />
        </NavLink>
    );
};

export default BtnShop;
