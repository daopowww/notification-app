export { cn } from "cn";

export const createValuesToFormData = <T extends Record<string, unknown>>(
  values: T,
) => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (typeof value === "string" || value instanceof File) {
      formData.set(key, value);
    }
  });

  return formData;
};
