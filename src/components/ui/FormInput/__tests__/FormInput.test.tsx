import { useFormStore } from "@/store/useFormStore";
import { fireEvent, render } from "@testing-library/react-native";
import FormInput from "..";
import { Field } from "../types";

// Mock the form store
jest.mock("@/store/useFormStore", () => ({
  useFormStore: jest.fn()
}));

// Mock hp to return the same numeric value for simplicity
jest.mock("@/constant/common", () => ({
  hp: (n: number) => n,
  wp: (n: number) => n
}));

// Mock utils
jest.mock("@/lib/utils", () => ({
  emailRegex: /.+@.+\..+/,
  formatLabel: (name: string) => name.charAt(0).toUpperCase() + name.slice(1)
}));

interface TestAppInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  errorMessage?: string;
  // Allow extra props without typing everything
  [key: string]: unknown;
}

// Mock AppInput to a simple Text + TextInput
jest.mock("../../Input.tsx", () => ({
  AppInput: ({
    label,
    placeholder,
    value,
    onChangeText,
    errorMessage
  }: TestAppInputProps) => {
    const React = require("react");
    const { View, Text, TextInput } = require("react-native");

    return (
      <View>
        {label && <Text>{label}</Text>}
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          testID={`input-${label}`}
        />
        {errorMessage && <Text>{errorMessage}</Text>}
      </View>
    );
  }
}));

interface TestButtonProps {
  label: string;
  onPress?: () => void;
  loading?: boolean;
  className?: string;
}

// Mock Button to a simple pressable
jest.mock("../../Button", () => {
  return ({ label, onPress, loading, ...rest }: TestButtonProps) => {
    const { Text, TouchableOpacity } = require("react-native");
    return (
      <TouchableOpacity onPress={onPress} disabled={loading} {...rest}>
        <Text>{loading ? "Loading..." : label}</Text>
      </TouchableOpacity>
    );
  };
});

const mockedUseFormStore = useFormStore as unknown as jest.Mock;

