export type SignUpCommand = {
  name: string
  email: string
  password: string
}

export type SignUpResult = {
  token: string
  code?: string
}
