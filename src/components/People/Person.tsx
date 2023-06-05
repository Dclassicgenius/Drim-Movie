import { useParams } from "react-router-dom";
import { Bio } from "./Bio";
import { Credits } from "./Credits";

export function Person() {
  const { id } = useParams<{ id?: string }>();
  const personId = parseInt(id ?? "0");

  return (
    <>
      <section className="sm:grid sm:grid-cols-8 sm:pl-7">
        <Bio id={personId} />
        <Credits id={personId} />
      </section>
    </>
  );
}
