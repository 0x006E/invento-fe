import { Button, Group, Modal, ModalProps, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { clone } from "lodash";
import { useEffect, useState } from "react";
import { Product } from "../../api/Product";
import useProducts from "../../hooks/Products";

export interface AddEditProps extends Omit<ModalProps, "onSubmit"> {
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
  const form = useForm({
    initialValues: clone(initialValues),
    validate: {
      name: (value) =>
        value.length < 3 ? "Name must have at least 3 letters" : null,
      price: (value) => (isNaN(value) ? "You must provide a number" : null),
    },
  });

  useEffect(() => {
    if (!props.opened) return;
    setisEdit(!isEditProp);
    form.reset();
    form.setValues(clone(initialValues));
    form.resetTouched();
    form.resetDirty();
    return () => {
      form.reset();
    };
  }, [props.opened]);

  const handleSubmit = (values: Product) => {
    if (isEdit)
      if (form.isDirty("name")) {
        mutate(values.name, {
          onSuccess: (isUnique) => {
            if (!isUnique) onSubmit(values);
            else form.setFieldError("name", "Name already exists");
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
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          placeholder="ID"
          hidden
          readOnly
          {...form.getInputProps("id")}
        />
        <TextInput
          label="Name"
          placeholder="Name"
          {...(isEditWindow && { readOnly: true })}
          {...form.getInputProps("name")}
        />
        <TextInput
          mt="md"
          label="Price"
          placeholder="Price"
          {...(isEditWindow && { readOnly: true })}
          {...form.getInputProps("price")}
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
              disabled={!isAdd && !form.isDirty()}
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
                hidden
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
