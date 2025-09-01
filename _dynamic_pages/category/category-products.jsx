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
  const [productsPerView, setProductsPerView] = useState(4); // default laptop
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);

  // Dinamički broj kolona po širini ekrana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) {
        setProductsPerView(5); // desktop
      } else if (window.innerWidth >= 1024) {
        setProductsPerView(4); // laptop
      } else if (window.innerWidth >= 768) {
        setProductsPerView(3); // tablet
      } else {
        setProductsPerView(2); // mobilni (ne diramo logiku)
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dinamički limit po broju kolona
  const calculateLimit = (ppv) => {
    if (ppv === 5) return 15; // desktop
    if (ppv === 4) return 12; // laptop
    if (ppv === 3) return 12; // tablet
    return 6; // mobilni (ostavljeno kako je bilo)
  };

  const limit = useMemo(() => calculateLimit(productsPerView), [productsPerView]);

  // update query parametara
  const updateURLQuery = (sort, selectedFilters, page, limit) => {
    let sort_tmp;
    let filters_tmp;
    let page_tmp;

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

    return { sort_tmp, filters_tmp, page_tmp, limit_tmp: limit };
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
      limit
    );

    const query_string = generateQueryString(
      sort_tmp,
      filters_tmp,
      page_tmp,
      limit_tmp
    );

    router.push(query_string, { scroll: false });
  }, [sort, selectedFilters, page, limit]);

  // fetch proizvoda
  const { data } = useCategoryProducts({
    slug,
    page: pageKey ?? 1,
    limit,
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
          <div className="col-span-1 w-full min-w-0 h-full aspect-2/3 bg-slate-300 animate-pulse"></div>
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
      case 3:
        return "grid-cols-2 md:grid-cols-3";
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
