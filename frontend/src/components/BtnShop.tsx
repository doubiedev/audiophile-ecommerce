import ArrowRight from "../assets/shared/desktop/icon-arrow-right.svg";
import { NavLink } from "react-router";

interface BtnShopProps {
    link: string;
}

// FIX: Slightly off-center ArrowRight vs text
// BUG: Orange text should be on hover for ArrowRight as well
const BtnShop: React.FC<BtnShopProps> = ({ link }) => {
    return (
        <NavLink
            to={link}
            className="flex items-center h-fit w-fit"
            onClick={() => window.scrollTo(0, 0)}
        >
            <p className="subtitle tracking-[1px] opacity-50 font-bold text-[13px]/0 hover:text-orange-dark hover:opacity-100 hover:cursor-pointer">
                SHOP &nbsp;
            </p>
            <ArrowRight />
        </NavLink>
    );
};

export default BtnShop;
