"use client";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { list as LIST } from "@/_api/api";
import { Layout } from "@/_components/ui/layout";
import { Breadcrumbs } from "@/_components/shared/breadcrumbs";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapLoading = () => (
  <div className="w-full h-[500px] mt-5 flex items-center justify-center bg-gray-100">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
    <span className="ml-3">Mapa se učitava...</span>
  </div>
);

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export const Locations = () => {
  const [customIcon, setCustomIcon] = useState(null);
  const [selected, setSelected] = useState({
    country: "Serbia",
    town: "Beograd",
  });

  const [findStore, setFindStore] = useState(false);

  const [places, setPlaces] = useState([
    {
      lat: "",
      lng: "",
    },
  ]);

  const findPlaces = (data, selected) => {
    const places = [];
    data?.items?.map(({ country_name, town_name, latitude, longitude }) => {
      const isTownInSelectedCountry = country_name === selected?.country;
      const isTownSelected = town_name === selected?.town;
      if (isTownInSelectedCountry && isTownSelected) {
        places.push({
          lat: latitude,
          lng: longitude,
        });
      }
    });
    setPlaces(places);
  };

  const { data } = useQuery({
    queryKey: ["prodajna-mesta"],
    queryFn: async () => {
      return await LIST(`/stores/retails`, { limit: -1 }).then((res) => {
        findPlaces(res?.payload, { country: "Serbia", town: "Beograd" });
        setFindStore(true);
        showMapHandler();
        return res?.payload;
      });
    },
  });

  const [showMap, setShowMap] = useState(false);

  const showMapHandler = useCallback(() => {
    const btn = document?.getElementById("findButton");
    setShowMap(true);
    btn?.click();
  }, []);

  useEffect(() => {
    if (selected?.country && selected?.town) {
      setTimeout(() => {
        showMapHandler();
      }, 1000);
    }
  }, [selected]);

  useEffect(() => {
    import("leaflet").then((L) => {
      setCustomIcon(
        new L.Icon({
          iconUrl: "/icons/location-pin.png",
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
        }),
      );
    });
  }, []);

  const uniqueTowns = new Set();

  return (
    <Layout className={``}>
      <div className={`ml-auto flex justify-start md:justify-end mt-5`}>
        <Breadcrumbs name={`Prodajna mesta`} parents={[]} />
      </div>
      <h1 className={`text-[1.823rem] font-bold my-5`}>Prodajna mesta</h1>
      <div className={`flex items-center gap-5 max-lg:flex-wrap`}>
        <select
          value={selected?.country}
          className={`cursor-pointer border border-slate-300 focus:border-slate-300 focus:outline-0 focus:ring-0 group-hover:bg-black max-md:mr-auto max-md:w-full max-md:text-[16px]`}
          onChange={(e) => {
            setSelected({ town: "", country: e.target.value });
            setFindStore(false);
            setShowMap(false);
          }}
        >
          <option value="">Izaberite državu</option>
          {(data?.items || [])
            .map(({ country_name }) => country_name)
            .filter(Boolean)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((uniqueCountry, index) => {
              const countryMapping = {
                Serbia: "Srbija",
                Montenegro: "Crna Gora",
                "Bosnia and Herzegovina": "Bosna i Hercegovina",
                Croatia: "Hrvatska",
                Slovenia: "Slovenija",
                Hungary: "Mađarska",
                Macedonia: "Makedonija",
                Slovakia: "Slovačka",
              };
              return (
                <option key={index} value={uniqueCountry}>
                  {countryMapping[uniqueCountry] || uniqueCountry}
                </option>
              );
            })}
        </select>
        <select
          value={selected?.town}
          className={`cursor-pointer border border-slate-300 focus:border-slate-300 focus:outline-0 focus:ring-0 group-hover:bg-black max-md:mr-auto max-md:w-full max-md:text-[16px]`}
          onChange={(e) => {
            setSelected({ ...selected, town: e.target.value });
            findPlaces(data, {
              country: selected.country,
              town: e.target.value,
            });

            setShowMap(true);
            setFindStore(true);
          }}
        >
          <option value="">Izaberite grad</option>
          {data?.items?.map(({ country_name, town_name }) => {
            if (
              country_name === selected?.country &&
              !uniqueTowns.has(town_name)
            ) {
              uniqueTowns.add(town_name);
              return (
                <option key={town_name} value={town_name}>
                  {town_name}
                </option>
              );
            }
            return null;
          })}
        </select>
      </div>
      <div className={`flex flex-col items-start md:gap-10 lg:flex-row`}>
        {findStore && (
          <div
            className={`mt-10 flex flex-col max-md:divide-y md:gap-7 md:min-w-[20%] md:max-w-[20%] !w-full`}
          >
            {data?.items?.map((item, i) => {
              const isTownInSelectedCountry =
                item.country_name === selected?.country;
              const isTownSelected = item.town_name === selected?.town;
              return (
                isTownInSelectedCountry &&
                isTownSelected && (
                  <div key={i} className={` max-md:py-6 `}>
                    <h1
                      className={`mb-3 text-[1.5rem] font-medium max-md:text-[1.3rem]`}
                    >
                      {item?.name}
                    </h1>
                    <div className={`flex items-start gap-10`}>
                      <div className={`flex flex-col gap-1`}>
                        <p className={`text-[.9rem] max-md:text-[16px]`}>
                          {item?.town_name} - {item?.address}
                        </p>
                        <Link
                          href={`tel:${
                            item.phone?.includes("381") ||
                            item?.phone?.includes("382") ||
                            item?.phone?.includes("387") ||
                            item?.phone?.includes("386")
                              ? "+"
                              : ""
                          }${item.phone}`}
                          className={`text-[.9rem] underline max-md:text-[16px]`}
                        >
                          {item.phone?.includes("381") ||
                          item?.phone?.includes("382") ||
                          item?.phone?.includes("387") ||
                          item?.phone?.includes("386")
                            ? "+"
                            : ""}
                          {item.phone}
                        </Link>
                        <Link
                          href={`mailto:${item?.email}`}
                          className={`text-[.9rem] underline max-md:text-[16px]`}
                        >
                          {item.email}
                        </Link>
                        {item?.work_hours && (
                          <div className={`flex flex-col gap-1`}>
                            <span className={`font-medium max-md:!text-[16px]`}>
                              Radno vreme:
                            </span>
                            <p
                              className={`prose text-[.9rem] prose-p:!text-[16px] max-md:!text-[16px]`}
                              dangerouslySetInnerHTML={{
                                __html: item?.work_hours,
                              }}
                            ></p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        )}
        {selected?.country && selected?.town && showMap && findStore ? (
          <MapContainer
            key={`${selected.country}-${selected.town}`}
            center={[places[0].lat, places[0].lng]}
            zoom={12}
            scrollWheelZoom={true}
            className="w-full h-[500px] mt-5"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {places.map((place, index) => (
              <Marker
                key={index}
                position={[place.lat, place.lng]}
                icon={customIcon}
              >
                <Popup>
                  <strong>{place.name}</strong>
                  <br />
                  {place.address}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <>
            {!data ? (
              <MapLoading />
            ) : (
              <>
                {places?.length > 0 ? (
                  <div className="w-full h-[500px] mt-5"></div>
                ) : (
                  <div className="w-full h-[500px] mt-5 flex items-center justify-center bg-gray-100">
                    <p className="ml-3">Odaberi lokaciju</p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};
