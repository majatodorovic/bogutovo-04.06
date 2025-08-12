import { SingleCategory, CategoryProducts } from "@/_dynamic_pages";
import { get as GET } from "@/_api/api";
import { CategoryLongDescription } from "@/_dynamic_pages/category/category-long-description";
const getSingleCategory = async (category_id) => {
  return await GET(`/categories/product/single/${category_id}`).then(
    (response) => {
      return response?.payload;
    },
  );
};

export const Category = async ({
  params: { slug_path },
  category_id,
  base_url,
}) => {
  const singleCategoryInfo = await getSingleCategory(category_id);

  return (
    <>
      <SingleCategory
        data={singleCategoryInfo}
        slug={category_id}
        base_url={base_url}
        path={slug_path}
      />

      <CategoryProducts slug={category_id} />
      <CategoryLongDescription
        longDescription={singleCategoryInfo?.basic_data?.long_description}
      />
    </>
  );
};
