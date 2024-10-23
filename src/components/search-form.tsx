'use client';

import { Search } from 'lucide-react'
import React from 'react'

const SearchForm = () => {
    const handleSearch(event: FormData) {}


  return (
    <form className='flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700'>

    <Search className='w-5 h-5 text-zinc-500' />

    <input type="text" placeholder='Buscar produtos' className='flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500' />
    
  </form>
  )
}

export default SearchForm