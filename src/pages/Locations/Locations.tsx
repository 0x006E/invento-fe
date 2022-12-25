import { Divider, Stack, Title } from "@mantine/core";
import Table from "./Table";

function Locations() {
  return (
    <Stack m={40} h={"100%"} sx={{ maxWidth: "100%", overflowY: "auto" }}>
      <Title order={1}>Locations</Title>
      <Divider mb={20} />
      <Table />
    </Stack>
  );
}

export default Locations;
