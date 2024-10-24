import data from "../data.json"

export const GET = async () => {
  await new Promise(resolve => setTimeout(resolve, 200))

    const featuredProducts = data.products.filter(product => product.featured)

  return Response.json(featuredProducts)
}

