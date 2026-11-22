export const sendMessage = async (inputs: FormData) => {
  const response = await fetch("api/notifications", {
    method: "POST",
    body: inputs,
  });

  const data = await response.json();

  if (response.status === 400) {
    throw new Error("Проверьте поля формы");
  }

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
