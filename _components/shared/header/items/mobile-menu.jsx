"use client";
import { icons } from "@/_lib/icons";
import { useState } from "react";
import Link from "next/link";

export const MobileMenu = ({ items, landing_pages_list, pathname }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({ id: null, data: [] });
  const [activeSubcategory, setActiveSubcategory] = useState({ id: null, data: [] });
  const [hoverCategory, setHoverCategory] = useState(null); // kontrola crvene pozadine

  return (
    <>
      {/* Hamburger icon */}
      <span onClick={() => setOpenMenu(true)} className="xl:hidden">
        {icons.menu}
      </span>

      {/* Slide-in menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] bg-white shadow z-50 flex flex-col transition-transform duration-500 border-t-4 border-b-4 border-t-boa-red border-b-boa-red ${
          openMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col py-3 overflow-y-auto flex-1">
          {(items?.categories ?? []).map((cat) => {
            const isActive = selectedCategory.id === cat.id;

            return (
              <div key={cat.id}>
                {/* Glavna kategorija */}
                <div
                  className={`flex justify-between items-center w-full px-4 py-2 cursor-pointer ${
                    hoverCategory === cat.id ? "bg-boa-red text-white" : ""
                  }`}
                >
                  <Link
                    href={`/${cat.link.link_path}`}
                    onClick={() => {
                      setOpenMenu(false);
                      setSelectedCategory({ id: null, data: [] });
                      setActiveSubcategory({ id: null, data: [] });
                      setHoverCategory(null); // uklanja crvenu pozadinu
                    }}
                    className={`text-[1.1rem] font-semibold uppercase ${
                      hoverCategory === cat.id ? "text-white" : "text-black"
                    }`}
                  >
                    {cat.name}
                  </Link>

                  {cat.children?.length > 0 && (
                    <span
                      className="cursor-pointer px-2 py-1"
                      onClick={() => {
                        setSelectedCategory({
                          id: isActive ? null : cat.id,
                          data: isActive ? [] : cat.children,
                        });
                        setHoverCategory(isActive ? null : cat.id); // postavlja crvenu pozadinu
                      }}
                    >
                      <i
                        className={`fa-solid fa-chevron-right transform transition-transform duration-300 ${
                          isActive ? "rotate-90" : "rotate-0"
                        }`}
                      ></i>
                    </span>
                  )}
                </div>

                {/* Podkategorije */}
                {isActive &&
                  selectedCategory.data.map((sub) => {
                    const isSubActive = activeSubcategory.id === sub.id;
                    return (
                      <div key={sub.id} className="pl-6">
                        <div className="flex justify-between items-center py-2">
                          <Link
                            href={`/${sub.link.link_path}`}
                            onClick={() => {
                              setOpenMenu(false);
                              setSelectedCategory({ id: null, data: [] });
                              setActiveSubcategory({ id: null, data: [] });
                              setHoverCategory(null);
                            }}
                            className="text-[1.1rem] font-semibold"
                          >
                            {sub.name}
                          </Link>

                          {sub.children?.length > 0 && (
                            <span
                              className="cursor-pointer px-2 py-1"
                              onClick={() =>
                                setActiveSubcategory({
                                  id: isSubActive ? null : sub.id,
                                  data: isSubActive ? [] : sub.children,
                                })
                              }
                            >
                              <i
                                className={`fa-solid fa-chevron-right transform transition-transform duration-300 ${
                                  isSubActive ? "rotate-90" : "rotate-0"
                                }`}
                              ></i>
                            </span>
                          )}
                        </div>

                        {/* Nested subcategories */}
                        {isSubActive &&
                          activeSubcategory.data.map((sub2) => (
                            <Link
                              key={sub2.id}
                              href={`/${sub2.link.link_path}`}
                              onClick={() => {
                                setOpenMenu(false);
                                setSelectedCategory({ id: null, data: [] });
                                setActiveSubcategory({ id: null, data: [] });
                                setHoverCategory(null);
                              }}
                              className="text-[1.1rem] font-semibold pl-4 py-1 block"
                            >
                              {sub2.name}
                            </Link>
                          ))}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>

        {/* Landing pages */}
        <div className="mt-auto py-4 px-4 flex flex-col gap-2">
          {landing_pages_list?.items?.map((page) => (
            <Link
              key={page.id}
              href={`promo/${page.slug}`}
              onClick={() => {
                setOpenMenu(false);
                setSelectedCategory({ id: null, data: [] });
                setActiveSubcategory({ id: null, data: [] });
                setHoverCategory(null);
              }}
              className="text-[1.1rem] font-semibold text-boa-red animate-pulse"
            >
              {page.name}
            </Link>
          ))}

          {(items?.pages ?? []).map((page, i) => (
            <Link
              key={i}
              href={page.href}
              onClick={() => {
                setOpenMenu(false);
                setSelectedCategory({ id: null, data: [] });
                setActiveSubcategory({ id: null, data: [] });
                setHoverCategory(null);
              }}
              className={`text-[1.1rem] font-semibold odd:bg-[#f5f5f5] p-2 block ${
                pathname === page.href
                  ? "bg-boa-red text-white"
                  : "hover:bg-boa-red hover:text-white"
              }`}
            >
              {page.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {openMenu && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black/40 z-40"
          onClick={() => setOpenMenu(false)}
        ></div>
      )}
    </>
  );
};

export default MobileMenu;