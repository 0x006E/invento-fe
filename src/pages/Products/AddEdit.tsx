import { Button, Group, Modal, ModalProps, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { clone } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Product } from "../../api/models/Product";
import useProducts from "../../hooks/Products";
import { OmitStrict } from "../../util";

export interface AddEditProps extends OmitStrict<ModalProps, "onSubmit"> {
  initialValues: Product;
  isAdd: boolean;
  isEdit?: boolean;
  onSubmit: (values: Product) => void;
}

function AddEdit(props: AddEditProps) {
  const { isUnique } = useProducts();
  const { mutate, isLoading } = isUnique;
  const [isEdit, setisEdit] = useState(props.isEdit);
  const {
    initialValues = {
      id: "",
      name: "",
      price: 0,
    },
    isAdd = true,
    onSubmit,
    isEdit: isEditProp,
    ...rest
  } = props;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, dirtyFields },
    reset,
  } = useForm({
    defaultValues: clone(initialValues),
  });

  useEffect(() => {
    if (!props.opened) return;
    setisEdit(!isEditProp);
    reset(initialValues);
    return () => {
      reset(initialValues);
    };
  }, [props.opened]);

  const handleFormSubmit = (values: Product) => {
    if (isEdit)
      if ("name" in dirtyFields) {
        mutate(values.name, {
          onSuccess: (isUnique) => {
            if (!isUnique) onSubmit(values);
            else
              setError("name", {
                type: "custom",
                message: "Name already exists",
              });
          },
          onError: (error) => {
            showNotification({
              title: "Error",
              message: error.message,
              color: "red",
            });
          },
        });
      } else {
        onSubmit(values);
      }
  };
  const isEditWindow = !(isEdit || isAdd);
  return (
    <Modal title={isAdd ? "Add Product" : "Edit Product"} centered {...rest}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <TextInput
          placeholder="ID"
          readOnly
          type="hidden"
          {...register("id")}
        />
        <TextInput
          label="Name"
          placeholder="Name"
          {...(isEditWindow && { disabled: true })}
          {...register("name", {
            required: "Name is required",
            minLength: 3,
          })}
          error={errors.name?.message}
          withAsterisk
        />
        <TextInput
          mt="md"
          label="Price"
          placeholder="Price"
          {...(isEditWindow && { disabled: true })}
          {...register("price", {
            valueAsNumber: true,
            required: "Price is required",
            min: 0,
            validate: (value) => value > 0 || "Price must be a valid number",
          })}
          error={errors.price?.message}
          withAsterisk
        />

        <Group position="apart" mt="xl">
          <Button type="button" variant="filled">
            Cancel
          </Button>
          {!isEditWindow ? (
            <Button
              type="submit"
              variant="filled"
              loading={isLoading}
              disabled={!isAdd && !isDirty}
            >
              {isAdd ? "Add" : "Save"}
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="filled"
                onClick={() => setisEdit(true)}
              >
                Edit
              </Button>
              <Button
                type="submit"
                variant="filled"
                style={{ display: "none" }}
                disabled
                tabIndex={-1}
              ></Button>
            </>
          )}
        </Group>
      </form>
    </Modal>
  );
}

export default AddEdit;
