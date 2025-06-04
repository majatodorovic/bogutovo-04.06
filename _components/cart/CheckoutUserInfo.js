import {
  Form,
  handleInputChange,
  handleSubmit,
} from "@/_components/shared/form";
import billing from "./billing.json";

const CheckoutUserInfo = ({
  selected,
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
  const onChange = (e, use_same_data, setFormData, setErrors) => {
    switch (true) {
      case use_same_data:
        Object?.entries(formData)?.forEach(() => {
          if (e?.target?.name?.includes("billing")) {
            let shipping_key = e?.target?.name?.replace("billing", "shipping");
            setFormData((prev) => ({
              ...prev,
              [e?.target?.name]: e?.target?.value,
              [shipping_key]: e?.target?.value,
            }));
          }
        });
        setErrors((prev) => prev.filter((error) => error !== e?.target?.name));

        break;
      case !use_same_data:
        return handleInputChange(e, setFormData, setErrors);
    }
  };

  return (
    <div className={`col-span-2 flex w-full flex-col gap-5 lg:col-span-1`}>
      <Form
        className={`grid grid-cols-2 gap-x-5`}
        errors={errors}
        data={formData}
        handleInputChange={(e) => {
          onChange(e, selected?.use_same_data, setFormData, setErrors);
        }}
        buttonClassName={`!hidden`}
        handleSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e, formData, setFormData, () => {}, billing, setErrors);
        }}
        fields={billing}
        showOptions={false}
        isPending={false}
      />
    </div>
  );
};

export default CheckoutUserInfo;
