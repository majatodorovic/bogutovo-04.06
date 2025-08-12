"use client";
import { useEffect, useState } from "react";
import { FiltersMobile } from "@/_dynamic_pages";

const FiltersMobileWrapper = ({
  availableFilters,
  selectedFilters,
  setSelectedFilters,
  tempSelectedFilters,
  setTempSelectedFilters,
  setSort,
  sort,
  changeFilters,
  setChangeFilters,
  setLastSelectedFilterKey,
  setPage,
  pagination,
  productsPerView,
  setProductsPerView,
}) => {
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    // Add overflow-hidden class to the body when openFilter is true
    if (openFilter) {
      document.body.style.overflow = "hidden"; // This disables scrolling
    } else {
      document.body.style.overflow = "auto"; // This restores scrolling
    }

    // Clean up on component unmount
    return () => {
      document.body.style.overflow = "auto"; // Ensure scroll is enabled on unmount
    };
  }, [openFilter]);

  return (
    <div
      className={`flex items-center gap-5 w-full px-2 mx-auto md:hidden bg-white py-2`}
    >
      <button
        className={`flex items-center justify-center text-[0.9rem] md:text-[1.2rem] text-center py-2 flex-1 border`}
        onClick={() => {
          setOpenFilter(true);
        }}
      >
        Filteri
      </button>
      <div className={`flex items-center gap-3`}>
        <div
          className={`w-[30px] h-[30px] border-2 ${
            productsPerView === 1 && "border-black"
          }`}
          onClick={() => setProductsPerView(1)}
        ></div>
        <div
          className={`w-[30px] h-[30px] border grid grid-cols-2 ${
            productsPerView === 2 && "border-black"
          }`}
          onClick={() => setProductsPerView(2)}
        >
          {Array.from({ length: 4 }, (_, i) => {
            return (
              <div
                key={i}
                className={`col-span-1 border ${
                  productsPerView === 2 && "border-black"
                }`}
              ></div>
            );
          })}
        </div>
      </div>
      <div
        className={
          openFilter
            ? `fixed top-0 left-0 w-full h-[100dvh] z-[3000] bg-white translate-x-0 duration-500`
            : `fixed top-0 left-0 w-full h-[100dvh] z-[3000] bg-white -translate-x-full duration-500`
        }
      >
        <FiltersMobile
          selectedFilters={selectedFilters}
          availableFilters={availableFilters}
          setSelectedFilters={setSelectedFilters}
          sort={sort}
          setPage={setPage}
          setSort={setSort}
          changeFilters={changeFilters}
          pagination={pagination}
          setProductsPerView={setProductsPerView}
          productsPerView={productsPerView}
          setFilterOpen={setOpenFilter}
          setTempSelectedFilters={setTempSelectedFilters}
          setChangeFilters={setChangeFilters}
          tempSelectedFilters={tempSelectedFilters}
          setLastSelectedFilterKey={setLastSelectedFilterKey}
        />
      </div>
    </div>
  );
};

export default FiltersMobileWrapper;
