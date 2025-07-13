import { PrismaClient } from "../generated/prisma/index.js"

const prisma = new PrismaClient()

async function getProducts() {
    const product = await prisma.product.findMany()
    console.log(product)
}

getProducts()
