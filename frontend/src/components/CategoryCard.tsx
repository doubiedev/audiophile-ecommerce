import BtnShop from "./BtnShop";

interface CategoryCardProps {
    image: string;
    title: string;
}

// TODO: Responsive sizes for cards
const CategoryCard: React.FC<CategoryCardProps> = ({ image, title }) => {
    return (
        <div className="flex-1 bg-grey-dark">
            <div className="bg-white h-[80px] overflow-y-visible">
                <img
                    src={image}
                    className="w-[60%] justify-self-center"
                    alt={title}
                />
            </div>
            <div className="pt-[116px] pb-[30px] flex flex-col items-center">
                <h6 className="mb-[15px]">{title}</h6>
                <BtnShop />
            </div>
        </div>
    );
};

export default CategoryCard;
