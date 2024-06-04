import { Box, Flex, Skeleton } from "@chakra-ui/react";
import React from "react";


export const TableSkeleton = () => {
  const rows = Array.from({ length: 10 }, (_, ind) => (
    <Flex
      key={ind}
      alignItems={"center"}
      justifyContent={"space-between"}
      border={"1px solid #333"}
      h={"50px"}
      p={2}
      rounded={"md"}
      mb={2}
    >
      <Skeleton h={"9px"} w={"120px"} bg={"gray"} />
      <Skeleton h={"9px"} w={"120px"} bg={"gray"} />
      <Skeleton h={"9px"} w={"120px"} bg={"gray"} />
      <Skeleton h={"9px"} w={"120px"} bg={"gray"} />
      <Skeleton h={"9px"} w={"120px"} bg={"gray"} />
      <Skeleton h={"9px"} w={"120px"} bg={"gray"} />
      <Flex>
        <Skeleton
          h={"30px"}
          w={"50px"}
          startColor="red.300"
          endColor="red.500"
          mr={4}
        />
        <Skeleton
          h={"30px"}
          w={"50px"}
          startColor="blue.300"
          endColor="blue.500"
          mr={4}
        />
      </Flex>
    </Flex>
  ));

  return (
    <Box>
      {rows}
      <Skeleton h={"15px"} w={"200px"} bg={"gray"} mx={"auto"} />
    </Box>
  );
};
