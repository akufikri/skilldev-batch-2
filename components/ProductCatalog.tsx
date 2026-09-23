import React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface Products {
  id: number;
  images: string[];
  title: string;
  description: string;
  price: number;
}

export default async function ProductCatalog() {
  const res = await fetch("https://dummyjson.com/products?limit=5"); // fetch LANGSUNG, tanpa useEffect!

  const data = await res.json();

  const products: Products[] = data.products;
  return (
    <>
      <div className="grid grid-cols-4 mx-auto gap-4">
        {products?.map((item) => (
          <Card key={item.id} className="relative mx-auto w-full pt-0">
            <div className="relative aspect-video w-full">
              <Image
                src={item.images[0]}
                alt={item.title}
                className="relative z-20 aspect-video w-full object-cover"
                width={100}
                height={100}
              />
            </div>
            <CardHeader>
              <CardAction>
                <Badge>{item.price}</Badge>
              </CardAction>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button>Checkout - {item.title}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
