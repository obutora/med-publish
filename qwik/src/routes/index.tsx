import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Search_med_block from "~/components/card/search_med_block";
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

      <Search_med_block />
    </div>
  );
});

export const head: DocumentHead = {
  title: "医薬品検索",
  meta: [
    {
      name: "医薬品検索",
      content: "薬局が在庫している医薬品を検索することができるサイトです。",
    },
  ],
};
