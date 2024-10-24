import { z } from "zod"
import type { NextRequest } from 'next/server'
import data from "../data.json"

export async function GET(request: NextRequest,) {

    await new Promise(resolve => setTimeout(resolve, 1000))
        
    const { searchParams } = request.nextUrl

    const query = z.string().parse(searchParams.get('q'))

    const products = data.products.filter(product => {
        return product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    })

    if (products.length === 0) {
        return Response.json({ error: `O produto "${query}" não existe` }, { status: 404 });
    }

    return Response.json(products)
}

