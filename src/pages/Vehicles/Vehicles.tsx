import { Divider, Stack, Title } from "@mantine/core";
import Table from "./Table";

function Vehicles() {
  return (
    <Stack m={40} h={"100%"} sx={{ maxWidth: "100%", overflowY: "auto" }}>
      <Title order={1}>Vehicles</Title>
      <Divider mb={20} />
      <Table />
    </Stack>
  );
}

export default Vehicles;
