import React, { useState } from "react";
import { render, renderHook, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import { Checkout } from "@/features/checkout/Checkout";

test("sets user state", () => {
  const { result } = renderHook(() => {
    const [user, setUser] = useState<string | null>(null);
    React.useEffect(() => {
      setUser(null);
    }, []);

    return user;
  });
  expect(result.current).toBeNull();
});

test("renders product not found message when product ID is invalid", () => {
  render(<Checkout productId="21" quantity="2" />);
  expect(screen.getByText("🔍 Product Not Found!")).toBeInTheDocument();
});

test("renders quantity limit message when quantity exceeds limit", () => {
  render(<Checkout productId="1" quantity="11" />);

  expect(screen.getByText("✋ Hold up!")).toBeInTheDocument();
});
