"use client";
import { useEffect, useState } from "react";
import { deleteMethod, list } from "@/_api/api";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

import pen from "../../assets/Icons/pen.png";
import trash from "../../assets/Icons/trash.png";

const ShippingAddresses = () => {
  const [shippingAddress, setShippingAddress] = useState();

  const fetchShippingAddresses = async () => {
    const response = await list("/customers/shipping-address/");
    setShippingAddress(response?.payload);
  };

  const deleteAddressHandler = (id) => {
    deleteMethod(`customers/shipping-address/${id}`)
      .then((response) => {
        if (response?.code === 200) {
          fetchShippingAddresses();
          toast.success("Uspešno ste izbrisali adresu.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        if (response?.code === 500 || response?.code === 400) {
          toast.error(
            "Došlo je do nepoznate greške pri obrađivanju Vašeg zahteva.",
            {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            },
          );
        }
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    const fetchShippingAddress = async () => {
      const response = await list("/customers/shipping-address/");
      setShippingAddress(response?.payload);
    };
    fetchShippingAddress();
  }, []);

  return (
    <div>
      <div className="flex max-md:flex-col gap-4 justify-between items-center sm:w-[90%] bg-[#f8f8f8] rounded-lg p-[1.4rem] mb-[2rem] min-h-[7rem]">
        <h1 className="text-3xl pb-0">Adrese dostave</h1>
        <Link
          href="/nova-shipping-adresa"
          className="text-[#919191] opacity-[0.5] hover:opacity-100 px-[1rem] text-xl h-fit py-[0.6rem] max-sm:px-[0.5rem] whitespace-nowrap rounded-md hover:translate-y-0.5 transition-all ease cursor-pointer font-semibold flex"
        >
          <svg
            id="Capa_1"
            enableBackground="new 0 0 611.802 611.802"
            height="20"
            viewBox="0 0 611.802 611.802"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <g id="图层_x0020_1_31_">
                <path
                  clipRule="evenodd"
                  d="m305.901 611.802c-17.973 0-32.676-14.703-32.676-32.676v-69.742-170.807h-170.807-69.742c-17.974 0-32.676-14.703-32.676-32.676 0-17.973 14.702-32.676 32.676-32.676h69.742 170.807v-170.807-69.742c0-17.974 14.702-32.676 32.676-32.676 17.973 0 32.676 14.702 32.676 32.676v69.742 170.807h170.807 69.742c17.973 0 32.676 14.702 32.676 32.676 0 17.973-14.703 32.676-32.676 32.676h-69.742-170.807v170.807 69.742c0 17.973-14.703 32.676-32.676 32.676z"
                  fillRule="evenodd"
                  fill="#919191"
                />
              </g>
            </g>
          </svg>
          <span className="ml-[0.4rem] -mt-[0.2rem]">Dodaj novu adresu</span>
        </Link>
      </div>
      <table className="table-fixed max-md:w-full w-[90%] mr-auto my-1rem table">
        <tbody>
          <tr className="bg-boa-dark-blue divide-x divide-white text-white">
            <td className=" rounded-tl-lg pl-[1.4rem] py-[0.7rem] max-sm:text-sm max-sm:pl-[0.4rem]">
              Ime adrese
            </td>
            <td className=" pl-[1.4rem] py-[0.7rem] max-sm:text-sm max-sm:pl-[0.4rem]">
              Adresa
            </td>
            <td className=" pl-[1.4rem] py-[0.7rem] max-sm:text-sm max-sm:pl-[0.4rem]">
              Detalji adrese
            </td>
            <td className=" rounded-tr-lg pl-[1.4rem] py-[0.7rem] max-sm:text-sm max-sm:pl-[0.4rem]">
              Akcija
            </td>
          </tr>
          {shippingAddress?.items?.map((address, index) => {
            return (
              <>
                <tr
                  className={`divide-x divide-white ${index % 2 !== 0 ? "bg-[#ededed]" : "bg-croonus-gray"}`}
                >
                  <td className=" md:pl-[1.4rem] py-[0.7rem] max-sm:text-sm max-sm:pl-[0.4rem]">
                    {address?.name}
                  </td>
                  <td className=" md:pl-[1.4rem] py-[0.7rem] max-sm:text-sm max-sm:pl-[0.4rem]">
                    {address?.address}
                  </td>
                  <td className=" md:pl-[1.4rem] py-[0.7rem] max-sm:text-sm pl-[0.4rem]">
                    <Link
                      href={`/customer-shipping/${address?.id}`}
                      className="max-sm:text-sm"
                    >
                      Pogledaj više
                    </Link>
                  </td>

                  <td className=" sm:pl-[2rem] py-[0.7rem] pl-[0.4rem]">
                    <div className="flex">
                      <Link
                        href={`/customer-shipping/${address?.id}`}
                        className=" mr-[0.8rem] hover:translate-y-0.5 transition-all ease cursor-pointer"
                      >
                        <Image
                          src={pen}
                          alt="change address"
                          width={22}
                          height={22}
                        />
                      </Link>
                      <span className="font-thin">/</span>
                      <button
                        className="hover:translate-y-0.5 transition-all ease cursor-pointer ml-[0.8rem]"
                        onClick={() => {
                          deleteAddressHandler(address?.id);
                        }}
                      >
                        <Image
                          src={trash}
                          alt="delete address"
                          width={20}
                          height={20}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ShippingAddresses;
