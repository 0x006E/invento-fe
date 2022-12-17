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
const initialRecords = new Array(100).fill(0).map((_, index) => {
  return {
    id: index,
    name: `Name ${index}`,
    price: Math.floor(Math.random() * 1000),
  };
});
const PAGE_SIZES = [10, 15, 20];
export default function SearchingAndFilteringExample() {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(initialRecords.slice(0, pageSize));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "name",
    direction: "asc",
  });

  const handleSortStatusChange = (status: DataTableSortStatus) => {
    setPage(1);
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
  const [selectedRecords, setSelectedRecords] = useState<typeof initialRecords>(
    []
  );

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(initialRecords.slice(from, to));
  }, [page, pageSize]);

  useEffect(() => {
    setRecords(
      initialRecords.filter(({ name, price }) => {
        if (
          debouncedQuery !== "" &&
          !`${name} ${price}`
            .toLowerCase()
            .includes(debouncedQuery.trim().toLowerCase())
        ) {
          return false;
        }
        return true;
      })
    );
  }, [debouncedQuery]);

  return (
    <>
      <Grid align="center" m={0} mb="xs">
        <Flex w={"100%"} gap={20}>
          <TextInput
            sx={{ flexBasis: "100%" }}
            placeholder="Search products..."
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
        <DataTable
          withBorder
          borderRadius="sm"
          withColumnBorders
          striped
          verticalAlignment="top"
          records={records}
          sortStatus={sortStatus}
          onSortStatusChange={handleSortStatusChange}
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
          totalRecords={initialRecords.length}
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
              accessor: "price",
              render: ({ price }) => `${price} INR`,
              sortable: true,
            },
          ]}
          rowContextMenu={{
            items: ({ id, name, price }) => [
              {
                key: "edit",
                icon: <IconEdit size={14} />,
                title: `Edit ${name}`,
                onClick: () =>
                  showNotification({
                    color: "orange",
                    message: `Should edit ${name}}`,
                  }),
              },
              {
                key: "delete",
                title: `Delete ${name} `,
                icon: <IconTrashX size={14} />,
                color: "red",
                onClick: () =>
                  showNotification({
                    color: "red",
                    message: `Should delete ${price}`,
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
