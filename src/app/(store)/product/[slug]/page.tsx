import api from "@/data/api";
import { IProduct } from "@/data/types/product";
import Image from "next/image";
import React from "react";

interface ProductProps  {
  params: {
    slug: string
  };
}

const getProduct = async (slug: string): Promise<IProduct> => {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60
    }
  });

  const product = await response.json();
  return product;
};



const Product = async ({params}: ProductProps) => {
  const { slug } = await params;
  const product = await getProduct(slug);

  return (
    <div className="relative grid max-h-[550px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          alt=""
          src={product.image}
          width={1000}
          height={1000}
          quality={100}
        />
      </div>

      <div className="flex flex-col justify-center px-12 ">
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
            Em 12x sem juros de R$10,75
          </span>
        </div>

          <div className="mt-8 space-y-8">
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

        <button type="button" className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white" >Adicionar ao carrinho</button>
      </div>
    </div>
  );
};

export default Product;
