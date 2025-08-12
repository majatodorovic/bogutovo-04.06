"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { Thumb } from "@/_components/shared/thumb";
import { useCategoryFilters, useCategoryProducts } from "@/_hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { Layout } from "@/_components/ui/layout";
import { Filters } from "@/_dynamic_pages";
import { Pagination } from "@/_components/pagination";
import FiltersMobileWrapper from "@/_dynamic_pages/category/filters-mobile-wrapper";
import { getFilterObject, getSortObject } from "@/_helpers/categoryFilters";

export const CategoryProducts = ({ slug }) => {
  const router = useRouter();
  const params = useSearchParams();

  const filterKey = params?.get("filteri");
  const pageKey = Number(params?.get("strana"));
  const sortKey = params?.get("sort");

  const { filterArr } = getFilterObject(filterKey);

  const sortObject = getSortObject(sortKey);

  const [page, setPage] = useState(pageKey > 0 ? pageKey : 1);
  const [sort, setSort] = useState(sortObject);
  const [selectedFilters, setSelectedFilters] = useState(filterArr ?? []);
  const [availableFilters, setAvailableFilters] = useState([]);
  const [changeFilters, setChangeFilters] = useState(false);
  const [lastSelectedFilterKey, setLastSelectedFilterKey] = useState("");
  const [productsPerView, setProductsPerView] = useState(5);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);

  // update the query parameters with the selected sort, page and filters
  const updateURLQuery = (sort, selectedFilters, page) => {
    let sort_tmp;
    let filters_tmp;
    let page_tmp;
    let limit_tmp;

    if (sort?.field !== "" && sort?.direction !== "") {
      sort_tmp = `${sort?.field}_${sort?.direction}`;
    }

    if (selectedFilters?.length > 0) {
      filters_tmp = selectedFilters
        ?.map((filter) => {
          const selectedValues = filter?.value?.selected?.join("_");
          return `${filter?.column}=${selectedValues}`;
        })
        .join("::");
    } else {
      filters_tmp = "";
    }

    page_tmp = page;
    limit_tmp = 12;

    return { sort_tmp, filters_tmp, page_tmp, limit_tmp };
  };

  const generateQueryString = (sort_tmp, filters_tmp, page_tmp, limit_tmp) => {
    const query_string = `?${filters_tmp ? `filteri=${filters_tmp}` : ""}${
      filters_tmp && (sort_tmp || page_tmp) ? "&" : ""
    }${sort_tmp ? `sort=${sort_tmp}` : ""}${
      sort_tmp && page_tmp ? "&" : ""
    }${page_tmp > 1 ? `strana=${page_tmp}` : ""}`;

    return query_string;
  };

  useEffect(() => {
    const { sort_tmp, filters_tmp, page_tmp, limit_tmp } = updateURLQuery(
      sort,
      selectedFilters,
      page,
    );

    const query_string = generateQueryString(
      sort_tmp,
      filters_tmp,
      page_tmp,
      limit_tmp,
    );
    router.push(query_string, { scroll: false });
  }, [sort, selectedFilters, page]);

  // get the products for the category
  const { data } = useCategoryProducts({
    slug,
    page: pageKey ?? 1,
    limit: 12,
    sort: sortKey ?? "_",
    filterKey: filterKey,
    render: false,
  });

  useEffect(() => {
    if (data) {
      if (filterArr?.every((column) => column?.column !== "")) {
        setSelectedFilters(filterArr);
      }
      setSort(sortObject);
    }
  }, [data, filterKey, sortKey]);

  const mutateFilters = useCategoryFilters({
    slug,
    page,
    limit: 10,
    sort,
    selectedFilters,
  });

  // trigger the filter api on filter change
  useEffect(() => {
    mutateFilters.mutate({
      slug,
      selectedFilters,
      lastSelectedFilterKey,
      setAvailableFilters,
      availableFilters,
    });
  }, [selectedFilters]);

  const renderedItems = useMemo(() => {
    return data?.items?.map(({ id }) => (
      <Suspense
        key={id}
        fallback={
          <div
            className={`col-span-1 w-full min-w-0 h-full aspect-2/3 bg-slate-300 animate-pulse`}
          ></div>
        }
      >
        <Thumb id={id} refreshWishlist={() => {}} category_id={slug} />
      </Suspense>
    ));
  }, [data?.items]);

  const handleProductsPerView = (productsPerView) => {
    switch (productsPerView) {
      case 5:
        return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5";
      case 4:
        return "grid-cols-2 md:grid-cols-4";
      case 2:
        return "grid-cols-2 md:w-[60%] mx-auto";
    }
  };

  return (
    <main className={`mt-5 md:mt-10`}>
      <Filters
        selectedFilters={selectedFilters}
        availableFilters={availableFilters}
        setSelectedFilters={setSelectedFilters}
        sort={sort}
        setPage={setPage}
        setSort={setSort}
        changeFilters={changeFilters}
        tempSelectedFilters={tempSelectedFilters}
        setIsBeingFiltered={() => {}}
        pagination={data?.pagination}
        setProductsPerView={setProductsPerView}
        productsPerView={productsPerView}
        setTempSelectedFilters={setTempSelectedFilters}
        setLastSelectedFilterKey={setLastSelectedFilterKey}
        setChangeFilters={setChangeFilters}
      />

      <FiltersMobileWrapper
        selectedFilters={selectedFilters}
        availableFilters={availableFilters}
        setSelectedFilters={setSelectedFilters}
        sort={sort}
        setPage={setPage}
        setSort={setSort}
        changeFilters={changeFilters}
        pagination={data?.pagination}
        setProductsPerView={setProductsPerView}
        productsPerView={productsPerView}
        setTempSelectedFilters={setTempSelectedFilters}
        setChangeFilters={setChangeFilters}
        tempSelectedFilters={tempSelectedFilters}
        setLastSelectedFilterKey={setLastSelectedFilterKey}
      />

      <Layout className={`py-2 md:py-10`}>
        <div className={`grid ${handleProductsPerView(productsPerView)} gap-5`}>
          {renderedItems}
        </div>

        <Pagination
          generateQueryString={() => {
            const { sort_tmp, filters_tmp, page_tmp } = updateURLQuery(
              sort,
              selectedFilters,
              page,
            );
            return generateQueryString(sort_tmp, filters_tmp, page_tmp);
          }}
          data={data}
          page={page}
          slug={slug}
          setPage={setPage}
        />
      </Layout>
    </main>
  );
};
