"use client";
import ActionButton from "@/components/Buttons/ActionButton";

const loading = () => {
  return (
    <section className="relative flex h-full flex-1 flex-col bg-dark_charcoal text-transparent">
      <section className="flex justify-center bg-strange_black p-4 md:px-12">
        <div className="grid w-full max-w-screen-lg grid-cols-autoX1 gap-4 md:gap-6">
          <button className="h-20 w-20 animate-pulse rounded-full bg-arsenic md:h-28 md:w-28"></button>
          <div className="flex flex-col justify-center gap-1 overflow-hidden md:gap-2">
            <h4 className="animate-pulse rounded-full bg-arsenic text-transparent md:text-base">
              Welcome Back
            </h4>
            <span className="h-[2px] rounded md:h-[3px]"></span>
            <h2 className="w-full animate-pulse truncate rounded-full bg-arsenic font-semibold md:text-2xl">
              Unnamed account
            </h2>
          </div>
        </div>
      </section>
      <section className="flex justify-center bg-raisin_black px-4 py-3 md:px-12 md:py-4">
        <div className="w-full max-w-screen-lg">
          <p className="animate-pulse rounded-full bg-arsenic text-sm md:text-base">
            Welcome to the profile page. Here you can edit your personal
            details, including cost & allergies.
          </p>
        </div>
      </section>
      <section className="flex justify-center px-4 py-6 md:flex-1 md:px-12 ">
        <ul className="grid h-fit w-full max-w-screen-lg auto-rows-max gap-6  md:grid-cols-2">
          <li className="h-20 animate-pulse rounded bg-arsenic"></li>
          <li className="h-20 animate-pulse rounded bg-arsenic"></li>
          <li className="h-20 animate-pulse rounded bg-arsenic"></li>
          <li className="h-20 animate-pulse rounded bg-arsenic"></li>
          <li className="h-20 animate-pulse rounded bg-arsenic"></li>
          <li className="h-20 animate-pulse rounded bg-arsenic"></li>
        </ul>
      </section>
      <section className="sticky bottom-0 z-40 flex w-full justify-center bg-strange_black px-4 py-3 md:px-12 md:py-4">
        <div className="flex w-full max-w-screen-lg items-center justify-between">
          <div className="flex flex-col gap-1 md:flex-row md:gap-2">
            <p className="animate-pulse rounded-full bg-arsenic text-sm md:text-base">
              Last updated:
            </p>
            <p className="animate-pulse rounded-full bg-arsenic text-sm font-semibold md:text-base">
              00-00-0000 | 00:00
            </p>
          </div>
          <div className="relative">
            <div className="invisible">
              <ActionButton
                icon="save"
                variant="outlined-small"
                label="Save Changes"
                name="Save"
                title="Save Changes"
              />
            </div>

            <div className="absolute inset-0 animate-pulse rounded bg-arsenic"></div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default loading;
