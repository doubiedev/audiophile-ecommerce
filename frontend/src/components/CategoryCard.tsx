import BtnShop from "./BtnShop";

interface CategoryCardProps {
    image: string;
    title: string;
    link: string;
}

// TODO: Responsive sizes for cards
const CategoryCard: React.FC<CategoryCardProps> = ({ image, title, link }) => {
    return (
        <div className="rounded-lg flex-1">
            <div className="bg-white h-[80px] overflow-y-visible">
                <img
                    src={image}
                    className="w-[210px] justify-self-center"
                    alt={title}
                />
            </div>
            <div className="rounded-lg bg-grey-dark pt-[116px] pb-[30px] flex flex-col items-center">
                <h6 className="mb-[15px]">{title}</h6>
                <BtnShop link={link} />
            </div>
        </div>
    );
};

export default CategoryCard;
