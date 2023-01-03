import { component$ } from "@builder.io/qwik";
import medicine from "~/interface/medicine";

interface props {
  med: medicine;
}

export default component$((props: props) => {
  return (
    <div class={"rounded-lg border border-kSkyBlue text-kDarkBlue my-2 p-4"}>
      <div class={"flex text-xs gap-1 mb-1 items-center text-kDarkBlue/60"}>
        <div
          class={
            "bg-kSkyBlue/40 rounded-md px-2 py-2 my-0 text-kDarkBlue font-semibold"
          }
        >
          {props.med.isGeneric ? "後発" : "先発"}
        </div>
        <div>{`¥${props.med.unit_price}`}</div>
        <div class={"grow"}></div>
        <div>{props.med.category}</div>
      </div>
      <div class={"text-lg xl:text-xl font-semibold break-words mt-2 xl:mt-4"}>
        {props.med.name}
      </div>
      <div class={"mt-2 flex items-center gap-1"}>
        <div
          class={
            "flex items-center bg-kSkyBlue/40 rounded-md px-2 text-kDarkBlue font-semibold text-xs my-1"
          }
        >
          <p class={"py-2 my-0"}>
            {"成分名"}
            {/* <br />
            {"(一般名)"} */}
          </p>
        </div>
        <p
          class={
            "text-xs xl:text-sm text-kDarkBlue/60 break-words my-0 py-1 mr-1"
          }
        >
          {props.med.general_name}
        </p>
      </div>
      <div class="flex items-center mt-2">
        <div class={"grow"}></div>
        <div
          class={
            "border-l-2 border-kOrange flex pl-2 items-baseline gap-1 w-fit"
          }
        >
          <p class={"text-xl font-semibold my-0 xl:text-3xl"}>
            {props.med.amount}
          </p>
          <p class={"text-xs my-0 text-kDarkBlue/60"}>{props.med.unit}</p>
        </div>
      </div>
    </div>
  );
});
