import { ReactNode } from "react";

interface LayoutContainerProps {
  children: ReactNode;
  className?: string;
}

const LayoutContainer = ({ children, className }: LayoutContainerProps) => {
  return (
    <div className={`mx-auto w-full max-w-[327px] md:max-w-[689px] lg:max-w-[1110px] ${className}`}>
      {children}
    </div>
  );
};

export default LayoutContainer;
