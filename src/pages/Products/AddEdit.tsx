import { Button, Group, Modal, ModalProps, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { Product } from "../../api/Product";

export interface AddEditProps extends Omit<ModalProps, "onSubmit"> {
  initialValues: Product;
  isAdd: boolean;
  onSubmit: (values: Product) => void;
}

function AddEdit(props: AddEditProps) {
  const {
    initialValues = {
      id: "",
      name: "",
      price: 0,
    },
    isAdd = true,
    onSubmit,
    ...rest
  } = props;
  const form = useForm({
    initialValues: {
      id: "",
      name: "",
      price: 0,
    },
    validate: {
      name: (value) =>
        value.length < 3 ? "Name must have at least 3 letters" : null,
      price: (value) => (isNaN(value) ? "You must provide a number" : null),
    },
  });
  useEffect(() => {
    if (!props.opened) return;
    form.setValues(initialValues);
    return () => {
      form.reset();
    };
  }, [props.opened]);
  return (
    <Modal title={isAdd ? "Add Product" : "Edit Product"} centered {...rest}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          placeholder="ID"
          hidden
          readOnly
          {...form.getInputProps("id")}
        />
        <TextInput
          label="Name"
          placeholder="Name"
          {...form.getInputProps("name")}
        />
        <TextInput
          mt="md"
          label="Price"
          placeholder="Price"
          {...form.getInputProps("price")}
        />

        <Group position="apart" mt="xl">
          <Button type="button" variant="filled">
            Cancel
          </Button>
          <Button type="submit" variant="filled">
            {isAdd ? "Add" : "Save"}
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

export default AddEdit;
