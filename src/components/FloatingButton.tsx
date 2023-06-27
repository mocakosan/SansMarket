import Link from "next/link";

interface FloatingButtonProps {
  children: React.ReactNode;
  href: string;
}

const FloatingButton = ({ children, href }: FloatingButtonProps) => {
  return (
    <Link
      href={href}
      className="fixed flex items-center justify-center text-white transition-colors bg-orange-400 border-0 border-transparent rounded-full shadow-xl cursor-pointer hover:bg-orange-500
      aspect-square bottom-5 right-5 w-14"
    >
      {children}
    </Link>
  );
};

export default FloatingButton;
