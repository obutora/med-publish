import { component$, Resource, useResource$, useStore } from "@builder.io/qwik";
import Radio_card from "../radio_button/radio_card";
import S_card from "./s_card";

interface medicine {
  name: string;
  unit: string;
  unit_price: number;
  amount: number;
  category: string;
  general_name: string;
  id: number;
  isGeneric: boolean;
}

export default component$(() => {
  //   const inputState = useSignal("");
  const inputState = useStore({
    searchWord: "",
    isAllSell: false,
  });

  const medResource = useResource$<medicine[]>(async (ctx) => {
    ctx.track(() => inputState.searchWord);
    ctx.track(() => inputState.isAllSell);

    const url = `${import.meta.env.VITE_ENDPOINT}/medicine/name/${
      inputState.searchWord
    }/${inputState.isAllSell}`;

    const result = await fetch(url);

    const data = await result.json();

    if (data.length > 0) {
      return data;
    } else {
      return [];
    }
  });

  return (
    <S_card>
      <label
        for="default-input"
        class="block mb-2 text-sm text-kDarkBlue/60 dark:text-white w-full"
      >
        薬の名前を入力して🔎ボタンで検索できます。
      </label>
      <div class="flex gap-2 items-center">
        <input
          type="text"
          id="default-input"
          class="bg-sky-50/30 border md:w-1/2 border-gray-300 text-gray-900 font-semibold rounded-lg text-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
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
                {medList.map((med) => {
                  return (
                    <div
                      class={
                        "rounded-lg border border-kSkyBlue text-kDarkBlue my-2 p-4"
                      }
                    >
                      <div
                        class={
                          "flex text-xs gap-1 mb-1 items-center text-kDarkBlue/60"
                        }
                      >
                        <div
                          class={
                            "bg-kSkyBlue/40 rounded-md px-2 py-1 text-kDarkBlue font-semibold"
                          }
                        >
                          {med.isGeneric ? "後発" : "先発"}
                        </div>
                        <div>{`¥${med.unit_price}`}</div>
                        <div class={"grow"}></div>
                        <div>{med.category}</div>
                      </div>
                      <div
                        class={
                          "text-lg xl:text-xl font-semibold break-words my-2 xl:my-4"
                        }
                      >
                        {med.name}
                      </div>
                      <div class="flex items-center mt-2">
                        <div class={"grow"}></div>
                        <div
                          class={
                            "border-l-2 border-kOrange flex pl-2 items-baseline gap-1 w-fit"
                          }
                        >
                          <p class={"text-xl font-semibold my-0 xl:text-3xl"}>
                            {med.amount}
                          </p>
                          <p class={"text-xs my-0 text-kDarkBlue/60"}>
                            {med.unit}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }}
        ></Resource>
      </div>
    </S_card>
  );
});
