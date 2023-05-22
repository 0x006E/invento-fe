import { Divider, Stack, Title } from "@mantine/core";
import Table from "./Table";

function ReplaceDefectives() {
  return (
    <Stack m={40} h={"100%"} sx={{ maxWidth: "100%", overflowY: "auto" }}>
      <Title order={1}>Replace Defective</Title>
      <Divider mb={20} />
      <Table />
    </Stack>
  );
}

export default ReplaceDefectives;
