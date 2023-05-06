import {
  Button,
  Group,
  Modal,
  ModalProps,
  NativeSelect,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { clone } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Vehicle } from "../../api/models/Vehicle";
import vehicleType from "../../assets/vehicle-types.json";
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
      type: "car",
      number: "",
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
      reset();
    };
  }, [props.opened]);

  const handleFormSubmit = (values: Vehicle) => {
    if (isEdit)
      if ("number" in dirtyFields) {
        mutate(values.number, {
          onSuccess: (isUnique) => {
            if (!isUnique) onSubmit(values);
            else
              setError("number", {
                type: "custom",
                message: "Number already exists",
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
    <Modal title={isAdd ? "Add Vehicle" : "Edit Vehicle"} centered {...rest}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <TextInput
          placeholder="ID"
          type="hidden"
          readOnly
          {...register("id")}
        />
        <NativeSelect
          label="Type"
          placeholder="Type"
          data={vehicleType}
          {...register("type", {
            required: "Type is required",
          })}
          {...(isEditWindow && { disabled: true })}
          error={errors.type?.message}
          withAsterisk
        />
        <TextInput
          mt="md"
          label="Number"
          placeholder="Enter number with spaces instead of hyphens"
          {...(isEditWindow && { disabled: true })}
          {...register("number", {
            required: "Number is required",
            pattern: {
              value: /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/,
              message: "Vehicle Number is not of valid format",
            },
          })}
          error={errors.number?.message}
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
