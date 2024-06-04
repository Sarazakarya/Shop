import { Text, Flex } from "@chakra-ui/react";
import React from "react";

export const Dashboard = () => {
  return (
    <Flex
      justifyContent={"center"}
      mx={"auto"}
      height="90vh"
      alignItems={"center"}
    >
      <Text fontWeight={"bold"} fontSize={30}>
        AdminDashboard
      </Text>
      ;
    </Flex>
  );
};
