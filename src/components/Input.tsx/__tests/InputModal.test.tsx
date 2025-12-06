// InputModal.test.tsx
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import InputModal from "../InputModal";
import type { ModalProps } from "../types";

// ---- Mocks ----

interface AppTextProps {
  children?: React.ReactNode;
  className?: string;
}

jest.mock("../../AppText", () => {
  const { Text: RNText } = require("react-native");

  const AppText = ({ children }: AppTextProps) => <RNText>{children}</RNText>;

  return {
    __esModule: true,
    default: AppText
  };
});

// Mock react-native Modal so it just renders children when visible is true
interface MockModalProps {
  visible: boolean;
  children?: React.ReactNode;
  onRequestClose?: () => void;
  transparent?: boolean;
  animationType?: "none" | "slide" | "fade";
  [key: string]: unknown;
}

jest.mock("react-native/Libraries/Modal/Modal", () => {
  const MockModal = ({
    visible,
    children
  }: MockModalProps): React.ReactElement | null => {
    if (!visible) return null;
    return <>{children}</>;
  };

  return {
    __esModule: true,
    default: MockModal
  };
});

// ---- Test data helpers ----
const createBaseProps = (overrides?: Partial<ModalProps>): ModalProps => ({
  visible: true,
  title: "Select option",
  setVisible: () => {},
  onSelect: () => {},
  options: [
    {
      label: "First",
      value: "first",
      icon: "⭐",
      subLabel: "Sub 1"
    },
    {
      label: "Second",
      value: "second"
    }
  ],
  ...overrides
});

// ---- Tests ----
describe("InputModal", () => {
  it("renders title and options when visible (snapshot)", () => {
    const props = createBaseProps();
    const { getByText, toJSON } = render(<InputModal {...props} />);

    expect(getByText("Select option")).toBeTruthy();
    expect(getByText("First")).toBeTruthy();
    expect(getByText("Second")).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it("does not render content when visible is false", () => {
    const props = createBaseProps({ visible: false });
    const { queryByText } = render(<InputModal {...props} />);

    expect(queryByText("Select option")).toBeNull();
    expect(queryByText("First")).toBeNull();
  });

  it("calls onSelect and closes when an option is pressed", () => {
    const setVisible = jest.fn<void, [boolean]>();
    const onSelect = jest.fn<void, [ModalProps["options"][number]]>();

    const props = createBaseProps({ setVisible, onSelect });

    const { getByText } = render(<InputModal {...props} />);

    const firstOption = getByText("First");
    fireEvent.press(firstOption);

    expect(onSelect).toHaveBeenCalledTimes(1);
    const selectedArg = onSelect.mock.calls[0]?.[0];

    expect(selectedArg?.label).toBe("First");
    expect(selectedArg?.value).toBe("first");

    // Modal should request to close
    expect(setVisible).toHaveBeenCalledWith(false);
  });

  it("closes the modal when the close (✕) button is pressed", () => {
    const setVisible = jest.fn<void, [boolean]>();
    const onSelect = jest.fn<void, [ModalProps["options"][number]]>();

    const props = createBaseProps({ setVisible, onSelect });

    const { getByText } = render(<InputModal {...props} />);

    const closeButton = getByText("✕");
    fireEvent.press(closeButton);

    expect(setVisible).toHaveBeenCalledTimes(1);
    expect(setVisible).toHaveBeenCalledWith(false);
    // Ensure no option selection callback is fired
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("renders icon and subLabel when provided", () => {
    const props = createBaseProps();

    const { getByText } = render(<InputModal {...props} />);

    // Icon
    expect(getByText("⭐")).toBeTruthy();
    // subLabel
    expect(getByText("Sub 1")).toBeTruthy();
  });
});
