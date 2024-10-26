import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = auth();
  const user = await currentUser();
  if (!userId || !user) {
    return <div>You are not logged in</div>;
  }
  return (
    <div className="mt-10 text-start text-black max-w-xl mx-auto bg-neutral-200 p-5 rounded">
      <h1 className="text-4xl font-bold text-center">
        Welcome to the Dashboard
      </h1>
      <div className="flex items-center justify-center py-5">
        <UserButton />
      </div>
      <ul className="list-none mt-10">
        <li className="mb-2">
          <span className="text-lg font-semibold">FirstName:</span>{" "}
          {user.firstName}
        </li>
        <li className="mb-2">
          <span className="text-lg font-semibold">LastName:</span>{" "}
          {user.lastName}
        </li>
        <li className="mb-2">
          <span className="text-lg font-semibold">Email:</span>{" "}
          {user.emailAddresses[0].emailAddress}
        </li>
        <li className="mb-2">
          <span className="text-lg font-semibold">Username:</span>{" "}
          {user.username}
        </li>
      </ul>
    </div>
  );
}
