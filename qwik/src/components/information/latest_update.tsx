import { component$, useSignal, useTask$ } from "@builder.io/qwik";

export default component$(() => {
  const fetchedUpdatedAt = useSignal("");

  const endPoint = import.meta.env.VITE_ENDPOINT;

  useTask$(async () => {
    const result = await fetch(`${endPoint}/medicine/status`);

    const data = await result.json();
    const date = new Date(data[0].updateAt);

    fetchedUpdatedAt.value = `${date.toLocaleString()}`;
  });

  return (
    <p
      class={"text-sm text-kDarkBlue"}
    >{`最終更新 : ${fetchedUpdatedAt.value}`}</p>
  );
});
