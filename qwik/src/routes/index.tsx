import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Search_med_card from "~/components/card/search_med_card";
import S_card from "~/components/card/s_card";
import Latest_update from "~/components/information/latest_update";

export default component$(() => {
  return (
    <div>
      <S_card>
        <h1>在庫検索</h1>
        <p>
          薬局の在庫を検索することができます。
          <br />
          <span class="underline">更新は1日に1回</span>
          のため、最新の在庫とは異なることをご了承ください。
        </p>
        <div>
          <Latest_update />
        </div>
      </S_card>

      <Search_med_card />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
