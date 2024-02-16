import MessageModal from "@/components/Modals/MessageModal/MessageModal";

export default function Custom404() {
  return (
    <section className="fill-body pattern flex items-center justify-center px-5 py-10">
      <MessageModal variant={404} />
    </section>
  );
}
