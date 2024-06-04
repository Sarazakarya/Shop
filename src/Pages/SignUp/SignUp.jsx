import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (isSignUp) {
      console.log("Signing up...");
    } else {
      console.log("Logging in...");
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg">
      <Heading mb={4} textAlign="center">
        {isSignUp ? "Sign Up" : "Login"}
      </Heading>
      {error && (
        <Text color="red.500" mb={4} textAlign="center">
          {error}
        </Text>
      )}
      <form onSubmit={handleSubmit}>
        <FormControl id="email" mb={4}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormControl>
        {isSignUp && (
          <FormControl id="confirm-password" mb={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" placeholder="Confirm your password" />
          </FormControl>
        )}
        <Button type="submit" colorScheme="blue" width="full">
          {isSignUp ? "Sign Up" : "Login"}
        </Button>
      </form>
      <Text mt={4} textAlign="center">
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <Button
          colorScheme="blue"
          variant="link"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Login" : "Sign Up"}
        </Button>
      </Text>
    </Box>
  );
};

export default SignUp;
