import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { BsPlus, BsDash } from "react-icons/bs";
import {
  addToCart,
  removeitem,
  romoveFromCart,
} from "../../Store/Slices/cartSlice";

export const CartDrawerItem = () => {
  const shoppingCart = useSelector((state) => state.cart.cartProducts);
  const dispatch = useDispatch();
  return (
    <div>
      {shoppingCart.map((item, id) => (
        <Flex alignItems={"center"} marginBottom={5} gap={3} key={id}>
          <Image
            src={item.thumbnail}
            w={"80px"}
            h={"80px"}
            objectFit={"cover"}
          />
          <Stack>
            <Text fontWeight={"bold"}>{item.title}</Text>
            <Flex alignItems={"center"} gap={2}>
              <Button
                size="sm"
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: item.id,
                      price: item.price,
                      thumbnail: item.thumbnail,
                      title: item.title,
                    })
                  )
                }
              >
                <BsPlus size={15} />
              </Button>
              {item.amount}
              <Button
                size="sm"
                onClick={() =>
                  dispatch(
                    removeitem({
                      id: item.id,
                      price: item.price,
                      thumbnail: item.thumbnail,
                      title: item.title,
                    })
                  )
                }
              >
                <BsDash size={15} />
              </Button>
            </Flex>

            <Button
              color={"red"}
              size="sm"
              onClick={() =>
                dispatch(
                  romoveFromCart({
                    id: item.id,
                    price: item.price,
                    thumbnail: item.thumbnail,
                    title: item.title,
                  })
                )
              }
            >
              Remove
            </Button>
          </Stack>
        </Flex>
      ))}
    </div>
  );
};
