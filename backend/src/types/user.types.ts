export type reqBody = {
    password: string,
    email: string,
    newEmail?: string
}

export type resBody = {
    message: string,
    token?: string,
    user?: {
        id: string | string[],
        email: string | string[]
    }
}