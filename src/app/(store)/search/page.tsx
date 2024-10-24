import api from "@/data/api";
import { IProduct } from "@/data/types/product";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface SearchProps {
  searchParams: {
    q: string;
  };
}

const searchProducts = async (query: string): Promise<IProduct[]> => {
  try {
    const response = await api(`/products/search?q=${query}`, {
      // cache: "no-store",
      next: {
        revalidate: 60 * 60,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao buscar produtos");
    }

    const products = await response.json();
    return products;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Falha na busca de produtos: ${error?.message}`);
  }
};

const Search = async ({ searchParams }: SearchProps) => {
  const { q: query } = await searchParams;

  if (!query) {
    redirect("/");
  }

  const products = await searchProducts(query);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products.length ? (
          products.map((product) => {
            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className=" group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-center"
              >
                <Image
                  src={product.image}
                  className="group-hover:scale-105 transition-transform duration-500"
                  width={480}
                  height={480}
                  quality={100}
                  alt=""
                />
                <div className="absolute bottom-8 right-10 h-10 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                  <span className="text-sm truncate">{product.title}</span>
                  <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </Link>
            );
          })
        ) : (
          <p>Nenhum produto encontrado</p>
        )}
      </div>
    </div>
  );
};

export default Search;
