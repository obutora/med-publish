import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import axios from "axios";

export default component$(() => {
  const fetchedUpdatedAt = useSignal("");

  useTask$(async () => {
    const result = await axios.get("http://localhost:3000/medicine/status");
    const date = new Date(result.data[0].updateAt);

    fetchedUpdatedAt.value = `${date.toLocaleString()}`;
  });

  return (
    <p
      class={"text-sm text-kDarkBlue"}
    >{`最終更新 : ${fetchedUpdatedAt.value}`}</p>
  );
});
