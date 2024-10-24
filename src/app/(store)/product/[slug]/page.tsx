import AddToCartButton from "@/components/add-to-cart-button";
import api from "@/data/api";
import { IProduct } from "@/data/types/product";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

type ProductProps = {
  params: {
    slug: string
  }
}

async function getProduct(slug: string): Promise<IProduct> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60,
    },
  })

  const product = await response.json()

  return product
}

export const generateMetadata = async ({ params }: ProductProps): Promise<Metadata> => {
  const slug = await params;

  const product = await getProduct(slug.slug);
  
  return {
    title: product.title
  };
};

export async function generateStaticParams() {
  const response = await api('/products/featured')
  const products: IProduct[] = await response.json()

  return products.map((product) => {
    return { slug: product.slug }
  })
}

const Product = async ({ params }: ProductProps) => {
  const slug = await params;

  const product = await getProduct(slug.slug);

  return (
    <div className="relative grid max-h-[550px] grid-cols-3 grid-rows-3">
      <div className="col-span-2 row-span-3 overflow-hidden flex justify-end">
        <Image
          alt=""
          src={product.image}
          width={700}
          height={750}
          quality={100}
        />
      </div>

      <div className="flex flex-col row-span-3 justify-center px-12 ">
        <h1 className="text-3xl font-bold leading-tight">
          {product.title}
        </h1>
        <p className=" mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-3">
        <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold" >{product.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}</span>
          <span className="text-sm text-zinc-400">
            Em 12x sem juros de {(product.price / 12).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
          </span>
        </div>

          <div className="mt-8 space-y-4">
            <span className="block font-semibold">Tamanhos: </span>


            <div className="flex gap-2">
              <button
                type="button"
                className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
              >
                P
              </button>
              <button
                type="button"
                className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
              >
                M
              </button>
              <button
                type="button"
                className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
              >
                G
              </button>
              <button
                type="button"
                className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
              >
                GG
              </button>
            </div>
            
        </div>

          <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
};

export default Product;
