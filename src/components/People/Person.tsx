import { useParams } from "react-router-dom";
import { Bio } from "./Bio";
import { Credits } from "./Credits";

export function Person() {
  const { id } = useParams<{ id?: string }>();
  const personId = parseInt(id ?? "0");

  return (
    <>
      <section className="grid grid-cols-8 pl-7">
        <Bio id={personId} />
        <Credits id={personId} />
      </section>
    </>
  );
}
