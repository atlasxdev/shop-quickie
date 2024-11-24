import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import { Checkout } from "@/features/checkout/Checkout";

test("renders unauthorized message for logged-out user", () => {
  render(<Checkout productId="1" quantity="2" />);
  expect(screen.getByText("Unauthorized Access")).toBeInTheDocument();
});

test("renders product not found message when product ID is invalid", () => {
  render(<Checkout productId="21" quantity="2" />);
  expect(screen.getByText("🔍 Product Not Found!")).toBeInTheDocument();
});

test("renders quantity limit message when quantity exceeds limit", () => {
  render(<Checkout productId="1" quantity="11" />);

  expect(screen.getByText("🚫 Hold up!")).toBeInTheDocument();
});
