import { component$, useSignal, useTask$ } from "@builder.io/qwik";

export default component$(() => {
  const fetchedUpdatedAt = useSignal("");

  const endPoint = import.meta.env.VITE_ENDPOINT;

  useTask$(async () => {
    const result = await fetch(`${endPoint}/medicine/status`);

    const data = await result.json();
    const date = new Date(data[0].updateAt);

//     fetchedUpdatedAt.value = `${date.toLocaleString()}`;
    fetchedUpdatedAt.value = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  });

  return (
    <p
      class={"text-sm text-kDarkBlue"}
    >{`最終更新 : ${fetchedUpdatedAt.value}`}</p>
  );
});
