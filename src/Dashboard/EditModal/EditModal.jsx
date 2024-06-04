import React from "react";
import {
  Button,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

export const EditModal = ({
  isOpen,
  onClose,
  productIdToEdit,
  onChangeHandler,
  name,
  price,
  onChangePriceHandler,
  handleSubmit,
  isLoading,
  onFileChange,
}) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Title"
                onChange={onChangeHandler}
                name={name}
                value={productIdToEdit}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>

              <NumberInput
                precision={2}
                step={2}
                onChange={onChangePriceHandler}
                value={price}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Thumbnail</FormLabel>
              <Input
                type="file"
                onChange={onFileChange}
                accept="image/png, image/gif"
                h={"full"}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              {isLoading ? "Deleting..." : "Save"}
            </Button>
            <Button onClick={onClose}>cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
