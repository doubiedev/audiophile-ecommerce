import { ReactNode } from "react";

interface LayoutContainerProps {
    children: ReactNode;
    className?: string;
}

const LayoutContainer = ({ children }: LayoutContainerProps) => {
    return (
        <div
            className={
                "mx-auto w-full h-full max-w-[1190px] px-[24px] md:px-[40px]"
            }
        >
            {children}
        </div>
    );
};

export default LayoutContainer;
