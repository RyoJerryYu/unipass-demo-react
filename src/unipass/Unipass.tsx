import { sign } from "crypto";
import { ReactPropTypes, useState } from "react";
import { connect, signMessage, verifySig } from "./api";

export function UnipassLogin() {
    return (
        <button
            onClick={connect}
        >
            Unipass
        </button>
    )
}

interface SignMessageProps {
    message: string,
    onClick: (sig: string)=>void,
}

export function UnipassSignMessage({message, onClick}: SignMessageProps) {

    return (
        <button
            onClick={async ()=>{
                const sig = await signMessage(message);
                onClick(sig);
            }}
        >
            Unipass Sigh
        </button>
    )
}

interface VerifyMessageProps {
    message: string,
    sig: string,
}

export function UnipassVerifyMessage({message, sig}: VerifyMessageProps) {
    return (
        <button onClick={()=>verifySig(message, sig)}>
            Unipass Verify
        </button>
    )
}

export default function Unipass() {
    const [sig, setSig] = useState("")
    return (
        <>
            <UnipassLogin />
            <UnipassSignMessage 
            message="hello from ryo" 
            onClick={setSig}
            />
            {sig}
            <UnipassVerifyMessage
                message="hello from ryo"
                sig={sig}
            />
        </>
    )
}