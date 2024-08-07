import Header from "@/components/Header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen container mx-auto flex-1 py-10">
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
