import React from "react";
import { ProductCard } from "../Components/ProductCard";
import { Grid } from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ProductCardSecelton } from "./ProductCardSecelton";

const getData = async () => {
  const data = await axios.get("http://localhost:3000/products");
  return data;
};

export const ProductPage = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: getData,
  });
  if (isLoading)
    return (
      <Grid
        templateColumns="repeat(auto-fill ,minmax(360px, 1fr)) "
        margin={30}
        gap={6}
      >
        {Array.from({ length: 30 }, (_, ind) => (
          <ProductCardSecelton key={ind} />
        ))}
      </Grid>
    );
  if (error) return <p>Error</p>;

  return (
    <div>
      <Grid
        templateColumns="repeat(auto-fill ,minmax(360px, 1fr)) "
        margin={30}
        gap={6}
      >
        {data.data.map((item, index) => (
          <ProductCard key={index} item={item} />
        ))}
      </Grid>
    </div>
  );
};
