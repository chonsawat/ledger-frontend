import toast from "react-hot-toast";
import { addLedger } from "../../services/apiLedger";
import { LedgerType } from "../../store/ledgerStore";
import { devDebug } from "../../utils/utils";
import { AccountType } from "../Account/Account";

export async function useCreateLedger({ request }: any) {
  devDebug("createLedger", function () {
    console.log(request);
  })

  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; // Format: "YYYY-MM-DD"

  const formData = await request.formData();
  const data = Object.fromEntries(formData)

  const selectedCreditData = JSON.parse(data.accounts).filter((x: AccountType) => x.id == data.credit_account)
  const selectedDebitData = JSON.parse(data.accounts).filter((x: AccountType) => x.id == data.debit_account)
  const ledger: LedgerType = {
    id: undefined,
    date: data.date,
    description: data.description,
    credit_account: selectedCreditData[0] ? { ...selectedCreditData[0], updateDate: formattedDate } : null,
    debit_account: selectedDebitData[0] ? { ...selectedDebitData[0], updateDate: formattedDate } : null,
    credit_amount: data.credit_amount,
    debit_amount: data.debit_amount,
  }

  const addedLedger = await addLedger(ledger);
  toast.success("Ledger successfully added");
  return window.history.back()
}

// TODO: mutate after add ledgers
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
//
// const queryClient = useQueryClient()
// const { mutate: useCreateLedgerMutate } = useMutation({
//   mutationFn: useCreateLedger,
//   onSuccess: () => {
//     toast.success("Ledger successfully added");
//     queryClient.invalidateQueries({ queryKey: ["groupOfLedger"] });
//   },
//   onError: (err) => toast.error(err.message),
// });