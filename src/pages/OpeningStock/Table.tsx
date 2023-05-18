import { Box, Button, Flex, Grid, Group, Loader } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { cloneDeep } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import { OpeningStock } from "../../api/models/OpeningStock";
import { PartyType } from "../../api/models/PartyType";
import PartyTitle from "../../components/PartyTitle";
import useOpeningStocks from "../../hooks/OpeningStocks";
import AddEdit from "./AddEdit";
import FilterByDate from "./FilterByDate";

const PAGE_SIZES = [10, 15, 20];
const emptyOpeningStock: OpeningStock = {
  id: "",
  partyId: "",
  partyType: PartyType.Supplier,
  dayEndId: "",
  items: [],
};

export default function OpeningStocksTable() {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [page, setPage] = useState(1);
  const [filterDate, setFilterDate] = useState("");
  const [enableFilter, setEnableFilter] = useState(false);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "id",
    direction: "asc",
  });
  const { openingStocks, add, remove, update } = useOpeningStocks(pageSize);
  const { data, isFetching, isLoading, isError, refetch, error } =
    openingStocks(
      page,
      enableFilter ? filterDate : "",
      sortStatus.columnAccessor as keyof OpeningStock,
      sortStatus.direction
    );

  const { mutate: addMutate, isLoading: isAddLoading } = add;
  const { mutate: updateMutate, isLoading: isUpdateLoading } = update;

  const [records, setRecords] = useState<OpeningStock[]>([]);
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [initialValues, setInitialValues] = useState<OpeningStock>(
    cloneDeep(emptyOpeningStock)
  );
  const [selectedRecords, setSelectedRecords] = useState<OpeningStock[]>([]);

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
  const handleAdd = async (values: OpeningStock) => {
    setOpen(false);
    addMutate(values, {
      onSuccess: () => {
        showNotification({
          title: "Success",
          message: "OpeningStock added successfully",
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
  const handleEdit = async (values: OpeningStock) => {
    setOpen(false);
    updateMutate(values, {
      onSuccess: () => {
        showNotification({
          title: "Success",
          message: "OpeningStock edited successfully",
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
              setInitialValues({ ...emptyOpeningStock });
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
        <DataTable<OpeningStock>
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
              accessor: "partyId",
              title: "Party Name",
              render: ({ partyId, partyType }) => (
                <PartyTitle id={partyId} type={partyType} />
              ),
              sortable: true,
            },
            {
              accessor: "partyType",
              title: "Party Type",
              render: ({ partyType }) => `${partyType}`,
              sortable: true,
            },
            {
              accessor: "items",
              title: "Items",
              render: ({ items }) => `${items.length}`,
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
