import React from "react";
import {
  Box,
  Flex,
  Spacer,
  Link,
  Heading,
  Button,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store/Slices/loginSlice";
import { BsMoon, BsSun } from "react-icons/bs";
import Drawer from "../Components/Drawer/Drawer";

const Nav = () => {
  const isAuth = useSelector((state) => state.login.user.isAuth);
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg="blue.500" px={4} py={3}>
      <Flex alignItems="center">
        <Heading as="h1" size="lg" color="white">
          Shop
        </Heading>
        <Spacer />
        <Flex alignItems={"center"} gap={"20px"}>
          <Link href="/" color="white" mr={4}>
            Home
          </Link>

          <Flex>
            <Stack direction={"row"}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <BsMoon /> : <BsSun />}
              </Button>
              <Drawer />
            </Stack>
          </Flex>
          {isAuth ? (
            <Link href="/">
              <Button
                colorScheme={` ${
                  colorMode === "light" ? "whiteAlpha" : "BlackAlpha"
                }`}
                variant="outline"
                onClick={() => dispatch(logout())}
              >
                Log Out
              </Button>
            </Link>
          ) : (
            <Link href="/Login">
              <Button colorScheme="whiteAlpha" variant="outline">
                Login
              </Button>
            </Link>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Nav;
