"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const onClickDoPayment = async () => {
    setIsLoading(true);
    const res = await fetch("/api/payment01", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    console.log(data);
    if (res.status !== 200) {
      alert(JSON.stringify(data));
    } else {
      alert(JSON.stringify(data));
      alert("支払いが完了しました");
    }
    setIsLoading(false);
  };

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">Yatai Template</h1>
      {session?.user ? (
        <button
          disabled={isLoading}
          onClick={onClickDoPayment}
          className="px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500"
        >
          {isLoading ? "支払い中..." : "支払いをする"}
        </button>
      ) : (
        <p>ログインしてください</p>
      )}
    </main>
  );
}
