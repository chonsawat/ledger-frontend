export type AccountType = {
  id?: number,
  desc?: string,
  balance?: number
  original_balance?: number
}

export type CreateAccountType = {
  id?: number,
  desc?: string,
  original_balance?: number
}

export type UpdateAccountType = {
  id?: number,
  desc?: string,
  original_balance?: number
}