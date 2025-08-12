import { Breadcrumbs } from "@/_components/shared/breadcrumbs";
import { Layout } from "@/_components/ui/layout";
import { generateBreadcrumbSchema } from "@/_functions";
import { CategoryChildren } from "@/_dynamic_pages/category/category-children";

export const SingleCategory = ({ slug, data, path, base_url }) => {
  return (
    <div className={`border-t border-t-[#ebebe9]`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema(
              data?.parents,
              data?.basic_data?.name,
              path,
              base_url,
            ),
          ),
        }}
      />
      <Layout>
        <div className={`mt-5 flex items-center justify-start md:justify-end`}>
          <Breadcrumbs parents={data?.parents} name={data?.basic_data?.name} />
        </div>
        <div className={`mt-5`}>
          <h1 className={`text-[1.823rem] font-bold`}>
            {data?.basic_data?.name}
          </h1>
          <div
            className={`mt-[2rem] font-normal text-[1.05rem] max-w-full w-full`}
            dangerouslySetInnerHTML={{ __html: data?.basic_data?.description }}
          ></div>
        </div>

        <CategoryChildren slug={slug} name={data?.basic_data?.name} />
      </Layout>
    </div>
  );
};
