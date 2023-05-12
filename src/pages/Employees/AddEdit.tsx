import {
  Button,
  Group,
  Modal,
  ModalProps,
  Radio,
  TextInput,
} from "@mantine/core";
import { clone } from "lodash";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Employee, EmployeeRoles } from "../../api/models/Employee";
import { OmitStrict, enumKeys } from "../../util";

export interface AddEditProps extends OmitStrict<ModalProps, "onSubmit"> {
  initialValues: Employee;
  isAdd: boolean;
  isEdit?: boolean;
  onSubmit: (values: Employee) => void;
}

function AddEdit(props: AddEditProps) {
  const [isEdit, setisEdit] = useState(props.isEdit);
  const {
    initialValues = {
      id: "",
      name: "",
      role: EmployeeRoles.Supplier,
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
    control,
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

  const handleFormSubmit = (values: Employee) => {
    if (isEdit) onSubmit(values);
  };
  const isEditWindow = !(isEdit || isAdd);
  return (
    <Modal title={isAdd ? "Add Employee" : "Edit Employee"} centered {...rest}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <TextInput
          placeholder="ID"
          type="hidden"
          readOnly
          {...register("id")}
        />
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Radio.Group
              {...(isEditWindow && { disabled: true })}
              error={errors.role?.message}
              label="Role"
              withAsterisk
              {...field}
            >
              <Group mt="xs">
                {enumKeys(EmployeeRoles).map((key) => (
                  <Radio
                    value={EmployeeRoles[key]}
                    label={key.replace(/([A-Z])/g, " $1").trim()}
                  />
                ))}
              </Group>
            </Radio.Group>
          )}
        />

        <TextInput
          mt="md"
          label="Name"
          placeholder="Enter name of employee"
          {...(isEditWindow && { disabled: true })}
          {...register("name", {
            required: "Name is required",
          })}
          error={errors.name?.message}
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
