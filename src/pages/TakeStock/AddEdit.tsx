import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Modal,
  ModalProps,
  NumberInput,
  Radio,
  ScrollArea,
  Space,
  Stepper,
  Text,
  TextInput,
} from "@mantine/core";
import { IconTrashFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { PartyType, TakeStock } from "../../api/models";

import PartySelector from "../../components/DataSelector";
import DataSelector from "../../components/DataSelector/DataSelector";
import ListProducts from "../../components/ListProducts";
import { OmitStrict, enumKeys } from "../../util";

export interface AddEditProps extends OmitStrict<ModalProps, "onSubmit"> {
  initialValues: TakeStock;
  isAdd: boolean;
  isEdit?: boolean;
  onSubmit: (values: TakeStock) => void;
}

function AddEdit(props: AddEditProps) {
  const [isEdit, setisEdit] = useState(props.isEdit);
  const [active, setActive] = useState(0);
  const {
    initialValues = {
      id: "",
      partyId: "",
      partyType: PartyType.Supplier,
      dayEndId: "",
      items: [],
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

  const handleFormSubmit = (values: TakeStock) => {
    if (isEdit) onSubmit(values);
  };
  const isEditWindow = !(isEdit || isAdd);

  return (
    <Modal
      title={isAdd ? "Add TakeStock" : "Edit TakeStock"}
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
              {...(isEditWindow && { disabled: true })}
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
                        {...(isEditWindow && { disabled: true })}
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
                <PartySelector
                  {...(isEditWindow && { disabled: true })}
                  label="From"
                  type={getValues("fromType")}
                  placeholder="From"
                  {...field}
                  withAsterisk
                />
              )}
            />
            <Space h="md" />
            <Controller
              name="toType"
              control={control}
              {...(isEditWindow && { disabled: true })}
              rules={{
                required: "This is field is required",
              }}
              render={({ field }) => (
                <Radio.Group
                  error={errors.fromType?.message}
                  label="To type"
                  withAsterisk
                  {...field}
                  onChange={(e) => {
                    resetField("toId");
                    field.onChange(e);
                  }}
                >
                  <Group mt="xs">
                    {enumKeys(PartyType).map((key) => (
                      <Radio
                        {...(isEditWindow && { disabled: true })}
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
              name="toId"
              control={control}
              rules={{
                required: "This is field is required",
              }}
              render={({ field }) => (
                <PartySelector
                  {...(isEditWindow && { disabled: true })}
                  label="To"
                  type={getValues("toType")}
                  placeholder="To"
                  {...field}
                  withAsterisk
                />
              )}
            />
            <Space h="md" />
            {!isEditWindow ? null : <ListProducts items={fields} />}
            <Space h="md" />
          </Stepper.Step>
          <Stepper.Step label="Products">
            <ScrollArea h={400} offsetScrollbars>
              {fields.map((field, index) => (
                <>
                  <Group mt="xs" key={field.id}>
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
                          {...field}
                          error={!!errors.items?.[index]?.productId?.message}
                          type="PRODUCT"
                          withAsterisk
                        />
                      )}
                    />
                  </Group>
                  <Flex align={"end"} gap={4}>
                    <Controller
                      name={`items.${index}.quantityEmpty`}
                      control={control}
                      rules={{
                        required: "Required",
                        min: {
                          value: 1,
                          message: "Empty must not be less than 1",
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <Space h="sm" />
                          <NumberInput
                            label="Empty"
                            placeholder="Qty"
                            error={
                              !!errors.items?.[index]?.quantityEmpty?.message
                            }
                            {...field}
                          />
                        </>
                      )}
                    />
                    <Controller
                      name={`items.${index}.quantityFull`}
                      control={control}
                      rules={{
                        required: "Required",
                        min: {
                          value: 1,
                          message: "Full must not be less than 1",
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <Space h="sm" />
                          <NumberInput
                            label="Full"
                            placeholder="Qty"
                            error={
                              !!errors.items?.[index]?.quantityFull?.message
                            }
                            {...field}
                          />
                        </>
                      )}
                    />

                    <Controller
                      name={`items.${index}.quantityDefective`}
                      control={control}
                      rules={{
                        required: "Required",
                        min: {
                          value: 1,
                          message: "Defective must not be less than 1",
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <Space h="sm" />
                          <NumberInput
                            label="Defective"
                            placeholder="Qty"
                            error={
                              !!errors.items?.[index]?.quantityDefective
                                ?.message
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
                          quantityEmpty: 1,
                          quantityFull: 1,
                          quantityDefective: 1,
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
                    ["fromId", "fromType", "toId", "toType"],
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
