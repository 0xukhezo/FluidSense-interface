const listenerForTxMine = (
  txResponse: `0x${string}` | undefined,
  provider: any,
  name: string
) => {
  return new Promise<void>((resolve) => {
    console.log(`Doing ${name}`);
    provider.once(txResponse, (txReceipt: any) => {
      console.log(`Completed with ${txReceipt.confirmations} confirmations`);
      console.log(`Completed ${name}`);
      resolve();
    });
  });
};

export default listenerForTxMine;
