"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  const handleSignin = async () => {
    signIn("Yatai");
  };

  const handleLogout = async () => {
    signOut();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <Link href="/">
              <p className="text-2xl font-bold">Yatai Template</p>
            </Link>
          </div>
          <div className="flex items-center">
            {session?.user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-500"
              >
                ログアウト
              </button>
            ) : (
              <button
                onClick={handleSignin}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500"
              >
                ログイン
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
