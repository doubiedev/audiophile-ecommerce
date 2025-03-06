import ArrowRight from "../assets/shared/desktop/icon-arrow-right.svg"
const BtnShop = () => {
    return (
        <div className="flex items-center h-[18px]">
            <a className="tracking-[1px] opacity-50 font-bold text-[13px]" href="">SHOP</a>
            <ArrowRight />
            {/* TODO: fix alignment of shop with right arrow */}
        </div>
    )
}

export default BtnShop;
