import { get as GET, fetch } from "@/_api/api";
import { Category } from "@/_dynamic_pages/category/category";
import { Product } from "@/_dynamic_pages/product/product";
import { convertHttpToHttps } from "@/_helpers/convertHttpToHttps";
import { notFound, permanentRedirect } from "next/navigation";
import { headers } from "next/headers";
import { getRobots, handleCategoryRobots } from "@/_functions";

const getBodyForHandleData = () => {
  const headersList = headers();
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const host = headersList.get("host");
  let pathname = headersList.get("x-pathname") || "/";

  if (pathname.match(/\.(css|js|map|mjs|json)$/)) {
    return null;
  }
  if (pathname.startsWith("http")) {
    pathname = new URL(pathname).pathname;
  }
  let fullUrl;
  if (process.env.NEXT_PUBLIC_URL_STRUCTURE_MODE === "test") {
    if (pathname.startsWith("/")) {
      pathname = pathname.slice(1);
    }
    fullUrl = pathname;
  } else {
    fullUrl = `${protocol}://${host}${pathname}`;
  }

  return { absolute_link: fullUrl };
};

const handleData = async (body) => {
  return await fetch(`/slugs/identify-route`, { ...body })
    .then((res) => {
      return res?.payload;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

const fetchCategorySEO = async (slug) => {
  return await GET(`/categories/product/single/seo/${slug}`).then(
    (response) => {
      return response?.payload;
    },
  );
};

const getProductSEO = async (id) => {
  return await GET(`/product-details/seo/${id}`).then((response) => {
    return response?.payload;
  });
};

const defaultMetadata = {
  title: "Početna | Bogutovo",
  description: "Dobrodošli na Bogutovo Online Shop",

  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Početna | Bogutovo",
    description: "Dobrodošli na Bogutovo Online Shop",
    type: "website",
    url: "https://bogutovo.com",
    image:
      "https://api.bogutovo.croonus.com/croonus-uploads/config/b2c/logo-2b6b458b9d1f8f9e2e62bbf21e163160.png",
    site_name: "bogutovo.com",
    locale: "sr_RS",
  },
};

export async function generateMetadata({
  searchParams: { filteri, sort, viewed, strana },
}) {
  const headersList = headers();
  let canonical = headersList?.get("x-pathname");

  const fullUrl = getBodyForHandleData();

  if (!fullUrl) {
    return null;
  }

  const data = await handleData(fullUrl);

  switch (true) {
    case data?.status === false &&
      data?.type === null &&
      data?.id === null &&
      data?.redirect_url === false:
      return defaultMetadata;

    case data?.type === "category" &&
      data?.status &&
      data?.redirect_url === false: {
      const category = await fetchCategorySEO(data?.id);

      if (category) {
        const {
          meta_title: title,
          meta_keywords: keywords,
          meta_description: description,
          meta_image: image,
          meta_canonical_link: canonical_link,
          meta_robots: robots,
          social: { share_title, share_description, share_image } = {},
        } = category;

        return {
          title: title ?? "",
          description: description ?? "",
          keywords: keywords ?? "",
          image: image ?? "",
          alternates: {
            canonical: canonical_link ?? canonical,
          },
          openGraph: {
            title: share_title || "",
            description: share_description || "",
            images: [
              {
                url: share_image || "",
                width: 800,
                height: 600,
                alt: share_description || "",
                title: share_title || "",
                description: share_description || "",
              },
            ],
          },
          robots: handleCategoryRobots(strana, filteri, sort, viewed, robots),
        };
      } else {
        return defaultMetadata;
      }
    }

    case data?.type === "product" &&
      data?.status &&
      data?.redirect_url === false: {
      const productSEO = await getProductSEO(data?.id);

      const robots = getRobots(productSEO?.meta_robots);

      const image =
        convertHttpToHttps(productSEO?.meta_image) ||
        "https://croonus.com/images/logo.png";

      if (productSEO) {
        return {
          alternates: {
            canonical: productSEO?.meta_canonical_link || canonical,
          },
          description: `${productSEO?.meta_title || ""} - ${
            productSEO?.meta_description || ""
          }`,
          keywords: productSEO?.meta_keywords || "",
          openGraph: {
            title: productSEO?.meta_title || "",
            description: productSEO?.meta_description || "",
            type: "website",
            images: [
              {
                url: image,
                width: 800,
                height: 800,
                alt: productSEO?.meta_title || productSEO?.meta_description,
              },
            ],
          },
          robots: robots,
          title: productSEO?.meta_title || "",
        };
      } else {
        return defaultMetadata;
      }
    }

    default:
      return defaultMetadata;
  }
}


const CategoryProduct = async ({
  params: { slug_path: path },
  params,
  searchParams,
}) => {
  const fullUrl = getBodyForHandleData();

  if (!fullUrl) {
    return null;
  }

  const data = await handleData(fullUrl);

  if (data?.status === false) {
    console.error(`Something went wrong! Status is false.`, data);
    return notFound();
  }

  if (fullUrl.absolute_link === data?.redirect_url) {
    console.error(`Something went wrong! Same absolute_link and redirect_url.`);
    return notFound();
  }

  const headersList = headers();
  let canonical = headersList?.get("x-pathname");

  switch (data?.code) {
    case 308:
      return permanentRedirect(`${data?.redirect_url}`);
    case 200:
      switch (data?.type) {
        case "category":
          return (
            <Category
              params={params}
              searchParams={searchParams}
              category_id={data?.id}
            />
          );
        case "product":
          return (
            <Product
              id={data?.id}
              path={path}
              category_id={path?.[path?.length - 2] ?? "*"}
              canonical={canonical}
            />
          );
      }
      break;
  }
  return notFound();
};

export default CategoryProduct;


