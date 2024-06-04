import React from "react";
import {
  Card,
  CardBody,
  Heading,
  Stack,
  Image,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const ProductCard = ({ item }) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={item.thumbnail}
          alt="Product Image"
          width="200px"
          height="200px"
          borderRadius="50%"
          mx="auto"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign="center">
            {item.title}
          </Heading>
          <Text>
            {item.description.length < 20
              ? item.description
              : item.description.slice(0, 60) + "..."}
          </Text>
          <Heading size="md" textAlign="center">
            {item.price} $
          </Heading>
          <Button
            color={"black.300"}
            as={Link}
            to={`/singleProduct/` + item.id}
            bg={useColorMode === "Light" ? "#9f7aea" : "blue.500"}
            size={"xl"}
            py={4}
            w=" full"
          >
            View Details
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};
