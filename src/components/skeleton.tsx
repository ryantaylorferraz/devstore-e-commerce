import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

const Skeleton = ({className, ...props}: ComponentProps<'div'>) => {
  return (
    <div className={twMerge('bg-zinc-300/10 animate-pulse rounded-md ', className)} {...props} />
  )
}

export default Skeleton