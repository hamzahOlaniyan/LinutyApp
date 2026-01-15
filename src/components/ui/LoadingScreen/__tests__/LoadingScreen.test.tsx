import { render } from "@testing-library/react-native";
import React from "react";
import LoadingScreen from "..";

// ---- Mocks ----

// Mock expo-image's Image so we can inspect props easily
interface MockImageProps {
  source: unknown;
  style?: {
    height?: number;
    width?: number;
    zIndex?: number;
    [key: string]: unknown;
  };
}

jest.mock("expo-image", () => {
  const { View: RNView } = require("react-native");

  const Image = ({ style }: MockImageProps) => (
    <RNView testID="loading-logo" style={style} />
  );

  return {
    __esModule: true,
    Image
  };
});

describe("LoadingScreen", () => {
  it("renders a full-screen container with the logo (snapshot)", () => {
    const { toJSON, getByTestId } = render(<LoadingScreen />);

    const logo = getByTestId("loading");
    expect(logo).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });

  // it("renders the logo with expected height, width and zIndex", () => {
  //   const { getByTestId } = render(<LoadingScreen />);

  //   const logo = getByTestId("loading-logo");

  //   type StyleShape = {
  //     height?: number;
  //     width?: number;
  //     zIndex?: number;
  //     [key: string]: unknown;
  //   };

  //   const styleProp = logo.props.style as StyleShape | StyleShape[] | undefined;

  //   const flatStyle: StyleShape = Array.isArray(styleProp)
  //     ? styleProp.reduce<StyleShape>((acc, s) => ({ ...acc, ...s }), {})
  //     : (styleProp ?? {});

  //   expect(flatStyle.height).toBe(100);
  //   expect(flatStyle.width).toBe(100);
  //   expect(flatStyle.opacity).toBe(0.3);
  // });
});
