import { component$, Resource, useResource$, useStore } from "@builder.io/qwik";
import medicine from "~/interface/medicine";
import Radio_card from "../radio_button/radio_card";
import Med_card from "./med_card";
import S_card from "./s_card";

export default component$(() => {
  const inputState = useStore({
    searchWord: "",
    isAllSell: false,
    // medList: [] as medicine[],
  });

  // useTask$(async ({ track }) => {
  //   track(() => inputState.searchWord);
  //   track(() => inputState.isAllSell);

  //   const endPoint = import.meta.env.VITE_ENDPOINT;
  //   const url = `${endPoint}/medicine/name/${inputState.searchWord}/${inputState.isAllSell}`;

  //   if (inputState.searchWord === "") {
  //     inputState.medList = [];
  //   } else {
  //     try {
  //       const result = await fetch(url);

  //       if (result.status === 200) {
  //         const data = await result.json();
  //         inputState.medList = data;
  //       } else {
  //         inputState.medList = [];
  //       }
  //     } catch (e) {
  //       console.log(e);
  //       inputState.medList = [];
  //     }
  //   }
  // });

  const medResource = useResource$<medicine[]>(async (ctx) => {
    ctx.track(() => inputState.searchWord);
    ctx.track(() => inputState.isAllSell);

    const endPoint = import.meta.env.VITE_ENDPOINT;
    const url = `${endPoint}/medicine/name/${inputState.searchWord}/${inputState.isAllSell}`;

    if (inputState.searchWord === "") return [];

    try {
      const result = await fetch(url);

      if (result.status === 200) {
        const data = await result.json();
        return data;
      } else {
        return [];
      }
    } catch (e) {
      console.log(e);
      return [];
    }
  });

  return (
    <S_card>
      <label for="default-input" class="block mb-2 w-full caption">
        薬の名前を入力して🔎ボタンで検索できます。
      </label>
      <div class="flex gap-2 items-center">
        <input
          type="text"
          id="default-input"
          class="bg-sky-50/30 border w-fit md:w-1/2 border-gray-300 text-gray-900 font-semibold rounded-lg text-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
          preventdefault:click
          onChange$={(e) => (inputState.searchWord = e.target.value)}
        />
        <button
          preventdefault:click
          class="bg-kSkyBlue rounded-md text-kDarkBlue font-semibold p-2.5"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2.5a7.5 7.5 0 0 1 5.964 12.048l4.743 4.745a1 1 0 0 1-1.32 1.497l-.094-.083-4.745-4.743A7.5 7.5 0 1 1 10 2.5Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"
              fill="#FFFFFF"
            />
          </svg>
        </button>
      </div>

      <div class={"grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4"}>
        <Radio_card
          label="商品名"
          description="ノルバスクで検索すると、ノルバスクのみがヒットし、アムロジピンはヒットしません。"
          value={"0"}
          checked={true}
          onChange$={() => {
            inputState.isAllSell = false;
          }}
        />
        <Radio_card
          label="成分名"
          description="アムロジピンで検索すると、アムロジピンのほかノルバスクやアムバロなどアムロジピンを含むすべての商品がヒットします。"
          value={"1"}
          checked={false}
          onChange$={() => {
            inputState.isAllSell = true;
          }}
        />
      </div>

      <div class="mt-4">
        <Resource
          value={medResource}
          onPending={() => <div>Loading...</div>}
          onRejected={() => <div></div>}
          onResolved={(medList) => {
            return (
              <div>
                {inputState.searchWord === "" ? (
                  <p class={"caption"}>{"検索ワードを入力してください"}</p>
                ) : medList.length === 0 ? (
                  <p class={"caption"}>
                    {`${inputState.searchWord} は見つかりませんでした。`}
                    <br />
                    {
                      "一時的に在庫がゼロになっている場合もあるので直接お問い合わせください。"
                    }
                  </p>
                ) : (
                  <div>
                    {medList.map((med) => {
                      return <Med_card med={med} key={med.id} />;
                    })}
                  </div>
                )}
              </div>
            );
          }}
        ></Resource>
      </div>
    </S_card>
  );
});
