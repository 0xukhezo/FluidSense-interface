import React, { useEffect } from "react";
import { ethers } from "ethers";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import abi from "../../../abi/contracts.json";

interface ApproveButtonInterface {
  token: any;
  amountInSMC: number;
  getTxApprove: (tx: any) => void;
  getTxError: (tx: boolean) => void;
  getTxLoading: (tx: boolean) => void;
  getTxSuccess: (tx: boolean) => void;
}

export default function ApproveButton({
  token,
  amountInSMC,
  getTxApprove,
  getTxError,
  getTxLoading,
  getTxSuccess,
}: ApproveButtonInterface) {
  const { config: approveTokensContractConfig } = usePrepareContractWrite({
    address: token.address as `0x${string}`,
    abi: abi.abiERC20,
    functionName: "approve",
    args: [
      token.factory,
      amountInSMC
        ? ethers.utils
            .parseUnits(
              amountInSMC.toString(),
              token.symbol === "USDC" ? "6" : "18"
            )
            .toString()
        : undefined,
    ],
  });

  const { writeAsync: ApproveTokensContractTx, data: dataApprove } =
    useContractWrite(approveTokensContractConfig);

  const {
    data: txReceiptApprove,
    isSuccess: txSuccessApprove,
    isError: txErrorApprove,
    isLoading: txLoadingApprove,
  } = useWaitForTransaction({
    confirmations: 6,
    hash: dataApprove?.hash,
  });

  const onApproveClick = async () => {
    try {
      await ApproveTokensContractTx?.();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("pepe 1");
    txReceiptApprove !== undefined && getTxApprove(txReceiptApprove);
  }, [txReceiptApprove]);

  useEffect(() => {
    console.log("pepe 2");
    getTxError(txErrorApprove);
  }, [txSuccessApprove]);

  useEffect(() => {
    console.log("pepe 3");
    getTxLoading(txLoadingApprove);
  }, [txErrorApprove]);

  useEffect(() => {
    console.log("pepe 4");
    getTxSuccess(txSuccessApprove);
  }, [txLoadingApprove]);

  return (
    <div>
      <button
        onClick={() => onApproveClick()}
        className=" px-20 py-5 rounded-full bg-superfluid-100 leading-8 font-bold tracking-wide"
      >
        Approve
      </button>
    </div>
  );
}
