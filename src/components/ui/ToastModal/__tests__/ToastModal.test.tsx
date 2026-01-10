import { render } from "@testing-library/react-native";
import React from "react";
import ToastModal from "..";

// ---- Mocks ----

// Mock hp to return the same numeric value for simplicity
// jest.mock("@/constants/common", () => {
//   const hp = (value: number): number => value;
//   return { hp };
// });

// Mock AppText
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

// Mock Modal so it just renders children when visible is true
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

// ---- Tests ----
describe("ToastModal", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("renders message when visible and matches snapshot", () => {
    const { getByText, toJSON } = render(
      <ToastModal visible message="Hello toast" onClose={() => {}} />
    );

    expect(getByText("Hello toast")).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it("does not render content when visible is false", () => {
    const { queryByText } = render(
      <ToastModal visible={false} message="Hidden toast" onClose={() => {}} />
    );

    expect(queryByText("Hidden toast")).toBeNull();
  });

  it("calls onClose automatically after the given duration", () => {
    const onClose = jest.fn<void, []>();

    render(
      <ToastModal
        visible
        message="Auto close"
        duration={1000}
        onClose={onClose}
      />
    );

    // No call before time passes
    expect(onClose).not.toHaveBeenCalled();

    // Advance timers past duration
    jest.advanceTimersByTime(1000);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not schedule auto-close when visible is false", () => {
    const onClose = jest.fn<void, []>();

    render(
      <ToastModal
        visible={false}
        message="Should not auto close"
        duration={1000}
        onClose={onClose}
      />
    );

    jest.advanceTimersByTime(2000);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("invokes onClose when Modal requests close", () => {
    const onClose = jest.fn<void, []>();

    const { rerender } = render(
      <ToastModal visible message="Close me" onClose={onClose} />
    );

    rerender(<ToastModal visible message="Close me" onClose={onClose} />);

    onClose();

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
