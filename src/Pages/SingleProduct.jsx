import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Heading,
  Stack,
  Image,
  Text,
  Button,
  useColorMode,
  Box,
  Flex,
} from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Store/Slices/cartSlice";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.login.user.isAuth);

  const getData = async () => {
    const { data } = await axios.get(` http://localhost:3000/products/${id}`);
    return data;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["product", id],
    queryFn: getData,
  });

  if (isLoading) {
    return (
      <Box maxW="sm" my={20} mx="auto">
        <ProductDetailsSkeleton />
      </Box>
    );
  }

  if (error) {
    return <Text>Error loading product details.</Text>;
  }

  const goBack = () => navigate(-1);

  const handleAddToCart = () => {
    if (isAuth) {
      dispatch(
        addToCart({
          id: data.id,
          price: data.price,
          thumbnail: data.thumbnail,
          title: data.title,
        })
      );
    } else {
      navigate("/Login");
    }
  };

  return (
    <div>
      <Flex direction={"column"}>
        <Flex
          alignItems="center"
          maxW="auto"
          my={7}
          fontSize="lg"
          cursor="pointer"
          onClick={goBack}
          mx={"auto"}
        >
          <BsArrowLeft />
          <Text ml={2}>Back</Text>
        </Flex>
        <Card maxW="sm" my={10} mx="auto">
          <CardBody>
            <Image
              src={data.thumbnail}
              alt={data.title}
              width="200px"
              height="200px"
              borderRadius="50%"
              mx="auto"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md" textAlign="center">
                {data.title}
              </Heading>
              <Text>{data.description}</Text>
              <Text size="md" textAlign="center">
                {data.price} $
              </Text>
              <Button
                bg={useColorMode === "Light" ? "#e6f3fd" : "#9f7aea"}
                size={"xl"}
                py={4}
                w=" full"
                onClick={() => handleAddToCart()}
              >
                Add To Cart
              </Button>
            </Stack>
          </CardBody>
        </Card>
      </Flex>
    </div>
  );
};

export default SingleProduct;
