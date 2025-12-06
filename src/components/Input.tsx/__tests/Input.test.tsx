import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { AppInput } from "..";
import { MetricItem, SelectOption } from "../types";

// ---- Mocks ----

// Colors
jest.mock("@/constants/theme", () => ({
  Colors: {
    light: {
      text: "#999999"
    }
  }
}));

// Icon
interface IconProps {
  name: string;
}

jest.mock("@/icons", () => {
  const { Text: RNText } = require("react-native");
  const Icon = ({ name }: IconProps) => <RNText>{name}</RNText>;

  return {
    __esModule: true,
    default: Icon
  };
});

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

jest.mock("./../suffixOptions", () => {
  const suffixOptions = {
    Countries: [
      {
        name: "Nigeria",
        code: "NG",
        flag: "🇳🇬",
        dialCode: "+234"
      },
      {
        name: "Ghana",
        code: "GH",
        flag: "🇬🇭",
        dialCode: "+233"
      }
    ]
  };

  return { suffixOptions };
});

interface InputModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  title: string;
  options: SelectOption[];
  onSelect: (item: SelectOption) => void;
}

jest.mock("./../InputModal", () => {
  const {
    View: RNView,
    Text: RNText,
    TouchableOpacity: RNTouchableOpacity
  } = require("react-native");

  const InputModal = ({
    visible,
    title,
    options,
    onSelect
  }: InputModalProps) => {
    if (!visible) return null;

    return (
      <RNView>
        <RNText>{title}</RNText>
        {options.map(option => (
          <RNTouchableOpacity
            key={option.value}
            onPress={() => onSelect(option)}
          >
            <RNText>{option.label}</RNText>
          </RNTouchableOpacity>
        ))}
      </RNView>
    );
  };

  return {
    __esModule: true,
    default: InputModal
  };
});

