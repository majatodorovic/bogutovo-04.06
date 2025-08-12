import { Layout } from "@/_components/ui/layout";

export const CategoryLongDescription = ({ longDescription }) => {
  return (
    <>
      {longDescription && (
        <Layout>
          <div
            className={`prose max-w-full`}
            dangerouslySetInnerHTML={{ __html: longDescription }}
          />
        </Layout>
      )}
    </>
  );
};
