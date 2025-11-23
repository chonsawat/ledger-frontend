import type { Meta, StoryObj } from "@storybook/react-vite";
import ResponsiveUIIndicator from "../Responsive/ResponsiveUIIndicator";
import LedgerTableC from "./LedgerTableC";

const meta = {
  title: "Ledger/LedgerTable",
  component: LedgerTableC,
  parameters: {
    // layout: "centered"
  },
} satisfies Meta<typeof LedgerTableC>;

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    data: [
      {
        id: 1,
        date: "2025-11-23",
        description: "Mock Up Description",
        credit_account: { id: 1, desc: "Mock up 1" },
        credit_amount: 500,
        debit_account: { id: 2, desc: "Debit Mock up" },
        debit_amount: 100,
      },
      {
        id: 3,
        date: "2025-11-23",
        description: "Mock Up Description",
        credit_account: { id: 1, desc: "Mock up 3" },
        credit_amount: 500,
        debit_account: { id: 2, desc: "Debit Mock up" },
        debit_amount: 100,
      },
      {
        id: 4,
        date: "2025-11-23",
        description: "Mock Up Description",
        credit_account: { id: 0, desc: "" },
        credit_amount: 500,
        debit_account: { id: 2, desc: "Debit Mock up 4" },
        debit_amount: 100,
      },
      {
        id: 5,
        date: "2025-11-22",
        description: "Mock Up Description",
        credit_account: { id: 1, desc: "Mock up 5" },
        credit_amount: 500,
        debit_account: { id: 0, desc: "" },
        debit_amount: 100,
      },
    ],
    isLoading: false
  }
}