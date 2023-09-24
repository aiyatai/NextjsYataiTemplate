export const getApplicationContractByUid = async (uid: string) => {
  const response = await fetch(
    `${process.env.AIYATAI_API_ENDPOINT}/developer/contract/u/${uid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ApplicationID: `${process.env.AIYATAI_APPLICATION_ID}`,
        Authorization: `Bearer ${process.env.AIYATAI_API_KEY}`,
      },
    }
  );
  return response;
};

export const reportPaymentService = async (
  contract: string,
  payment_plan: string,
  quantity: number
) => {
  const response = await fetch(
    `${process.env.AIYATAI_API_ENDPOINT}/developer/payment/service`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ApplicationID: `${process.env.AIYATAI_APPLICATION_ID}`,
        Authorization: `Bearer ${process.env.AIYATAI_API_KEY}`,
      },
      body: JSON.stringify({
        contract,
        payment_plan,
        quantity,
      }),
    }
  );
  return response;
};

export const reportPaymentFromUid = async (
  uid: string,
  payment_plan: string,
  quantity: number
) => {
  const contractResponse = await getApplicationContractByUid(uid);

  if (contractResponse.status != 200) {
    if (contractResponse.status == 404) {
      throw { error: "Contract not found", code: "contract_not_found" };
    }
    const error = await contractResponse.json();
    throw { error: error, code: "contract" };
  }
  const contract = await contractResponse.json();

  const paymentResponse = await reportPaymentService(
    contract.id,
    payment_plan,
    quantity
  );

  if (paymentResponse.status != 200) {
    const error = await paymentResponse.json();
    throw { error: error, code: "payment" };
  }
  const payment = await paymentResponse.json();

  return payment;
};
