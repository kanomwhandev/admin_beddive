import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = auth();

  if (userId) {
    const user = await clerkClient().users.getUser(userId);
    const role = user.publicMetadata.role as string;

    if (role === "admin") {
      redirect("/admin");
    } else {
      redirect("/dashboard");
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-20">Homepage</h1>
    </div>
  );
}
