import { component$, PropFunction, QwikChangeEvent } from "@builder.io/qwik";

interface RadioProps {
  label: string;
  description: string;
  value: string;
  checked: boolean | undefined;
  onChange$?: PropFunction<(e: QwikChangeEvent<HTMLInputElement>) => void>;
}

export default component$((props: RadioProps) => {
  return (
    <div class="flex p-4 rounded-lg hover:bg-kSkyBlue/10 dark:hover:bg-gray-600 border">
      <div class="flex items-center h-5">
        <input
          name="helper-radio"
          type="radio"
          value={props.value}
          checked={props.checked}
          class="mt-2 w-6 h-6 text-blue-600 accent-orange-600 bg-gray-100 border-gray-400"
          onChange$={props.onChange$}
        />
      </div>
      <div class="ml-2 text-sm">
        <label
          for="helper-radio-6"
          class="font-semibold text-lg text-kDarkBlue dark:text-gray-300"
        >
          <div>{props.label}</div>
          <p
            id="helper-radio-text-6"
            class="text-xs break-words my-1 font-normal text-gray-500 dark:text-gray-300"
          >
            {props.description}
          </p>
        </label>
      </div>
    </div>
  );
});
