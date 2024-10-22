import api from "@/data/api";
import { IProduct } from "@/data/types/product";
import Image from "next/image";
import Link from "next/link";

const getFeaturedProducts = async (): Promise<IProduct[]> => {
  const response = await api('/products/featured', {
    cache: "no-store", // dessa forma, sempre que der um refrash, sera feita uma revalidação
    // next: {
    //   revalidate: 60 * 60
    // }
  })

  const products = await response.json()

  return products
}


export default async function Home() {
  const [highLightedProduct, ...otherProducts] = await getFeaturedProducts()


  return (
    <div className="grid max-h-[560px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highLightedProduct.slug}`}
        className=" group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
      >
        <Image
          src={highLightedProduct.image}
          className="group-hover:scale-105 transition-transform duration-500 "
          width={560}
          height={560}
          quality={100}
          alt=""
        />
        <div className="absolute bottom-24 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highLightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold" >{highLightedProduct.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}</span>
        </div>
      </Link>

      {otherProducts.map(product => {
        return (
          <Link
        href={`/product/${product.slug}`}
        className=" group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-center"
      >
        <Image
          src={product.image}
          className="group-hover:scale-105 transition-transform duration-500"
          width={300}
          height={300}
          quality={100}
          alt=""
        />
                <div className="absolute bottom-8 right-10 h-10 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{product.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold" >{product.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}</span>
        </div>
      </Link>
        )
      })}
      
      
    </div>
  );
}
