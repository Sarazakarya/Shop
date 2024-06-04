import { Flex, useDisclosure } from "@chakra-ui/react";
import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Drawer,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { CartDrawerItem } from "../CartDrawerItem/CartDrawerItem";

export default function DrawerCart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const isAuth = useSelector((state) => state.login.user.isAuth);
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  console.log(cartProducts);

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        Cart({cartProducts && isAuth ? cartProducts.length : 0})
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Shopping Cart</DrawerHeader>

          <DrawerBody>
            {cartProducts.length > 0 ? (
              <CartDrawerItem />
            ) : (
              <Flex
                justifyContent={"center"}
                mx={"auto"}
                height="80vh"
                alignItems={"center"}
              >
                <Text fontWeight={"bold"} fontSize={20}>
                  Your Cart Empty
                </Text>
              </Flex>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
