import headphones from "../assets/shared/desktop/image-category-thumbnail-headphones.png";
import speakers from "../assets/shared/desktop/image-category-thumbnail-speakers.png";
import earphones from "../assets/shared/desktop/image-category-thumbnail-earphones.png";
import CategoryCard from "./CategoryCard";

const Categories = () => {
    return (
        <div className="flex gap-[30px] h-[284px]">
            <CategoryCard image={headphones} title="Headphones" />
            <CategoryCard image={speakers} title="Speakers" />
            <CategoryCard image={earphones} title="Earphones" />
        </div>
    );
};

export default Categories;