describe("FormInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const baseFields: Field[] = [
    {
      name: "firstName",
      label: "First name",
      required: true,
      placeholder: "First name"
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      placeholder: "Email"
    },
    {
      name: "phone",
      label: "Phone",
      type: "phone",
      placeholder: "Phone"
    }
  ];

  it("renders all fields and the submit button (snapshot)", () => {
    const store = {
      formData: {
        firstName: "",
        email: "",
        phone: ""
      },
      errors: {},
      setFormData: jest.fn(),
      setFormErrors: jest.fn()
    };

    mockedUseFormStore.mockReturnValue(store);

    const { toJSON } = render(
      <FormInput fields={baseFields} submitBtnLabel="Continue" />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  // it("renders footerContent when provided", () => {
  //   const footer = <Text testID="footer-text">Footer content</Text>;

  //   const { getByTestId } = render(
  //     <FormInput fields={[]} submitBtnLabel="Continue" footerContent={footer} />
  //   );

  //   expect(getByTestId("footer-text")).toBeTruthy();
  // });

  it("validates required fields and sets errors when empty", () => {
    const setFormErrors = jest.fn();
    const store = {
      formData: {
        firstName: "",
        email: "",
        phone: ""
      },
      errors: {},
      setFormData: jest.fn(),
      setFormErrors
    };

    mockedUseFormStore.mockReturnValue(store);

    const { getByText } = render(
      <FormInput fields={baseFields} submitBtnLabel="Submit" />
    );

    fireEvent.press(getByText("Submit"));

    expect(setFormErrors).toHaveBeenCalledTimes(1);
    const errorArg = setFormErrors.mock.calls[0][0];

    expect(errorArg).toHaveProperty("firstName", "FirstName is required");
    expect(errorArg).toHaveProperty("email", "Email is required"); // Using mocked formatLabel
  });

  it("validates email field and sets error for invalid email", () => {
    const setFormErrors = jest.fn();
    const onSubmit = jest.fn();

    const store = {
      formData: {
        firstName: "John",
        email: "invalid-email",
        phone: ""
      },
      errors: {},
      setFormData: jest.fn(),
      setFormErrors
    };

    mockedUseFormStore.mockReturnValue(store);

    const { getByText } = render(
      <FormInput
        fields={baseFields}
        submitBtnLabel="Submit"
        onSubmit={onSubmit}
      />
    );

    fireEvent.press(getByText("Submit"));

    expect(setFormErrors).toHaveBeenCalledTimes(1);
    const errorArg = setFormErrors.mock.calls[0][0];

    expect(errorArg).toHaveProperty("email", "Please enter a valid email");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("validates phone number length and sets error when out of bounds", () => {
    const setFormErrors = jest.fn();

    const store = {
      formData: {
        firstName: "John",
        email: "john@example.com",
        phone: "123" // too short (<9)
      },
      errors: {},
      setFormData: jest.fn(),
      setFormErrors
    };

    mockedUseFormStore.mockReturnValue(store);

    const { getByText } = render(
      <FormInput fields={baseFields} submitBtnLabel="Submit" />
    );

    fireEvent.press(getByText("Submit"));

    expect(setFormErrors).toHaveBeenCalledTimes(1);
    const errorArg = setFormErrors.mock.calls[0][0];

    expect(errorArg).toHaveProperty(
      "phone",
      "Please enter a valid phone number"
    );
  });

  it("calls onSubmit when all validations pass", () => {
    const setFormErrors = jest.fn();
    const onSubmit = jest.fn();

    const store = {
      formData: {
        firstName: "John",
        email: "john@example.com",
        phone: "123456789"
      },
      errors: {},
      setFormData: jest.fn(),
      setFormErrors
    };

    mockedUseFormStore.mockReturnValue(store);

    const { getByText } = render(
      <FormInput
        fields={baseFields}
        submitBtnLabel="Submit"
        onSubmit={onSubmit}
      />
    );

    fireEvent.press(getByText("Submit"));

    expect(setFormErrors).toHaveBeenCalledWith({});
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("updates formData and clears field-specific error on text change", () => {
    const setFormData = jest.fn();
    const setFormErrors = jest.fn();

    const store = {
      formData: {
        firstName: "",
        email: "",
        phone: ""
      },
      errors: {
        firstName: "FirstName is required"
      },
      setFormData,
      setFormErrors
    };

    mockedUseFormStore.mockReturnValue(store);

    const { getByPlaceholderText } = render(
      <FormInput fields={baseFields} submitBtnLabel="Submit" />
    );

    const firstNameInput = getByPlaceholderText("First name");

    fireEvent.changeText(firstNameInput, "John");

    expect(setFormData).toHaveBeenCalledWith({ firstName: "John" });
    expect(setFormErrors).toHaveBeenCalledWith({ firstName: undefined });
  });

  // it("passes loading prop to Button and disables press when loading", () => {
  //   const setFormErrors = jest.fn();
  //   const onSubmit = jest.fn();

  //   const store = {
  //     formData: {
  //       firstName: "John",
  //       email: "john@example.com",
  //       phone: "1234567"
  //     },
  //     errors: {},
  //     setFormData: jest.fn(),
  //     setFormErrors
  //   };

  //   mockedUseFormStore.mockReturnValue(store);

  //   const { getByText } = render(
  //     <FormInput
  //       fields={baseFields}
  //       submitBtnLabel="Submit"
  //       onSubmit={onSubmit}
  //       loading={true}
  //     />
  //   );

  //   // const button = getByText("Loading...");

  //   // Press should be disabled
  //   fireEvent.press(button);

  //   expect(onSubmit).not.toHaveBeenCalled();
  //   // Still sets errors with empty object on submit handler not being called
  //   expect(setFormErrors).not.toHaveBeenCalled();
  // });

  it("shows 'Please select an option' for a required select field with no value", () => {
    const setFormErrors = jest.fn();

    const store = {
      formData: {
        goal: ""
      },
      errors: {},
      setFormData: jest.fn(),
      setFormErrors
    };

    mockedUseFormStore.mockReturnValue(store);

    const selectFields: Field[] = [
      {
        name: "goal",
        label: "Goal",
        required: true,
        mode: "select",
        placeholder: "Goal"
      }
    ];

    const { getByText } = render(
      <FormInput fields={selectFields} submitBtnLabel="Submit" />
    );

    fireEvent.press(getByText("Submit"));

    expect(setFormErrors).toHaveBeenCalledTimes(1);
    const errorArg = setFormErrors.mock.calls[0][0];

    expect(errorArg).toHaveProperty("goal", "Please select an option");
  });

  it("shows 'Please select a date' for a required date field with no value", () => {
    const setFormErrors = jest.fn();

    const store = {
      formData: {
        dob: ""
      },
      errors: {},
      setFormData: jest.fn(),
      setFormErrors
    };

    mockedUseFormStore.mockReturnValue(store);

    const dateFields: Field[] = [
      {
        name: "dob",
        label: "Date of birth",
        required: true,
        mode: "date",
        placeholder: "Date of birth"
      }
    ];

    const { getByText } = render(
      <FormInput fields={dateFields} submitBtnLabel="Submit" />
    );

    fireEvent.press(getByText("Submit"));

    expect(setFormErrors).toHaveBeenCalledTimes(1);
    const errorArg = setFormErrors.mock.calls[0][0];

    expect(errorArg).toHaveProperty("dob", "Please select a date");
  });
});
