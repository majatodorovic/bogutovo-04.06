"use client";
import {
  useProductThumb,
  useIsInWishlist,
  useAddToCart,
  useRemoveFromWishlist,
} from "@/_hooks";
import { useEffect, useState } from "react";
import { DiscountStickers, Prices } from "@/_components/shared/prices";
import { icons } from "@/_lib/icons";
import { Slider } from "@/_components/ui/slider";
import Link from "next/link";
import { Stickers } from "@/_components/shared/thumb";
import { ThumbVariants } from "@/_components/shared/thumb";
import { pushToDataLayer } from "@/_services/data-layer";

export const Thumb = ({
  id,
  category_id,
  show_delete = false,
  refreshWishlist = () => {},
}) => {
  // Hook za dobijanje podataka
  const { data } = useProductThumb({
    id: id,
    categoryId: category_id,
  });

  // Izvuci id_product sigurno, ili null dok ne postoji data
  const id_product = data?.basic_data?.id_product ?? null;

  // Hookovi moraju biti pozvani bez uslova:
  const { mutate: addToCart } = useAddToCart();

  // useIsInWishlist i useRemoveFromWishlist sa opcionalnim id_product
  const { data: is_in_wishlist, refetch } = useIsInWishlist({
    id: id_product,
  });

  const { mutate: removeFromWishlist, isSuccess } = useRemoveFromWishlist();

  // Lokalno stanje za varijantu
  const [hoveredVariant, setHoveredVariant] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      refreshWishlist();
    }
  }, [isSuccess, refetch, refreshWishlist]);

  // Render fallback dok nema podataka ili nema id
  if (!data?.id) {
    return null;
  }

  // Izvuci sve potrebne podatke iz data
  const {
    basic_data: { name },
    image_data,
    product_type,
    inventory,
    price,
    slug,
    link: { link_path: slug_path },
    stickers,
    variant_options,
  } = data;

  return (
    <div
      className={`col-span-1 relative group flex flex-col h-full hover:drop-shadow`}
    >
      {is_in_wishlist?.exist && show_delete && (
        <span
          onClick={() => {
            pushToDataLayer("remove_from_wishlist", data);
            removeFromWishlist({ id: is_in_wishlist?.wishlist_item_id });
          }}
          className={`absolute cursor-pointer z-[5] top-2 right-2 hover:text-boa-red`}
        >
          {icons.close}
        </span>
      )}
      <div className={`relative overflow-hidden rounded-xl border-[1px] border-gray-300`}>
        <Slider
          data={data}
          slidesPerView={1}
          spaceBetween={0}
          slug_path={slug_path}
          rewind={true}
          images={
            image_data?.length > 0
              ? image_data
              : [
                  {
                    url: "/images/noimg.jpg",
                    descriptions: { alt: "Bogutovo" },
                    file_data: {
                      width: 960,
                      height: 1200,
                    },
                  },
                ]
          }
          hoveredVariant={hoveredVariant}
        />
      </div>
      <div className={`pt-4`}>
        <ThumbVariants
          variant_options={variant_options}
          product_type={product_type}
          slug={slug}
          hoveredVariant={hoveredVariant}
          setHoveredVariant={setHoveredVariant}
          addToCart={addToCart}
        />
        <Link
          href={`/${slug_path}`}
          onClick={() => {
            pushToDataLayer("view_item", data);
          }}
        >
          <p
            className={`text-[1rem] mt-2 font-medium group-hover:text-boa-red line-clamp-1`}
          >
            {name}
          </p>
        </Link>
        <Prices price={price} inventory={inventory} />
      </div>
      <DiscountStickers price={price} />
      <Stickers stickers={stickers} position={`thumb`} />
    </div>
  );
};
