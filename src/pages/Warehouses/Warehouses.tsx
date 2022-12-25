import { Divider, Stack, Title } from "@mantine/core";
import Table from "./Table";

function Warehouses() {
  return (
    <Stack m={40} h={"100%"} sx={{ maxWidth: "100%", overflowY: "auto" }}>
      <Title order={1}>Warehouses</Title>
      <Divider mb={20} />
      <Table />
    </Stack>
  );
}

export default Warehouses;
