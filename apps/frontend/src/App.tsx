const testFetch = async () => {
  const response = await fetch("/api/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Заголовок жесткий",
      message: "Привет как дела",
      recipient: "ilya@gmail.com",
    }),
  });

  if (!response.ok) {
    console.error("Ошибка");
    return;
  }

  const data = await response.json();

  console.log(data, response.status);
};

export const App = () => {
  return (
    <div>
      <button onClick={testFetch}>отправить</button>
    </div>
  );
};
