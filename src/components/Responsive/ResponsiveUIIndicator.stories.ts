import type { Meta, StoryObj } from "@storybook/react-vite";
import ResponsiveUIIndicator from "./ResponsiveUIIndicator";

const meta = {
  title: "Responsive/ResponsiveUIIndicator",
  component: ResponsiveUIIndicator,
  parameters: {
    layout: "centered"
  },
} satisfies Meta<typeof ResponsiveUIIndicator>;

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {}
}