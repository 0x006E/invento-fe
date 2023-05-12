import {
  Button,
  Group,
  Modal,
  ModalProps,
  NativeSelect,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Customer } from "../../api/models/Customer";
import statesList from "../../assets/states.json";
import useCustomers from "../../hooks/Customers";
import { OmitStrict } from "../../util";

export interface AddEditProps extends OmitStrict<ModalProps, "onSubmit"> {
  initialValues: Customer;
  isAdd: boolean;
  isEdit?: boolean;
  onSubmit: (values: Customer) => void;
}

function AddEdit(props: AddEditProps) {
  const { isUnique } = useCustomers();
  const { mutate, isLoading } = isUnique;
  const [isEdit, setisEdit] = useState(props.isEdit);
  const {
    initialValues = {
      id: "",
      name: "",
      phoneNumber: "",
      address: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
      },
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
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (!props.opened) return;
    setisEdit(!isEditProp);
    reset(initialValues);
    return () => {
      reset(initialValues);
    };
  }, [props.opened]);

  const handleFormSubmit = (values: Customer) => {
    if (isEdit)
      if ("phoneNumber" in dirtyFields) {
        mutate(values.name, {
          onSuccess: (isUnique) => {
            if (!isUnique) onSubmit(values);
            else
              setError("phoneNumber", {
                type: "custom",
                message: "Phone Number already exists",
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
    <Modal title={isAdd ? "Add Customer" : "Edit Customer"} centered {...rest}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <TextInput
          placeholder="ID"
          type="hidden"
          readOnly
          {...register("id")}
        />
        <TextInput
          label="Name"
          placeholder="Enter name for customer"
          {...(isEditWindow && { disabled: true })}
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name should be at least 3 characters",
            },
          })}
          error={errors.name?.message}
          withAsterisk
        />
        <TextInput
          label="Phone Number"
          placeholder="Ex: +91 1234567890"
          {...(isEditWindow && { disabled: true })}
          {...register("phoneNumber", {
            required: "Phone Number is required",
            pattern: {
              value: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
              message: "Phone Number should be a valid 10 digit number",
            },
          })}
          error={errors.name?.message}
          withAsterisk
        />
        <TextInput
          label="Address Line 1"
          {...(isEditWindow && { disabled: true })}
          {...register("address.addressLine1", {
            required: "Address Line 1 is required",
            minLength: {
              value: 3,
              message: "Address Line 1 should be at least 3 characters",
            },
          })}
          error={errors.address?.addressLine1?.message}
          withAsterisk
        />
        <TextInput
          label="Address Line 2"
          {...(isEditWindow && { disabled: true })}
          {...register("address.addressLine2", {
            minLength: {
              value: 3,
              message: "Address Line 2 should be at least 3 characters",
            },
          })}
          error={errors.address?.addressLine2?.message}
        />
        <TextInput
          label="City"
          {...(isEditWindow && { disabled: true })}
          {...register("address.city", {
            required: "City is required",
            minLength: {
              value: 3,
              message: "City should be at least 3 characters",
            },
          })}
          error={errors.address?.city?.message}
          withAsterisk
        />
        <NativeSelect
          data={Object.values(statesList)}
          label="State"
          {...(isEditWindow && { disabled: true })}
          {...register("address.state", {
            required: "State is required",
            minLength: {
              value: 3,
              message: "State should be at least 3 characters",
            },
          })}
          error={errors.address?.state?.message}
          withAsterisk
        />
        <TextInput
          label="Pincode"
          {...(isEditWindow && { disabled: true })}
          {...register("address.pincode", {
            required: "Pincode is required",
            minLength: {
              value: 6,
              message: "Pincode should be at least 6 characters",
            },
            maxLength: {
              value: 6,
              message: "Pincode should be at most 6 characters",
            },
            pattern: {
              value: /^[1-9][0-9]{5}$/,
              message: "Pincode should be a valid 6 digit number",
            },
          })}
          error={errors.address?.pincode?.message}
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
