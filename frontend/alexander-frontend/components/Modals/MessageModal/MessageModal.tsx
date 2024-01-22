import ShieldIcon from "@/components/Icons/ShieldIcon";
import FileDamagedIcon from "../../Icons/FileDamagedIcon";
import LogIcon from "@/components/icons/LogIcon";
import HomeIcon from "@/components/Icons/HomeIcon";
import Link from "next/link";

const variants = (variant: number) => {
  switch (variant) {
    case 401:
      return {
        landmark: "unauthenticated",
        title: "401",
        message: "Account required!",
        icon: (
          <ShieldIcon variant="user" className="h-8 w-8 fill-sunset_orange" />
        ),
        description:
          "Sorry, you must be logged in to access this page. Please login or try a different page.",
        link: {
          href: "/login",
          text: "Login",
          label: "Navigate to the login page",
        },
      };
    case 403:
      return {
        landmark: "forbidden",
        title: "403",
        message: "Access Denied!",
        icon: (
          <ShieldIcon
            variant="keyhole"
            className="h-8 w-8 fill-sunset_orange"
          />
        ),
        description:
          "Sorry, you don't have permission to access this page. Please check with your administrator or try a different page.",
        link: {
          href: "/",
          text: "Go Back",
          label: "Navigate to the home page",
        },
      };
    case 404:
      return {
        landmark: "not-found",
        title: "404",
        message: "Page not found!",
        icon: <FileDamagedIcon className="h-8 w-8 fill-sunset_orange" />,
        description:
          "We're sorry, but the page you're looking for doesn't exist. You can head back to the home page, or try again.",
        link: {
          href: "/",
          text: "Go Back",
          label: "Navigate to the home page",
        },
      };
    default:
      return {
        landmark: "default",
        title: "",
        message: "",
        icon: null,
        description: "",
        link: {
          href: "/",
          text: "",
          label: "",
        },
      };
  }
};

type MessageModalProps = {
  variant?: number;
};

const MessageModal = ({ variant = 401 }) => {
  const { landmark, title, message, icon, description, link } =
    variants(variant);

  return (
    <section
      aria-label={landmark}
      className="flex w-full items-center justify-center"
    >
      <section className="mx-4 my-8 flex justify-center md:mx-12 md:my-6">
        <section className="flex w-full animate-fade-up flex-col gap-4 animate-ease-in-out md:max-w-2xl md:gap-6 md:rounded md:border-2 md:border-arsenic md:bg-eerie_black md:px-8 md:py-10">
          <div className="flex items-center justify-between">
            <div className="flex items-end gap-3">
              <h1>{title}</h1>
              <h4 className="text-cool_grey">{message}</h4>
            </div>
            {icon}
          </div>
          <div className="h-[2px] rounded bg-sunset_orange"></div>
          <p className="text-cool_grey">{description}</p>
          <div className="flex justify-end">
            <Link
              aria-label={link.label}
              title={link.label}
              href={link.href}
              className="flex w-full items-center justify-center gap-3 rounded border-2 border-arsenic bg-eerie_black px-5 py-3 transition-colors duration-300 ease-in-out hover:bg-arsenic md:w-fit"
            >
              <h4>{link.text}</h4>
            </Link>
          </div>
        </section>
      </section>
    </section>
  );
};

export default MessageModal;
