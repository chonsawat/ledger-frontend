export type UseNewAccountType = {
  id: number,
  description: string,
  originalBalance: number
}

export type AccountType = {
  id: number,
  desc?: string,
  balance: number
}

export type CreateAccountType = {
  id: number,
  desc: string,
  original_balance: number
}