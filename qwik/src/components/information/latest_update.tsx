import { component$, useSignal, useTask$ } from "@builder.io/qwik";

export default component$(() => {
  const fetchedUpdatedAt = useSignal("");

  useTask$(async () => {
    // const result = await axios.get(
    //   `${import.meta.env.VITE_ENDPOINT}/medicine/status`
    // );
    // const date = new Date(result.data[0].updateAt);

    const result = await fetch(
      `${import.meta.env.VITE_ENDPOINT}/medicine/status`
    );

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
