import { component$, Slot } from "@builder.io/qwik";
import Header from "../components/header/header";

export default component$(() => {
  return (
    <>
      <main>
        <Header />
        <section>
          <Slot />
        </section>
      </main>
      <footer class={"text-white text-sm"}>
        producted by Kunihiko Haga
        <br />
        All rights reserved.
      </footer>
    </>
  );
});
