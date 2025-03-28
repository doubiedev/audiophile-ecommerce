import headphones from "../assets/shared/desktop/image-category-thumbnail-headphones.png";
import speakers from "../assets/shared/desktop/image-category-thumbnail-speakers.png";
import earphones from "../assets/shared/desktop/image-category-thumbnail-earphones.png";
import CategoryCard from "./CategoryCard";

const Categories = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-[30px] h-fit">
            <CategoryCard
                image={headphones}
                title="Headphones"
                link="/headphones"
            />
            <CategoryCard image={speakers} title="Speakers" link="/speakers" />
            <CategoryCard
                image={earphones}
                title="Earphones"
                link="/earphones"
            />
        </div>
    );
};

export default Categories;