// ---- Tests ----
describe("AppInput", () => {
  it("renders label and caption when provided (snapshot)", () => {
    const { toJSON, getByText } = render(
      <AppInput
        label="Email"
        caption="We will send updates to this address"
        value=""
        onChangeText={() => {}}
      />
    );

    expect(getByText("Email")).toBeTruthy();
    expect(getByText("We will send updates to this address")).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it("uses 'email-address' keyboardType when email prop is set", () => {
    const { getByPlaceholderText } = render(
      <AppInput
        label="Email"
        email
        placeholder="Email"
        value=""
        onChangeText={() => {}}
      />
    );

    const input = getByPlaceholderText("Email");
    expect(input.props.keyboardType).toBe("email-address");
  });

  it("uses 'phone-pad' keyboardType when phoneNumber prop is set", () => {
    const { getByPlaceholderText } = render(
      <AppInput
        label="Phone"
        phoneNumber
        placeholder="Phone"
        value=""
        onChangeText={() => {}}
      />
    );

    const input = getByPlaceholderText("Phone");
    expect(input.props.keyboardType).toBe("phone-pad");
  });

  it("uses 'default' keyboardType when neither email nor phoneNumber is set", () => {
    const { getByPlaceholderText } = render(
      <AppInput
        label="Name"
        placeholder="Name"
        value=""
        onChangeText={() => {}}
      />
    );

    const input = getByPlaceholderText("Name");
    expect(input.props.keyboardType).toBe("default");
  });

  it("shows only the raw number in the text input when phoneNumber is true", () => {
    const fullValue = "+2348012345678";

    const { getByPlaceholderText } = render(
      <AppInput
        label="Phone"
        phoneNumber
        placeholder="Phone"
        value={fullValue}
        onChangeText={() => {}}
      />
    );

    const input = getByPlaceholderText("Phone");
    // Should strip the dial code "+234"
    expect(input.props.value).toBe("8012345678");
  });

  it("prefixes typed phone number with the selected dial code", () => {
    const handleChange = jest.fn<void, [string]>();

    const { getByPlaceholderText } = render(
      <AppInput
        label="Phone"
        phoneNumber
        placeholder="Phone"
        value=""
        onChangeText={handleChange}
      />
    );

    const input = getByPlaceholderText("Phone");

    fireEvent.changeText(input, "8012345678");

    expect(handleChange).toHaveBeenCalledWith("+2348012345678");
  });

  it("updates dial code and value when a new country is selected from the modal", () => {
    const handleChange = jest.fn<void, [string]>();

    const { getByText, getByPlaceholderText, rerender } = render(
      <AppInput
        label="Phone"
        phoneNumber
        placeholder="Phone"
        value="+2348012345678"
        onChangeText={handleChange}
      />
    );

    // Open modal by tapping the country selector
    const flagButton = getByText("🇳🇬");
    fireEvent.press(flagButton);

    // The InputModal mock now shows both countries: Nigeria and Ghana
    const ghanaOption = getByText("Ghana");
    fireEvent.press(ghanaOption);

    // Raw number should still be "8012345678" but now prefixed with "+233"
    expect(handleChange).toHaveBeenCalledWith("+2338012345678");

    // Simulate the controlled parent updating `value` from onChangeText
    const newValue =
      handleChange.mock.calls[handleChange.mock.calls.length - 1]?.[0] ?? "";

    rerender(
      <AppInput
        label="Phone"
        phoneNumber
        placeholder="Phone"
        value={newValue}
        onChangeText={handleChange}
      />
    );

    // The input should now display the raw number without the dial code
    const input = getByPlaceholderText("Phone");
    expect(input.props.value).toBe("8012345678");
  });

  it("toggles password visibility when isPassword is true", () => {
    const { getByPlaceholderText, getByText } = render(
      <AppInput
        label="Password"
        isPassword
        placeholder="Password"
        value="secret"
        onChangeText={() => {}}
      />
    );

    const input = getByPlaceholderText("Password");

    // Initially, password should be hidden (secureTextEntry = true)
    expect(input.props.secureTextEntry).toBe(true);
    // Icon mock renders the icon name as text; should start with "eye"
    const eyeIcon = getByText("eye");
    expect(eyeIcon).toBeTruthy();

    // Tap the eye to toggle visibility
    fireEvent.press(eyeIcon);

    // secureTextEntry should now be false, and icon should switch
    const updatedInput = getByPlaceholderText("Password");
    expect(updatedInput.props.secureTextEntry).toBe(false);
    const eyeSlashIcon = getByText("eye_slash");
    expect(eyeSlashIcon).toBeTruthy();
  });

  it("renders and updates metric suffix when suffix list is provided", () => {
    const metrics: MetricItem[] = [
      { name: "Kilogram", symbol: "kg" },
      { name: "Pounds", symbol: "lb" }
    ];

    const { getByText } = render(
      <AppInput
        label="Weight"
        suffix={metrics}
        value=""
        onChangeText={() => {}}
      />
    );

    // Initially, first metric is selected
    const kgText = getByText("kg");
    expect(kgText).toBeTruthy();

    // Open modal by tapping suffix
    fireEvent.press(kgText);

    // Modal shows "Kilogram" and "Pounds"; select Pounds
    const poundsOption = getByText("Pounds");
    fireEvent.press(poundsOption);

    // Now "lb" should be displayed as suffix
    const lbText = getByText("lb");
    expect(lbText).toBeTruthy();
  });

  it("enters select-only mode when isSelect is true and uses InputModal title from props", () => {
    const options: SelectOption[] = [
      { label: "Option 1", value: "opt1" },
      { label: "Option 2", value: "opt2" }
    ];

    const handleChange = jest.fn<void, [string]>();

    const { getByText, getByPlaceholderText } = render(
      <AppInput
        label="Goal"
        isSelect
        selectOptions={options}
        selectOptionsTitle="Select a goal"
        placeholder="Goal"
        value=""
        onChangeText={handleChange}
      />
    );

    const input = getByPlaceholderText("Goal");
    // readOnly should be true in select mode
    expect(input.props.readOnly).toBe(true);

    // There is an arrow icon rendered; tap it (select overlay)
    const arrowIcon = getByText("arrow_down");
    fireEvent.press(arrowIcon);

    // Modal should show the custom title and options
    const title = getByText("Select a goal");
    expect(title).toBeTruthy();

    const option1 = getByText("Option 1");
    fireEvent.press(option1);

    // AppInput should propagate selected value via onChangeText
    expect(handleChange).toHaveBeenCalledWith("opt1");
  });

  it("shows error message when errorMessage is provided", () => {
    const { getByText } = render(
      <AppInput
        label="Email"
        email
        value=""
        errorMessage="Email is required"
        onChangeText={() => {}}
      />
    );

    const errorText = getByText("Email is required");
    expect(errorText).toBeTruthy();
  });
});
