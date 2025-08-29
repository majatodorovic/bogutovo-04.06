import { Swiper } from "@/_components/banner-slider/swiper";
import { Layout } from "@/_components/ui/layout";

export const BannerSlider = ({ banners, type = "banner" }) => {
  return (
    <Layout>
      <Swiper
        className={"!hidden md:!block"}
        swiper_data={{
          slidesPerView: 1,
          spaceBetween: 0,
          rewind: true,
          autoplay: {
            delay: 10000,
            disableOnInteraction: false,
          },
          pagination: {
            clickable: true,
          },
          modules: ["Autoplay"],
          slides: banners?.desktop,
          num_of_slides: banners?.desktop?.length,
          type: type,
          imageLoading: banners?.imageLoading,
          imagePriority: banners?.imagePriority,
        }}
      />
      <Swiper
        className={"md:!hidden"}
        swiper_data={{
          slidesPerView: 1,
          spaceBetween: 0,
          rewind: true,
          autoplay: {
            delay: 10000,
            disableOnInteraction: false,
          },
          pagination: {
            clickable: true,
          },
          modules: ["Autoplay"],
          slides: banners?.mobile,
          num_of_slides: banners?.mobile?.length,
          type: type,
          imageLoading: banners?.imageLoading,
          imagePriority: banners?.imagePriority,
        }}
      />
    </Layout>
  );
};
