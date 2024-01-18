import { auth } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talk User",
};

export default async function NotesPage() {
  const { userId } = auth();

  if (!userId) throw Error("userId undefined");

  return (
    <div className="  grid gap-3 text-2xl font-semibold sm:grid-cols-2 lg:grid-cols-3">
      hello
    </div>
  );
}
