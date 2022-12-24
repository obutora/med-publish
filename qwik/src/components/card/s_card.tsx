import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class={"bg-white block w-full p-8 mb-4"}>
      <Slot />
    </div>
  );
});
