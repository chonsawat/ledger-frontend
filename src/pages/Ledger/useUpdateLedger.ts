import { updateLedger } from "../../services/apiLedger";
import { devDebug } from "../../utils/utils";
import { AccountType } from "../Account/Account";

// TODO: Fix error on update api
export async function useUpdateLedger({
  params,
  request,
}: {
  params: any;
  request: any;
}) {

  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`; // Format: "YYYY-MM-DD"

  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const selectedCreditData = JSON.parse(data.accounts).filter(
    (x: AccountType) => x.id == data.credit_account,
  );
  const selectedDebitData = JSON.parse(data.accounts).filter(
    (x: AccountType) => x.id == data.debit_account,
  );
  const ledger = {
    id: params.theId,
    date: data.date,
    description: data.description,
    credit_account: selectedCreditData[0]
      ? { ...selectedCreditData[0], updateDate: formattedDate }
      : null,
    debit_account: selectedDebitData[0]
      ? { ...selectedDebitData[0], updateDate: formattedDate }
      : null,
    credit_amount: data.credit_amount,
    debit_amount: data.debit_amount,
  };

  let updatedLedger = await updateLedger(ledger);
  devDebug("useUpdateLedger", function () {
    console.log(params);
    console.log(ledger);
  });

  return window.history.back();
}