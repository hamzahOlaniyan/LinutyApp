// src/components/ui/AppText/__tests__/AppText.test.tsx
import { render } from "@testing-library/react-native";
import React from "react";

// 👇 mock hp so font sizes are predictable
jest.mock("@/constant/common", () => ({
  hp: (percentage: number) => percentage // hp(3) => 3, hp(1.8) => 1.8, etc.
}));

import AppText from "..";

describe("AppText", () => {
  it("renders children text", () => {
    const { getByText } = render(<AppText>Hello world</AppText>);

    const text = getByText("Hello world");
    expect(text).toBeTruthy();
  });

  it("applies default body variant and base styles", () => {
    const { getByText } = render(<AppText>Body text</AppText>);

    const text = getByText("Body text");

    // className should include base + body font
    expect(text.props.className).toContain("font-Regular");
    expect(text.props.className).toContain("text-text");

    // hp is mocked so body => hp(1.9) === 1.9
    const styleArray = Array.isArray(text.props.style)
      ? text.props.style
      : [text.props.style];

    const style = styleArray[0];
    expect(style.fontSize).toBe(1.9);
  });

  it("applies header variant styles and font size", () => {
    const { getByText } = render(
      <AppText variant="header">Header text</AppText>
    );

    const text = getByText("Header text");

    // should use header font class
    expect(text.props.className).toContain("font-Bold");

    // hp mocked → header => hp(3) === 3
    const styleArray = Array.isArray(text.props.style)
      ? text.props.style
      : [text.props.style];

    const style = styleArray[0];
    expect(style.fontSize).toBe(2.6);
  });

  it("uses color prop to override text color", () => {
    const { getByText } = render(<AppText color="red">Colored text</AppText>);

    const text = getByText("Colored text");

    const styleArray = Array.isArray(text.props.style)
      ? text.props.style
      : [text.props.style];

    const style = styleArray[0];
    expect(style.color).toBe("red");
  });
});
