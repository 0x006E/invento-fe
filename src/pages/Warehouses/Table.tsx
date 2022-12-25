import { Box, Button, Flex, Grid, Group, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconEdit, IconPlus, IconSearch } from "@tabler/icons";
import { cloneDeep } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import { Warehouse } from "../../api/Warehouse";
import useWarehouses from "../../hooks/Warehouses";
import AddEdit from "./AddEdit";

const PAGE_SIZES = [10, 15, 20];
const emptyWarehouse = {
  id: "",
  name: "",
  address: {
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  },
};

export default function WarehousesTable() {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "",
    direction: "asc",
  });
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);

  const { warehouses, add, remove, update } = useWarehouses(pageSize);
  const { data, isFetching, isError, refetch } = warehouses(
    page,
    debouncedQuery,
    sortStatus.columnAccessor as keyof Warehouse,
    sortStatus.direction
  );
  const { mutate: addMutate, isLoading: isAddLoading } = add;
  const { mutate: updateMutate, isLoading: isUpdateLoading } = update;

  const [records, setRecords] = useState<Warehouse[]>([]);
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [initialValues, setInitialValues] = useState<Warehouse>(
    cloneDeep(emptyWarehouse)
  );
  const [selectedRecords, setSelectedRecords] = useState<Warehouse[]>([]);

  useEffect(() => {
    if (data) {
      setRecords(data?.content);
    }
  }, [data, isFetching]);

  const handleAdd = async (values: Warehouse) => {
    setOpen(false);
    addMutate(values, {
      onSuccess: () => {
        showNotification({
          title: "Success",
          message: "Warehouse added successfully",
          color: "green",
        });
        refetch();
      },
      onError: (error) => {
        showNotification({
          title: "Error",
          message: error?.response?.data?.message ?? "Something went wrong",
          color: "red",
        });
      },
    });
  };
  const handleEdit = async (values: Warehouse) => {
    setOpen(false);
    updateMutate(values, {
      onSuccess: () => {
        showNotification({
          title: "Success",
          message: "Warehouse edited successfully",
          color: "green",
        });
        refetch();
      },
      onError: (error) => {
        showNotification({
          title: "Error",
          message: error?.response?.data?.message ?? "Something went wrong",
          color: "red",
        });
      },
    });
  };

  const handleSortStatusChange = (status: DataTableSortStatus) => {
    setPage(1);
    setSortStatus(status);
  };

  return (
    <>
      <Grid align="center" m={0} mb="xs">
        <Flex w={"100%"} gap={20}>
          <TextInput
            sx={{ flexBasis: "100%" }}
            placeholder="Search warehouses..."
            icon={<IconSearch size={16} />}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <Button
            variant="filled"
            sx={{ flexShrink: 0 }}
            onClick={() => {
              setIsAdd(true);
              setInitialValues({ ...emptyWarehouse });
              setOpen(true);
            }}
          >
            <Group position="apart" spacing={"xs"}>
              <IconPlus size={18} />
              Add
            </Group>
          </Button>
        </Flex>
      </Grid>
      <Box sx={{ height: "60vh" }}>
        <DataTable<Warehouse>
          withBorder
          borderRadius="sm"
          withColumnBorders
          striped
          fetching={isFetching || isAddLoading || isUpdateLoading}
          verticalAlignment="top"
          records={records}
          sortStatus={sortStatus}
          onSortStatusChange={handleSortStatusChange}
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
          totalRecords={data?.totalElements ?? 0}
          recordsPerPage={pageSize}
          page={page}
          onPageChange={(p) => setPage(p)}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
          columns={[
            {
              accessor: "name",
              render: ({ name }) => `${name}`,
              sortable: true,
            },

            {
              accessor: "address",
              render: ({ address }) => `${Object.values(address).join(", ")}`,
              sortable: true,
            },
          ]}
          onRowClick={({ id, name, address }) => {
            setInitialValues({ id, name, address });
            setIsAdd(false);

            setOpen(true);
          }}
          rowContextMenu={{
            items: ({ id, name, address }) => [
              {
                key: "edit",
                icon: <IconEdit size={14} />,
                title: `Edit ${name}`,
                onClick: () => {
                  setInitialValues({ id, name, address });
                  setIsAdd(false);
                  setOpen(true);
                },
              },
              // {
              //   key: "delete",
              //   title: `Delete ${name} `,
              //   icon: <IconTrashX size={14} />,
              //   color: "red",
              //   onClick: () => {
              //     console.log(id);
              //     remove.mutate(id);
              //     showNotification({
              //       color: "red",
              //       message: `Should delete ${price}`,
              //     });
              //   },
              // },
              // { key: "divider-1", divider: true },
              // {
              //   key: "deleteMany",
              //   hidden:
              //     selectedRecords.length <= 1 ||
              //     !selectedRecords.map((r) => r.id).includes(id),
              //   title: `Delete ${selectedRecords.length} selected records`,
              //   icon: <IconTrash size={14} />,
              //   color: "red",
              //   onClick: () =>
              //     showNotification({
              //       color: "red",
              //       message: `Should delete ${selectedRecords.length} records`,
              //     }),
              // },
            ],
          }}
        />
        <AddEdit
          opened={open}
          onClose={() => setOpen(false)}
          isEdit={!isAdd}
          initialValues={initialValues}
          isAdd={isAdd}
          onSubmit={isAdd ? handleAdd : handleEdit}
        />
      </Box>
    </>
  );
}
