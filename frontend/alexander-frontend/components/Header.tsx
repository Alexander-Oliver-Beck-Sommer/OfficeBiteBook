import HamburgerButton from "./Buttons/HamburgerButton";

export default function Header() {
  return (
    <header className="flex justify-center w-full px-16 md:px-48">
      <section className="flex justify-between w-full max-w-screen-xl align-middle border-2 border-sunset_orange">
        <div className="w-48 h-48 border-2 border-ghost_white"></div>
        <HamburgerButton
          showOn={"mobile-tablet"}
          ariaLabel={"Open and close the navigation menu"}
        />
        <nav className="hidden h-48 border-2 border-ghost_white lg:block">
          <p>Nav only shows in the header on desktop size!</p>
        </nav>
      </section>
    </header>
  );
}
