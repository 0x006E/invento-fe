import {
  Box,
  Button,
  Flex,
  Grid,
  Group,
  Loader,
  TextInput,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconEdit, IconPlus, IconSearch } from "@tabler/icons-react";
import { cloneDeep } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import { Location } from "../../api/models/Location";
import useLocations from "../../hooks/Locations";
import AddEdit from "./AddEdit";

const PAGE_SIZES = [10, 15, 20];
const emptyLocation = {
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

export default function LocationsTable() {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "id",
    direction: "asc",
  });
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);

  const { locations, add, remove, update } = useLocations(pageSize);
  const { data, isFetching, isLoading, isError, refetch } = locations(
    page,
    debouncedQuery,
    sortStatus.columnAccessor as keyof Location,
    sortStatus.direction
  );
  const { mutate: addMutate, isLoading: isAddLoading } = add;
  const { mutate: updateMutate, isLoading: isUpdateLoading } = update;

  const [records, setRecords] = useState<Location[]>([]);
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [initialValues, setInitialValues] = useState<Location>(
    cloneDeep(emptyLocation)
  );
  const [selectedRecords, setSelectedRecords] = useState<Location[]>([]);

  useEffect(() => {
    if (data) {
      setRecords(data?.content);
    }
  }, [data, isFetching]);

  const handleAdd = async (values: Location) => {
    setOpen(false);
    addMutate(values, {
      onSuccess: () => {
        showNotification({
          title: "Success",
          message: "Location added successfully",
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
  const handleEdit = async (values: Location) => {
    setOpen(false);
    updateMutate(values, {
      onSuccess: () => {
        showNotification({
          title: "Success",
          message: "Location edited successfully",
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
        <Flex w={"100%"} gap={20}>
          <TextInput
            sx={{ flexBasis: "100%" }}
            placeholder="Search locations..."
            icon={<IconSearch size={16} />}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <Button
            variant="filled"
            sx={{ flexShrink: 0 }}
            onClick={() => {
              setIsAdd(true);
              setInitialValues({ ...emptyLocation });
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
        <DataTable<Location>
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
              accessor: "name",
              render: ({ name }) => `${name}`,
              sortable: true,
            },

            {
              accessor: "address",
              render: ({ address }) => `${Object.values(address).join(", ")}`,
              sortable: false,
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
