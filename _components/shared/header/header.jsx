import { TopHeader, MenuItems, ActionItems } from "@/_components/shared/header";
import { Layout } from "@/_components/ui/layout";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <>
      <TopHeader />
      <header className={`sticky top-0 z-50 bg-white shadow`}>
        <div
          className={`border-l-[0.75rem] border-r-[0.75rem] border-l-boa-red border-r-boa-red w-full`}
        >
          <Layout
            className={`flex items-center justify-between relative gap-4`}
          >
            <MenuItems />
            <Link
  href={`/`}
  className="flex-shrink relative mx-auto"
>
  <Image
    priority
    src={`/images/logo-red.png`}
    alt={`BOA Bogutovo`}
    width={120}
    quality={100}
    height={50}
    className="relative max-md:hidden !select-none"
  />
  <Image
    priority
    src={`/images/logo-red.png`}
    alt={`BOA Bogutovo`}
    width={90}
    quality={100}
    height={50}
    className="md:hidden !select-none"
  />
  <Image
    priority
    src={`/images/boa-red.png`}
    alt={`BOA Bogutovo`}
    width={120}
    quality={100}
    height={50}
    className="absolute xl:w-full h-full -top-[5rem] !select-none max-md:hidden"
  />
</Link>

            <ActionItems />
          </Layout>
        </div>
      </header>
    </>
  );
};
