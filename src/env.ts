import {z} from "zod"

const envSchema = z.object({
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
    APP_URL: z.string().url()
})

const parsedEnv = envSchema.safeParse(process.env)

if(!parsedEnv.success) {
    console.error('Invalid environment variables', parsedEnv.error.flatten().fieldErrors);

    throw new Error('Invalid environment variables.')

}

export const env = parsedEnv.data

/*
safeParse: Esse método é usado para validar o objeto process.env (que contém as variáveis de ambiente). A função safeParse retorna um objeto com duas propriedades:
success: Um booleano que indica se a validação foi bem-sucedida.
error: Um objeto que contém informações sobre os erros de validação, se houver.

*/