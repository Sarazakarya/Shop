import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { TableSkeleton } from "./../TableSkeleton/TableSkelaton";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../Store/Serv/ApiSlice";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AlertDialogDelete } from "./../AlertDialog/AlertDialog";
import { EditModal } from "../EditModal/EditModal";
import { Link } from "react-router-dom";

export const DashboardTable = () => {
  const { isLoading, error, data } = useGetProductsQuery({ page: 1 });

  const {
    isOpen: isDeleteDialogOpen,
    onOpen: openDeleteDialog,
    onClose: closeDeleteDialog,
  } = useDisclosure();

  // Deleted Product
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const handleDelete = async () => {
    if (productIdToDelete) {
      try {
        await deleteProduct(productIdToDelete);
        closeDeleteDialog();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // Edit
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productIdToEdit, setProductIdToEdit] = useState({});
  function onChangeHandler(e) {
    const { name, value } = e.target;
    setProductIdToEdit({ ...productIdToEdit, [name]: value });
  }

  function handelProduct(product) {
    setProductIdToEdit(product);
  }

  function onChangePriceHandler(value) {
    setProductIdToEdit({ ...productIdToEdit, price: +value });
  }

  // Updat Product
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  function onFileChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProductIdToEdit({ ...productIdToEdit, thumbnail: reader.result });
    };

    reader.readAsDataURL(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProduct({
        id: productIdToEdit.id,
        body: {
          title: productIdToEdit.title,
          price: productIdToEdit.price,
          thumbnail: productIdToEdit.thumbnail,
        },
      });
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  if (isLoading) return <TableSkeleton />;
  if (error) return <p>Error loading products</p>;
  if (!data || !data.length) return <p>No products found</p>;

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Title</Th>
              <Th>Price</Th>
              <Th>Thumbnail</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((product) => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>{product.title}</Td>
                <Td>{product.price}$</Td>
                <Td>
                  <Image
                    borderRadius="full"
                    objectFit="cover"
                    boxSize="40px"
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </Td>
                <Td>
                  <Button as={Link} to={`/singleProduct/` + product.id}>
                    <AiOutlineEye size={17} />
                  </Button>
                  <Button
                    onClick={() => {
                      setProductIdToDelete(product.id);
                      openDeleteDialog();
                    }}
                  >
                    <BsTrash size={17} />
                  </Button>
                  <Button
                    onClick={() => {
                      onOpen();
                      handelProduct(product);
                    }}
                  >
                    <FiEdit size={17} />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <AlertDialogDelete
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        title="Are You Sure?"
        description="Do you really want to destroy this product?"
        onOkHandler={handleDelete}
        isLoading={isDeleting}
      />
      <EditModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        productIdToEdit={productIdToEdit.title}
        name="title"
        nameprice="price"
        onChangeHandler={onChangeHandler}
        price={productIdToEdit.price}
        onChangePriceHandler={onChangePriceHandler}
        handleSubmit={handleSubmit}
        isLoading={isUpdating}
        onFileChange={onFileChange}
      />
    </>
  );
};
