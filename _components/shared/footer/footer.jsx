import { Layout } from "@/_components/ui/layout";
import Link from "next/link";
import Image from "next/image";
import Image1 from "@/assets/Icons/payments/master.png";
import Image2 from "@/assets/Icons/payments/visa.webp";
import Image3 from "@/assets/Icons/payments/otpbank.webp";
import Image4 from "@/assets/Icons/payments/img1.webp";
import Image5 from "@/assets/Icons/payments/img.webp";
import Image6 from "@/assets/Icons/payments/img3.webp";
import Image7 from "@/assets/Icons/payments/img4.webp";
import Image8 from "@/assets/Icons/payments/american.webp";

export const Footer = () => {
  const delivery_images = [
    {
      id: 1,
      src: `/icons/delivery/aks-logo.png`,
    },
  ];

  return (
    <>
      <div className={`pb-12 pt-[2rem] md:pt-[4.375rem] bg-boa-dark-blue`}>
        <Layout>
          <div className={`grid grid-cols-6 gap-10 md:gap-20`}>
            <div className={`col-span-3 md:col-span-1`}>
              <h3 className={`text-white font-semibold text-lg`}>
                Korisnička podrška
              </h3>
              <Link
                href={`/strana/kako-kupiti`}
                className={`text-white font-light text-base mt-5 block hover:text-boa-red`}
              >
                Kako kupiti
              </Link>
              <Link
                href={`/strana/reklamacije`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Reklamacije
              </Link>

              <Link
                href={`/strana/zamena-artikala`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Zamena artikala
              </Link>
              <Link
                href={`/strana/pravo-na-odustajanje`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Pravo na odustajanje
              </Link>
            </div>
            <div className={`col-span-3 md:col-span-1`}>
              <h3 className={`text-white font-semibold text-lg`}>O nama</h3>
              <Link
                href={`/o-nama`}
                className={`text-white font-light text-base mt-5 block hover:text-boa-red`}
              >
                Više o kompaniji
              </Link>
              <Link
                href={`/lokacije`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Naše prodavnice
              </Link>
              <Link
                href={`/veleprodaja`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
               Veleprodaja
              </Link>
              <Link
                href={`/kontakt`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
               Kontakt
              </Link>
            </div>
            <div className={`col-span-3 md:col-span-1`}>
              <h3 className={`text-white font-semibold text-lg`}>
                Možda te interesuje
              </h3>
              <Link
                href={`/zene/zenske-spavacice`}
                className={`text-white font-light text-base mt-5 block hover:text-boa-red`}
              >
                Spavaćice
              </Link>
              <Link
                href={`/zene/zenski-donji-ves`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Ženski veš
              </Link>
              <Link
                href={`/zene/zenske-pidzame`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Ženske pidžame
              </Link>
              <Link
                href={`/muskarci/muske-pidzame`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Muške pidžame
              </Link>
              <Link
                href={`/muskarci/muske-bokserice`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Bokserice
              </Link>
            </div>
            <div className={`col-span-3 md:col-span-1`}>
              <h3 className={`text-white font-semibold text-lg`}>
                Informacije
              </h3>
              <Link
                href={`/strana/uslovi-koriscenja`}
                className={`text-white font-light text-base mt-5 block hover:text-boa-red`}
              >
                Uslovi korišćenja
              </Link>
              <Link
                href={`/strana/politika-privatnosti`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Politika privatnosti
              </Link>
              <Link
                href={`/strana/isporuka`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Isporuka
              </Link>
            </div>
            <div className={`hidden md:col-span-1`} />
            <div className={`col-span-6 md:col-span-1`}>
              <div className={`flex flex-col`}>
                <Link href={`/`} className={`max-md:w-[40%]`}>
                  <Image
                    src={`/images/footer-logo.png`}
                    alt={`Bogutovo`}
                    width={0}
                    height={0}
                    sizes={`100vw`}
                    quality={100}
                    className={`w-fit`}
                  />
                </Link>
                <div className={`flex flex-col gap-1 mt-5`}>
                  <p className={`font-light text-white`}>Načini dostave</p>
                  <div className={`flex items-center space-x-1`}>
                    {delivery_images?.map(({ id, src }) => {
                      return (
                        <Image
                          src={src}
                          alt={`Bogutovo`}
                          width={40}
                          height={50}
                          key={`delivery-${id}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-12 flex-col max-md:mt-6 gap-[1.25rem] items-start">
            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-md">
              <div>
                <a
                  href={`http://www.mastercard.com/rs/consumer/credit-cards.html`}
                  rel={"noreferrer"}
                  target={"_blank"}
                >
                  <Image
                    src={Image1}
                    width={50}
                    height={30}
                    alt="Master Card"
                    className="object-scale-down"
                    style={{ width: "50px", height: "30px" }}
                  />
                </a>
              </div>
              <div>
                <a
                  href={`https://rs.visa.com/pay-with-visa/security-and-assistance/protected-everywhere.html`}
                  rel={"noreferrer"}
                  target={"_blank"}
                >
                  <Image
                    src={Image2}
                    width={50}
                    height={30}
                    alt="Master Card"
                    className="object-scale-down"
                    style={{ width: "50px", height: "30px" }}
                  />
                </a>
              </div>
              <div>
                <a
                  href={`https://www.otpbanka.rs`}
                  rel={"noreferrer"}
                  target={"_blank"}
                >
                  <Image
                    src={Image3}
                    width={140}
                    height={50}
                    alt="Master Card"
                    className="object-scale-down"
                    style={{ width: "140px", height: "50px" }}
                  />
                </a>
              </div>
              <div>
                <Image
                  src={Image4}
                  width={50}
                  height={30}
                  alt="Master Card"
                  className="object-scale-down"
                  style={{ width: "50px", height: "30px" }}
                />
              </div>
              <div>
                <Image
                  src={Image5}
                  width={50}
                  height={30}
                  alt="Master Card"
                  className="object-scale-down"
                  style={{ width: "50px", height: "30px" }}
                />
              </div>
              <div>
                <Image
                  src={Image6}
                  width={50}
                  height={30}
                  alt="Master Card"
                  className="object-scale-down"
                  style={{ width: "50px", height: "30px" }}
                />
              </div>
              <div>
                <Image
                  src={Image7}
                  width={50}
                  height={30}
                  alt="Master Card"
                  className="object-scale-down"
                  style={{ width: "50px", height: "30px" }}
                />
              </div>
            </div>
          </div>
        </Layout>
      </div>
      <div className={`py-3 bg-boa-dark`}>
        <Layout>
          <div className={`text-white font-normal text-base`}>
            © {new Date().getFullYear()} Bogutovo.com | Sva prava zadržana.
            Powered by{" "}
            <a
              target={`_blank`}
              href={`https://www.croonus.com`}
              className={`hover:text-boa-red`}
            >
              Croonus Technologies
            </a>
          </div>
        </Layout>
      </div>
    </>
  );
};
