import { TopHeader, MenuItems, ActionItems } from "@/_components/shared/header";
import { Layout } from "@/_components/ui/layout";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <>
      <TopHeader />
      <header className="sticky top-0 z-50 bg-white shadow overflow-visible">
        <div className="border-l-[0.75rem] border-r-[0.75rem] border-l-boa-red border-r-boa-red w-full">
          <Layout className="flex items-center justify-between relative gap-4">
            <MenuItems />
            <div className="flex justify-center flex-shrink-0 relative">
              <Link href="/" className="flex justify-center items-center relative">
                {/* Logo za desktop */}
                <Image
                  priority
                  src="/images/logo-red.png"
                  alt="BOA Bogutovo"
                  width={120}
                  height={50}
                  quality={100}
                  className="hidden md:block !select-none"
                />
                {/* Logo za mobilni */}
                <Image
                  priority
                  src="/images/logo-red.png"
                  alt="BOA Bogutovo"
                  width={90}
                  height={50}
                  quality={100}
                  className="md:hidden !select-none"
                />
              </Link>
            </div>
            <ActionItems />
          </Layout>
        </div>
      </header>
    </>
  );
};
