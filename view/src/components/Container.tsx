import { FC } from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={`relative max-w-[1440px] mx-auto md:px-10 sm:px-2 px-4 z-10 text-black tracking-tighter ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
