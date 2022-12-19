import { Box, Button, Flex, Grid, Group, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import {
  IconEdit,
  IconPlus,
  IconSearch,
  IconTrash,
  IconTrashX,
} from "@tabler/icons";
import { orderBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import { Vehicle } from "../../api/Vehicle";
import useVehicles from "../../hooks/Vehicles";

const PAGE_SIZES = [10, 15, 20];
export default function SearchingAndFilteringExample() {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "name",
    direction: "asc",
  });
  const { vehicles } = useVehicles(pageSize);
  const { data, isLoading, isError } = vehicles(page);
  const [records, setRecords] = useState<Vehicle[]>([]);

  useEffect(() => {
    if (data) {
      setRecords(data?.content);
    }
  }, [data, isLoading]);

  const handleSortStatusChange = (status: DataTableSortStatus) => {
    // setPage(1);
    setSortStatus(status);
    setRecords((currentRecords) => {
      const sortedRecords = orderBy(
        currentRecords,
        status.columnAccessor,
        status.direction
      );
      return sortedRecords;
    });
  };
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [selectedRecords, setSelectedRecords] = useState<Vehicle[]>([]);

  useEffect(() => {
    setRecords(
      data?.content.filter(({ number, type }) => {
        if (
          debouncedQuery !== "" &&
          !`${number} ${type}`
            .toLowerCase()
            .includes(debouncedQuery.trim().toLowerCase())
        ) {
          return false;
        }
        return true;
      }) ?? []
    );
  }, [debouncedQuery]);

  return (
    <>
      <Grid align="center" m={0} mb="xs">
        <Flex w={"100%"} gap={20}>
          <TextInput
            sx={{ flexBasis: "100%" }}
            placeholder="Search vehicles..."
            icon={<IconSearch size={16} />}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <Button variant="filled" sx={{ flexShrink: 0 }}>
            <Group position="apart" spacing={"xs"}>
              <IconPlus size={18} />
              Add
            </Group>
          </Button>
        </Flex>
      </Grid>
      <Box sx={{ height: "60vh" }}>
        <DataTable<Vehicle>
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
              accessor: "number",
              render: ({ number }) => `${number}`,
              sortable: true,
            },

            {
              accessor: "type",
              render: ({ type }) => `${type}`,
              sortable: true,
            },
          ]}
          rowContextMenu={{
            items: ({ id, number, type }) => [
              {
                key: "edit",
                icon: <IconEdit size={14} />,
                title: `Edit ${number}`,
                onClick: () =>
                  showNotification({
                    color: "orange",
                    message: `Should edit ${number}}`,
                  }),
              },
              {
                key: "delete",
                title: `Delete ${number} `,
                icon: <IconTrashX size={14} />,
                color: "red",
                onClick: () =>
                  showNotification({
                    color: "red",
                    message: `Should delete ${number}`,
                  }),
              },
              { key: "divider-1", divider: true },
              {
                key: "deleteMany",
                hidden:
                  selectedRecords.length <= 1 ||
                  !selectedRecords.map((r) => r.id).includes(id),
                title: `Delete ${selectedRecords.length} selected records`,
                icon: <IconTrash size={14} />,
                color: "red",
                onClick: () =>
                  showNotification({
                    color: "red",
                    message: `Should delete ${selectedRecords.length} records`,
                  }),
              },
            ],
          }}
        />
      </Box>
    </>
  );
}
