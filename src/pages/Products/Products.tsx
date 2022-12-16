import { Divider, Stack, Title } from "@mantine/core";
import Table from "./Table";

function Products() {
  return (
    <Stack p={60}>
      <Title order={1}>Products</Title>
      <Divider mb={20} />
      <Table />
    </Stack>
  );
}

export default Products;
