import Link from "next/link";
import Router from "next/router";

export default function test() {
  return (
    <div
      onClick={() => {
        Router.push("/");
      }}
    >
      go home
    </div>
  );
}
