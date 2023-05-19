import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Loader,
  Modal,
  ModalProps,
  NumberInput,
  Radio,
  ScrollArea,
  Select,
  Space,
  Stepper,
  Text,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTrashFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { PartyType } from "../../api/models/PartyType";
import { Sale } from "../../api/models/Sale";
import useCustomers from "../../hooks/Customers";
import useProducts from "../../hooks/Products";
import useSuppliers from "../../hooks/Suppliers";
import useVehicles from "../../hooks/Vehicles";
import useWarehouses from "../../hooks/Warehouses";
import { OmitStrict, enumKeys } from "../../util";

export interface AddEditProps extends OmitStrict<ModalProps, "onSubmit"> {
  initialValues: Sale;
  isAdd: boolean;
  isEdit?: boolean;
  onSubmit: (values: Sale) => void;
}

function AddEdit(props: AddEditProps) {
  const [isEdit, setisEdit] = useState(props.isEdit);
  const [active, setActive] = useState(0);
  const {
    initialValues = {
      id: "",
      dateTime: "",
      invoiceNumber: "string",
      customerId: "",
      employeeId: "",
      fromId: "",
      fromType: PartyType.Warehouse,
      retailSailPrice: 0,
      discount: 0,
      netAmount: 0,
      saleItems: [],
      paid: true,
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
    defaultValues: initialValues,
  });
  const { fields, append, prepend, remove, insert } = useFieldArray({
    control,
    name: "saleItems", // unique name for your Field Array
  });

  const { customersShort } = useCustomers();
  const { suppliers } = useSuppliers();
  const { warehousesShort } = useWarehouses();
  const { vehiclesShort } = useVehicles();
  const { productsShort } = useProducts();
  const {
    isError: customerIsError,
    isFetching: customerIsFetching,
    isLoading: customerIsLoading,
    refetch: refetchCustomerData,
    data: customerData,
  } = customersShort();

  const {
    isError: supplierIsError,
    isFetching: supplierIsFetching,
    isLoading: supplierIsLoading,
    refetch: refetchSupplierData,
    data: supplierData,
  } = suppliers();
  const {
    isError: vehicleIsError,
    isFetching: vehicleIsFetching,
    isLoading: vehicleIsLoading,
    refetch: refetchVehicleData,
    data: vehicleData,
  } = vehiclesShort();
  const {
    isError: warehouseIsError,
    isFetching: warehouseIsFetching,
    isLoading: warehouseIsLoading,
    refetch: refetchWarehouseData,
    data: warehouseData,
  } = warehousesShort();

  const {
    isError: productIsError,
    isFetching: productIsFetching,
    isLoading: productIsLoading,
    refetch: refetchProductData,
    data: productData,
  } = productsShort();

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

  const handleFormSubmit = (values: Sale) => {
    setValue("dateTime", new Date().toISOString());
    if (isEdit) onSubmit(values);
  };
  const isEditWindow = !(isEdit || isAdd);

  if (vehicleIsError) {
    notifications.show({
      title: "Error",
      message: "Failed to load vehicle data",
      color: "red",
    });
    return <></>;
  }
  if (productIsError) {
    notifications.show({
      title: "Error",
      message: "Failed to load product data",
      color: "red",
    });
    return <></>;
  }
  if (warehouseIsError) {
    notifications.show({
      title: "Error",
      message: "Failed to load warehouse data",
      color: "red",
    });
    return <></>;
  }
  if (supplierIsError) {
    notifications.show({
      title: "Error",
      message: "Failed to load supplier  data",
      color: "red",
    });
    return <></>;
  }
  if (customerIsError) {
    notifications.show({
      title: "Error",
      message: "Failed to load customer data",
      color: "red",
    });
    return <></>;
  }

  const refetchFromIdData = () => {
    switch (getValues("fromType")) {
      case PartyType.Supplier:
        refetchSupplierData();
        break;
      case PartyType.Vehicle:
        refetchVehicleData();
        break;
      case PartyType.Warehouse:
        refetchWarehouseData();
        break;
    }
  };
  const fromIdData = (() => {
    switch (getValues("fromType")) {
      case PartyType.Supplier:
        return supplierData;
      case PartyType.Vehicle:
        return vehicleData;
      case PartyType.Warehouse:
        return warehouseData;
    }
  })();

  const fromIdLoading =
    supplierIsFetching ||
    supplierIsLoading ||
    vehicleIsFetching ||
    vehicleIsLoading ||
    warehouseIsFetching ||
    warehouseIsLoading;

  return (
    <Modal
      title={isAdd ? "Add Sale" : "Edit Sale"}
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
            <Controller
              name="fromType"
              control={control}
              rules={{
                required: "This is field is required",
              }}
              render={({ field }) => (
                <Radio.Group
                  error={errors.fromType?.message}
                  label="From type"
                  withAsterisk
                  {...field}
                  onChange={(e) => {
                    resetField("fromId");
                    field.onChange(e);
                  }}
                >
                  <Group mt="xs">
                    {enumKeys(PartyType).map((key) => (
                      <Radio
                        disabled={isEditWindow}
                        key={key}
                        value={PartyType[key]}
                        label={key.replace(/([A-Z])/g, " $1").trim()}
                      />
                    ))}
                  </Group>
                </Radio.Group>
              )}
            />
            <Space h="md" />
            <Controller
              name="fromId"
              control={control}
              rules={{
                required: "This is field is required",
              }}
              render={({ field }) => (
                <Select
                  onDropdownOpen={() => refetchFromIdData()}
                  label="From"
                  placeholder="From"
                  {...field}
                  rightSection={fromIdLoading ? <Loader size={16} /> : null}
                  error={errors.fromId?.message}
                  data={
                    !fromIdData
                      ? []
                      : fromIdData.map((c) => ({
                          label: "number" in c ? c.number : c.name,
                          value: c.id,
                        }))
                  }
                  withAsterisk
                />
              )}
            />
            <Space h="md" />
            <Controller
              name="customerId"
              control={control}
              rules={{
                required: "This is field is required",
              }}
              render={({ field }) => (
                <Select
                  onDropdownOpen={() => refetchCustomerData()}
                  label="Customer"
                  placeholder="Customer"
                  {...field}
                  rightSection={
                    customerIsFetching || customerIsLoading ? (
                      <Loader size={16} />
                    ) : null
                  }
                  error={errors.fromId?.message}
                  data={
                    !customerData
                      ? []
                      : customerData.map((c) => ({
                          label: c.name,
                          value: c.id,
                        }))
                  }
                  withAsterisk
                />
              )}
            />
            <Space h="md" />
            <Controller
              name="employeeId"
              control={control}
              rules={{
                required: "This is field is required",
              }}
              render={({ field }) => (
                <Select
                  onDropdownOpen={() => refetchSupplierData()}
                  label="Employee"
                  placeholder="Employee"
                  {...field}
                  rightSection={fromIdLoading ? <Loader size={16} /> : null}
                  error={errors.employeeId?.message}
                  data={
                    !supplierData
                      ? []
                      : supplierData.map((c) => ({
                          label: c.name,
                          value: c.id,
                        }))
                  }
                  withAsterisk
                />
              )}
            />
            <Controller
              name={`discount`}
              control={control}
              rules={{
                min: {
                  value: 0,
                  message: "Dsicount must not be less than 0",
                },
              }}
              render={({ field }) => (
                <>
                  <NumberInput
                    label="Discount"
                    placeholder="0.0"
                    precision={2}
                    step={0.5}
                    decimalSeparator=","
                    thousandsSeparator="."
                    error={errors.discount?.message}
                    {...field}
                  />
                </>
              )}
            />
          </Stepper.Step>
          <Stepper.Step label="Products">
            <ScrollArea h={400} offsetScrollbars>
              {fields.map((field, index) => (
                <>
                  <Group mt="xs" key={field.id}>
                    <Controller
                      name={`saleItems.${index}.productId`}
                      control={control}
                      rules={{
                        required: "Product must not be empty",
                        validate: (value, formValues) => {
                          console.log(value, formValues);
                          return (
                            formValues.saleItems.filter(
                              (e) => e.productId === value
                            ).length === 1 || "Already existing item"
                          );
                        },
                      }}
                      render={({ field }) => (
                        <Select
                          style={{ flexGrow: 1 }}
                          onDropdownOpen={() => refetchProductData()}
                          placeholder="Select Product"
                          {...field}
                          rightSection={
                            productIsFetching || productIsLoading ? (
                              <Loader size={16} />
                            ) : null
                          }
                          error={
                            !!errors.saleItems?.[index]?.productId?.message
                          }
                          data={
                            !productData
                              ? []
                              : productData.map((c) => ({
                                  label: c.name,
                                  value: c.id,
                                }))
                          }
                          withAsterisk
                        />
                      )}
                    />
                    <Flex maw={100} align={"center"}>
                      <Controller
                        name={`saleItems.${index}.quantity`}
                        control={control}
                        rules={{
                          required: "Required",
                          min: {
                            value: 1,
                            message: "Qty must not be less than 1",
                          },
                        }}
                        render={({ field }) => (
                          <>
                            <Space h="sm" />
                            <NumberInput
                              placeholder="Qty"
                              error={
                                !!errors.saleItems?.[index]?.quantity?.message
                              }
                              {...field}
                            />
                          </>
                        )}
                      />
                    </Flex>
                    <ActionIcon
                      variant="outline"
                      color="red"
                      onClick={() => remove(index)}
                    >
                      <IconTrashFilled size="1rem" />
                    </ActionIcon>
                  </Group>
                  {errors.saleItems?.[index] && (
                    <Text color="red" size="sm" style={{ marginLeft: "4px" }}>
                      {errors.saleItems?.[index]?.productId &&
                        errors.saleItems?.[index]?.productId?.message +
                          " - " +
                          errors.saleItems?.[index]?.quantity &&
                        errors.saleItems?.[index]?.quantity?.message}
                    </Text>
                  )}
                </>
              ))}
              <Group position="right" mt="md">
                <Button
                  type="button"
                  onClick={async (e) => {
                    e.preventDefault();
                    const result = await trigger("saleItems");
                    if (result)
                      append(
                        { productId: "", quantity: 1 },
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
                    ["fromId", "customerId", "employeeId", "fromType"],
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
