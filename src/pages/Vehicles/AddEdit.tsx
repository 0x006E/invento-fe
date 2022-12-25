import { Button, Group, Modal, ModalProps, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { clone } from "lodash";
import { useEffect, useState } from "react";
import { Vehicle } from "../../api/Vehicle";
import useVehicles from "../../hooks/Vehicles";

export interface AddEditProps extends Omit<ModalProps, "onSubmit"> {
  initialValues: Vehicle;
  isAdd: boolean;
  isEdit?: boolean;
  onSubmit: (values: Vehicle) => void;
}

function AddEdit(props: AddEditProps) {
  const { isUnique } = useVehicles();
  const { mutate, isLoading } = isUnique;
  const [isEdit, setisEdit] = useState(props.isEdit);
  const {
    initialValues = {
      id: "",
      type: "",
      number: "",
    },
    isAdd = true,
    onSubmit,
    isEdit: isEditProp,
    ...rest
  } = props;
  const form = useForm({
    initialValues: clone(initialValues),
    validate: {
      type: (value) =>
        value.length < 3 ? "Type must have at least 3 letters" : null,
      number: (value) =>
        value.length < 5 ? "Number must be atleast 5 letters" : null,
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

  const handleSubmit = (values: Vehicle) => {
    if (isEdit)
      if (form.isDirty("number")) {
        mutate(values.number, {
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
    <Modal title={isAdd ? "Add Vehicle" : "Edit Vehicle"} centered {...rest}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          placeholder="ID"
          hidden
          readOnly
          {...form.getInputProps("id")}
        />
        <TextInput
          label="Type"
          placeholder="Type"
          {...(isEditWindow && { readOnly: true })}
          {...form.getInputProps("type")}
        />
        <TextInput
          mt="md"
          label="Number"
          placeholder="Number"
          {...(isEditWindow && { readOnly: true })}
          {...form.getInputProps("number")}
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
