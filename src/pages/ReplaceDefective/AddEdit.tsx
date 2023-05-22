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
  ReplaceDefective,
} from "../../api/models";

import { Radio } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import dayjs from "dayjs";
import DataSelector from "../../components/DataSelector";
import ListProducts from "../../components/ListProducts";
import { OmitStrict, enumKeys } from "../../util";

export interface AddEditProps extends OmitStrict<ModalProps, "onSubmit"> {
  initialValues: ReplaceDefective;
  isAdd: boolean;
  isEdit?: boolean;
  onSubmit: (values: ReplaceDefective) => void;
}

function AddEdit(props: AddEditProps) {
  const [isEdit, setisEdit] = useState(props.isEdit);
  const [active, setActive] = useState(0);
  const {
    initialValues = {
      id: "",
      customerId: "",
      dateTime: new Date().toISOString(),
      items: [],
      fromType: PartyType.Supplier,
      fromId: "",
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
  } = useForm<ReplaceDefective & { toType: PartyType }>({
    defaultValues: { ...initialValues, dateTime: new Date().toISOString() },
  });
  const { fields, append, prepend, remove, insert } = useFieldArray({
    control,
    name: "items", // unique name for your Field Array
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

  const handleFormSubmit = (values: ReplaceDefective) => {
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
              name="customerId"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => (
                <DataSelector
                  disabled={!isAdd}
                  error={errors.customerId?.message}
                  label="Customer"
                  type="CUSTOMER"
                  placeholder="Customer"
                  {...field}
                  withAsterisk
                />
              )}
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
                  disabled={!isAdd}
                  popoverProps={{ withinPortal: true }}
                  icon={<IconCalendar />}
                  {...field}
                  onChange={(e) => field.onChange(e?.toISOString())}
                  value={dayjs.utc(field.value).toDate()}
                />
              )}
            />
            <Space h="md" />
            <Controller
              name="fromType"
              control={control}
              rules={{
                required: "This is field is required",
              }}
              render={({ field }) => (
                <Radio.Group
                  error={errors.toType?.message}
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
                        disabled={!isAdd}
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
                <DataSelector
                  type={getValues("fromType")}
                  disabled={!isAdd}
                  label="To"
                  placeholder="From"
                  {...field}
                  error={errors.fromId?.message}
                  withAsterisk
                />
              )}
            />
            <Space h="md" />
            {!isEditWindow ? null : (
              <ListProducts<LoadOutProductItem>
                keys={[{ key: "quantity", label: "Quantity" }]}
                items={fields}
              />
            )}
          </Stepper.Step>
          <Stepper.Step label="Products">
            <ScrollArea h={400} offsetScrollbars>
              {fields.map((field, index) => (
                <>
                  <Group mt="xs" style={{ gap: 0 }} key={field.id}>
                    <Controller
                      name={`items.${index}.productId`}
                      control={control}
                      rules={{
                        required: "Product must not be empty",
                        validate: (value, formValues) => {
                          console.log(value, formValues);
                          return (
                            formValues.items.filter(
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
                          error={!!errors.items?.[index]?.productId?.message}
                          type="PRODUCT"
                          withAsterisk
                        />
                      )}
                    />
                    <Flex maw={100} align={"end"} gap={4}>
                      <Controller
                        name={`items.${index}.quantity`}
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
                              error={!!errors.items?.[index]?.quantity?.message}
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
                  {errors.items?.[index] && (
                    <Text color="red" size="sm" style={{ marginLeft: "4px" }}>
                      {errors.items?.[index]?.productId &&
                        errors.items?.[index]?.productId?.message}
                    </Text>
                  )}
                </>
              ))}
              <Group position="right" mt="md">
                <Button
                  type="button"
                  onClick={async (e) => {
                    e.preventDefault();
                    const result = await trigger("items");
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
                    ["customerId", "fromId", "fromType", "dateTime"],
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
