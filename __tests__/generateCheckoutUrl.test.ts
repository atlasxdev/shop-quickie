import { generateCheckoutUrl } from "@/lib/utils";
import { expect, test } from "vitest";

test("Throw an error for generating checkout url", () => {
  expect(() => generateCheckoutUrl([])).toThrowError("Invalid array content!");
});

test("Expects to generate a checkout url", () => {
  const products = [
    {
      productId: "1",
      quantity: 2,
      price: 100,
    },
  ];
  expect(generateCheckoutUrl(products)).toBe("productId=1&quantity=2");
});
