import ErrorModal from "@/components/ErrorModal";

export default function Custom404() {
  return (
    <section className="fill-body pattern flex items-center justify-center px-5 py-10">
      <ErrorModal variant={404} />
    </section>
  );
}
