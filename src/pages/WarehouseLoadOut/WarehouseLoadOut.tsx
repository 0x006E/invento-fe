import { Divider, Stack, Title } from "@mantine/core";
import Table from "./Table";

function WarehouseLoadOuts() {
  return (
    <Stack m={40} h={"100%"} sx={{ maxWidth: "100%", overflowY: "auto" }}>
      <Title order={1}>Warehouse Load Out</Title>
      <Divider mb={20} />
      <Table />
    </Stack>
  );
}

export default WarehouseLoadOuts;
