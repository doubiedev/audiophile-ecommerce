import ArrowRight from "../assets/shared/desktop/icon-arrow-right.svg"
import { NavLink } from "react-router";

const BtnShop = () => {
    return (
        <div className="flex items-center h-fit w-fit">
            <NavLink to="" className="tracking-[1px] opacity-50 font-bold text-[13px]/0 hover:text-orange-dark hover:opacity-100">SHOP &nbsp;</NavLink>
            <ArrowRight />
        </div>
    )
}

export default BtnShop;
