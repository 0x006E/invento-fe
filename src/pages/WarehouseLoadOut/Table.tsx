import { Box, Button, Flex, Grid, Group, Loader } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { cloneDeep } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import { PartyType, WarehouseLoadOut } from "../../api/models";
import AsyncTitleLoader from "../../components/AsyncTitleLoader/AsyncTitleLoader";
import FilterByDate from "../../components/FilterByDate";
import useWarehouseLoadOuts from "../../hooks/WarehouseLoadOuts";
import { formatDate } from "../../util";
import AddEdit from "./AddEdit";

const PAGE_SIZES = [10, 15, 20];
const emptywarehouseLoadOut: WarehouseLoadOut = {
  id: "",
  warehouseId: "",
  vehicleNumber: "",
  imageUrl: "",
  ervnumber: "",
  dateTime: new Date().toISOString(),
  products: [],
};

export default function warehouseLoadOutsTable() {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [page, setPage] = useState(1);
  const [filterDate, setFilterDate] = useState("");
  const [enableFilter, setEnableFilter] = useState(false);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "id",
    direction: "asc",
  });
  const { warehouseLoadOuts, add, remove, update } =
    useWarehouseLoadOuts(pageSize);
  const { data, isFetching, isLoading, isError, refetch, error } =
    warehouseLoadOuts(
      page,
      enableFilter ? filterDate : "",
      sortStatus.columnAccessor as keyof WarehouseLoadOut,
      sortStatus.direction
    );

  const { mutate: addMutate, isLoading: isAddLoading } = add;
  const { mutate: updateMutate, isLoading: isUpdateLoading } = update;

  const [records, setRecords] = useState<WarehouseLoadOut[]>([]);
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [initialValues, setInitialValues] = useState<WarehouseLoadOut>(
    cloneDeep(emptywarehouseLoadOut)
  );
  const [selectedRecords, setSelectedRecords] = useState<WarehouseLoadOut[]>(
    []
  );

  useEffect(() => {
    if (data) {
      setRecords(data?.content);
    }
  }, [data, isFetching]);

  if (isError)
    showNotification({
      title: "error",
      message:
        error.message ??
        (error.cause ? error.cause.message : "Something went wrong"),
      color: "red",
    });
  const handleAdd = async (values: WarehouseLoadOut) => {
    setOpen(false);
    addMutate(values, {
      onSuccess: () => {
        showNotification({
          title: "Success",
          message: "Load in item added successfully",
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
  const handleEdit = async (values: WarehouseLoadOut) => {
    setOpen(false);
    updateMutate(values, {
      onSuccess: () => {
        showNotification({
          title: "Success",
          message: "Load in item edited successfully",
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
    refetch();
  };

  return (
    <>
      <Grid align="center" m={0} mb="xs">
        <Flex w={"100%"} justify={"right"} align={"center"} gap={20}>
          <FilterByDate
            onEnableFilterDateChange={(enable) => setEnableFilter(enable)}
            onFilterDateChange={(date) => setFilterDate(date.toISOString())}
          />
          <Button
            variant="filled"
            sx={{ flexShrink: 0 }}
            onClick={() => {
              setIsAdd(true);
              setInitialValues({ ...emptywarehouseLoadOut });
              setOpen(true);
            }}
          >
            <Group position="apart" spacing={"xs"}>
              <IconPlus size={18} />
              Add
            </Group>
          </Button>
          <Flex
            sx={{
              flexShrink: 0,
              opacity: isFetching || isAddLoading || isUpdateLoading ? 1 : 0,
            }}
            justify="center"
            align={"center"}
          >
            <Loader size={25} />
          </Flex>
        </Flex>
      </Grid>
      <Box sx={{ height: "60vh" }}>
        <DataTable<WarehouseLoadOut>
          withBorder
          borderRadius="sm"
          withColumnBorders
          striped
          fetching={isLoading}
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
              accessor: "warehouseId",
              title: "Warehouse",
              render: ({ warehouseId }) => (
                <AsyncTitleLoader id={warehouseId} type={PartyType.Warehouse} />
              ),
              sortable: false,
            },
            {
              accessor: "vehicleNumber",
              title: "Vehicle",
              render: ({ vehicleNumber }) => `${vehicleNumber}`,
              sortable: true,
            },
            {
              accessor: "products",
              title: "Products",
              render: ({ products }) => `${products.length}`,
              sortable: false,
            },
            {
              accessor: "dateTime",
              title: "Date",
              render: ({ dateTime }) => `${formatDate(dateTime)}`,
              sortable: true,
            },
            // {
            //   accessor: "phoneNumber",
            //   render: ({ phoneNumber }) => `${phoneNumber}`,
            //   sortable: true,
            // },
            // {
            //   accessor: "address",
            //   render: ({ address }) =>
            //     `${Object.values(address).filter(Boolean).join(", ")}`,
            //   sortable: false,
            // },
          ]}
          onRowClick={(data) => {
            setInitialValues(data);
            setIsAdd(false);

            setOpen(true);
          }}
          rowContextMenu={{
            items: (data) => [
              {
                key: "edit",
                icon: <IconEdit size={14} />,
                title: `Edit item`,
                onClick: () => {
                  setInitialValues(data);
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
