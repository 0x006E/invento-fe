import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Modal,
  ModalProps,
  NumberInput,
  ScrollArea,
  Space,
  Stepper,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCalendar, IconTrashFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  LoadOutProductItem,
  PartyType,
  WarehouseLoadOut,
} from "../../api/models";

import { DateTimePicker } from "@mantine/dates";
import dayjs from "dayjs";
import DataSelector from "../../components/DataSelector";
import ListProducts from "../../components/ListProducts";
import { OmitStrict } from "../../util";

export interface AddEditProps extends OmitStrict<ModalProps, "onSubmit"> {
  initialValues: WarehouseLoadOut;
  isAdd: boolean;
  isEdit?: boolean;
  onSubmit: (values: WarehouseLoadOut) => void;
}

function AddEdit(props: AddEditProps) {
  const [isEdit, setisEdit] = useState(props.isEdit);
  const [active, setActive] = useState(0);
  const {
    initialValues = {
      id: "",
      warehouseId: "",
      vehicleNumber: "",
      imageUrl: "",
      ervnumber: "",
      dateTime: new Date().toISOString(),
      products: [],
    },
    isAdd = true,
    onSubmit,
    isEdit: isEditProp,
    ...rest
  } = props;
  const {
    register,
    handleSubmit,
    trigger,
    control,
    getValues,
    resetField,
    formState: { errors, isDirty, dirtyFields },
    reset,
    setValue,
  } = useForm({
    defaultValues: { ...initialValues, dateTime: new Date().toISOString() },
  });
  const { fields, append, prepend, remove, insert } = useFieldArray({
    control,
    name: "products", // unique name for your Field Array
  });

  const nextStep = () =>
    setActive((current) => (current < 1 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    if (!props.opened) return;
    setisEdit(!isEditProp);
    setActive(0);
    reset(initialValues);
    return () => {
      reset(initialValues);
    };
  }, [props.opened]);

  const handleFormSubmit = (values: WarehouseLoadOut) => {
    if (isEdit) onSubmit(values);
  };
  const isEditWindow = !(isEdit || isAdd);

  return (
    <Modal
      title={isAdd ? "Add Warehouse Load Out" : "Edit Warehouse Load Out"}
      centered
      {...rest}
      size="lg"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Basic Details">
            <TextInput
              placeholder="ID"
              type="hidden"
              readOnly
              {...register("id")}
            />
            <Space h="md" />
            <Controller
              name="warehouseId"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => (
                <DataSelector
                  disabled={!isAdd}
                  error={errors.warehouseId?.message}
                  label="Warehouse"
                  type={PartyType.Warehouse}
                  placeholder="Warehouse"
                  {...field}
                  withAsterisk
                />
              )}
            />
            <Space h="md" />
            <TextInput
              mt="md"
              label="Vehicle Number"
              placeholder="Eg: KL 01 AB 1234"
              disabled={isEditWindow}
              {...register("vehicleNumber", {
                required: "This is required",
                pattern: {
                  value:
                    /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/,
                  message: "Vehicle Number is not of valid format",
                },
              })}
              error={errors.vehicleNumber?.message}
              withAsterisk
            />
            <Space h="md" />
            <Controller
              name="dateTime"
              control={control}
              rules={{
                required: "This is field is required",
              }}
              render={({ field }) => (
                <DateTimePicker
                  label="Date"
                  placeholder="Date"
                  disabled={isEditWindow}
                  popoverProps={{ withinPortal: true }}
                  icon={<IconCalendar />}
                  {...field}
                  onChange={(e) => field.onChange(e?.toISOString())}
                  value={dayjs.utc(field.value).toDate()}
                />
              )}
            />
            <Space h="md" />
            <TextInput
              mt="md"
              label="ERV Number"
              placeholder="ERV Number"
              disabled={isEditWindow}
              {...register("ervnumber", {
                required: "This is required",
              })}
              error={errors.vehicleNumber?.message}
              withAsterisk
            />
            <Space h="md" />
            {!isEditWindow ? null : (
              <ListProducts<LoadOutProductItem>
                keys={[{ key: "quantity", label: "Quantity" }]}
                items={fields}
              />
            )}
            <Space h="md" />
          </Stepper.Step>
          <Stepper.Step label="Products">
            <ScrollArea h={400} offsetScrollbars>
              {fields.map((field, index) => (
                <>
                  <Group mt="xs" style={{ gap: 0 }} key={field.id}>
                    <Controller
                      name={`products.${index}.productId`}
                      control={control}
                      rules={{
                        required: "Product must not be empty",
                        validate: (value, formValues) => {
                          console.log(value, formValues);
                          return (
                            formValues.products.filter(
                              (e) => e.productId === value
                            ).length === 1 || "Already existing item"
                          );
                        },
                      }}
                      render={({ field }) => (
                        <DataSelector
                          style={{ flexGrow: 1 }}
                          placeholder="Select Product"
                          label="Product"
                          {...field}
                          error={!!errors.products?.[index]?.productId?.message}
                          type="PRODUCT"
                          withAsterisk
                        />
                      )}
                    />
                    <Flex maw={100} align={"end"} gap={4}>
                      <Controller
                        name={`products.${index}.quantity`}
                        control={control}
                        rules={{
                          required: "Required",
                          min: {
                            value: 0,
                            message: "Empty must not be less than 0",
                          },
                        }}
                        render={({ field }) => (
                          <>
                            <Space h="sm" />
                            <NumberInput
                              label="Full"
                              placeholder="Qty"
                              error={
                                !!errors.products?.[index]?.quantity?.message
                              }
                              {...field}
                            />
                          </>
                        )}
                      />
                      <ActionIcon
                        mb={4}
                        variant="outline"
                        color="red"
                        onClick={() => remove(index)}
                      >
                        <IconTrashFilled size="1rem" />
                      </ActionIcon>
                    </Flex>
                  </Group>
                  {errors.products?.[index] && (
                    <Text color="red" size="sm" style={{ marginLeft: "4px" }}>
                      {errors.products?.[index]?.productId &&
                        errors.products?.[index]?.productId?.message}
                    </Text>
                  )}
                </>
              ))}
              <Group position="right" mt="md">
                <Button
                  type="button"
                  onClick={async (e) => {
                    e.preventDefault();
                    const result = await trigger("products");
                    if (result)
                      append(
                        {
                          productId: "",
                          quantity: 1,
                        },
                        { shouldFocus: true }
                      );
                  }}
                >
                  Add product
                </Button>
              </Group>
            </ScrollArea>
          </Stepper.Step>
        </Stepper>

        <Group position="apart" mt="xl">
          <Button type="button" variant="filled" onClick={prevStep}>
            {active === 0 ? "Cancel" : "Back"}
          </Button>
          {!isEditWindow ? (
            active === 1 ? (
              <Button
                type="submit"
                variant="filled"
                disabled={!isAdd && !isDirty}
              >
                {isAdd ? "Add" : "Save"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={async (e) => {
                  e.preventDefault();
                  const result = await trigger(
                    ["warehouseId", "vehicleNumber", "ervnumber"],
                    {
                      shouldFocus: true,
                    }
                  );
                  if (result) nextStep();
                }}
              >
                Next
              </Button>
            )
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
