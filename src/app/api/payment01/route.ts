import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/auth";
import { reportPaymentFromUid } from "@/lib/yatai/payment";

export async function POST(request: Request) {
  const session = await getServerSession(options);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const quantity = 1;
    const payment = await reportPaymentFromUid(
      session.user.id,
      process.env.AIYATAI_PAYMENTPLAN_01 || "",
      quantity
    );
    return NextResponse.json({ paymentData: payment }, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
