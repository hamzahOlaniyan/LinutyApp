import { render } from "@testing-library/react-native";
import React from "react";
import AppText from "..";

describe("AppText", () => {
  it("renders children text", () => {
    const { getByText } = render(<AppText>Hello world</AppText>);
    expect(getByText("Hello world")).toBeTruthy();
  });

  it("applies default variant and base styles", () => {
    const { getByText } = render(<AppText>Default text</AppText>);
    const text = getByText("Default text");

    // From cva base + default variant + default color
    expect(text.props.className).toContain("text-text");
    expect(text.props.className).toContain("font-sans");
    expect(text.props.className).toContain("text-base");
  });

  it("applies the title variant styles", () => {
    const { getByText } = render(<AppText variant="title">Title text</AppText>);
    const text = getByText("Title text");

    expect(text.props.className).toContain("text-3xl");
    expect(text.props.className).toContain("font-Semibold");
  });

  it("applies the link variant styles", () => {
    const { getByText } = render(<AppText variant="link">Link text</AppText>);
    const text = getByText("Link text");

    expect(text.props.className).toContain("text-primary");
    expect(text.props.className).toContain("underline");
  });

  it("applies the error variant styles", () => {
    const { getByText } = render(<AppText variant="error">Error text</AppText>);
    const text = getByText("Error text");

    expect(text.props.className).toContain("text-sm");
    expect(text.props.className).toContain("text-red-600");
    expect(text.props.className).toContain("font-medium");
  });

  it("applies color prop correctly", () => {
    const { getByText } = render(
      <AppText color="primary">Primary colored</AppText>
    );
    const text = getByText("Primary colored");

    expect(text.props.className).toContain("text-primary");
  });

  it("applies size prop correctly", () => {
    const { getByText } = render(<AppText size="lg">Large text</AppText>);
    const text = getByText("Large text");

    // Size should be applied on top of variant defaults
    expect(text.props.className).toContain("text-lg");
  });

  it("merges custom className with generated classes", () => {
    const { getByText } = render(
      <AppText className="font-bold text-green-500">Custom class text</AppText>
    );
    const text = getByText("Custom class text");

    expect(text.props.className).toContain("text-green-500");
    expect(text.props.className).toContain("font-bold");
  });

  it("forwards other Text props (e.g. accessibilityLabel)", () => {
    const { getByLabelText } = render(
      <AppText accessibilityLabel="label-text">A11y text</AppText>
    );

    expect(getByLabelText("label-text")).toBeTruthy();
  });

  it("matches snapshot with default props", () => {
    const { toJSON } = render(<AppText>Snapshot text</AppText>);
    expect(toJSON()).toMatchSnapshot();
  });
});
