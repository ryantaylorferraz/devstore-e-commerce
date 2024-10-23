import Image from "next/image";
import Link from "next/link";
import React from "react";

const Search = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">Moletom</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        <Link
          href={`/product/moletom-never-stop-learning`}
          className=" group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-center"
        >
          <Image
            src="/moletom-never-stop-learning.png"
            className="group-hover:scale-105 transition-transform duration-500"
            width={480}
            height={480}
            quality={100}
            alt=""
          />
          <div className="absolute bottom-8 right-10 h-10 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate">Moletom never stop learning}</span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              {Number(129).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Search;
