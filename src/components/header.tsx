import Link from 'next/link';
import {Search} from 'lucide-react'
import React from 'react'
import Image from 'next/image';
import CartWidget from './cart-widget';

const Header = () => {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-5'>
        <Link href="/" className='text-2xl font-extrabold text-white'>
        devstore
        </Link>

      </div>

      <div className='flex items-center gap-4'>
        <CartWidget />
      <div className='w-px h-4 bg-zinc-700' />


      <Link href="/" className='flex items-center gap-2 hover:underline'>
        <span className='text-sm'>Account</span>
        <Image src="https://github.com/ryantaylorferraz.png" className='h-6 w-6 rounded-full' width={24} height={24} alt='' />
      </Link>
      </div>
    </div>
  )
}

export default Header;