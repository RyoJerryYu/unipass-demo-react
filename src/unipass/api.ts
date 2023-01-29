import { UniPassPopupSDK } from "@unipasswallet/popup-sdk";
import { UniPassTheme, UPEvent, UPEventType } from "@unipasswallet/popup-types";
import { getEmitHelpers } from "typescript";


const upWallet = new UniPassPopupSDK({
    env: "prod",
    // for polygon mumbai
    chainType: "bsc",
    // choose localStorage if you want to cache user account permanent
    storageType: "sessionStorage",
    appSettings: {
        theme: UniPassTheme.LIGHT,
        appName: "UniPass Wallet Demo",
        appIcon: "",
    },
});

export async function connect() {
    try {
        const account = await upWallet.login({
            email: true,
            eventListener: (event: UPEvent) => {
                console.log("event", event);
                const { type, body } = event;
                if (type === UPEventType.REGISTER) {
                    console.log("account", body);
                }
            },
            connectType: "both",
        });
        const { address, email } = account;
        console.log("account", address, email);
    } catch (err) {
        console.log("connect err", err);
    }
}

export async function signMessage(message: string) {
    try {
        const sig = await upWallet.signMessage(message);
        console.log("signature", sig);  
        return sig;
      } catch (err) {
        console.log("auth err", err);
        return "";
      }
}

export async function verifySig(message:string, sig: string) {
    try {
      const ret = await upWallet.isValidSignature(
        message,
        sig,
        "0x82da72a50D9D50575A0b8a39Aad57017247ae1d8"
      );
      if (ret === true) {
        console.log("sign success");
        console.log("address", "0x82da72a50D9D50575A0b8a39Aad57017247ae1d8")
        console.log("message", message);
        console.log("sig", sig)
      } else {
        console.error("verify signature failed");
      }
    } catch (err) {
      console.log("auth err", err);
    }
}