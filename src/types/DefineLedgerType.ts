export type GroupOfLedgerType = { [date: string]: LedgerType[] };
export type LedgerGroupByDateType = {
  date: string,
  data: LedgerType[]
}
export type UseCreateLedgerType = {
  accounts: string,
  id: number,
  date: string,
  description: string,
  credit_account: number,
  debit_account: number,
  credit_amount: number,
  debit_amount: number
}

export type LedgerType = {
  id: number | undefined,
  description: string
  date: string,
  credit_account: {
    id: number,
    desc: string
  }
  credit_amount: number
  debit_account: {
    id: number,
    desc: string
  }
  debit_amount: number
}

export type LedgerUpdateType = {
  id?: number,
  description?: string
  date?: string,
  credit_account?: number
  credit_amount?: number
  debit_account?: number
  debit_amount?: number
}

export type newLedgerDetailAccountSelectedType = {
  credit_account: number, debit_account: number
}
export type newLedgerDetailAccountSelectedTypeStore = newLedgerDetailAccountSelectedType & {
  setCreditAccount: (newValue: number) => void,
  setDebitAccount: (newValue: number) => void
}