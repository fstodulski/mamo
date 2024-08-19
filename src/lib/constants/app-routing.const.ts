import { SweetPath } from "sweet-path";

export const APP_ROUTING = {
  home: new SweetPath("/"),
  products: {
    index: new SweetPath("/products"),
    single: new SweetPath("/products/:id"),
  },
  expenses: {
    index: new SweetPath<"limit" | "page">("/expenses?page=:page&limit=:limit"),
  },
};
