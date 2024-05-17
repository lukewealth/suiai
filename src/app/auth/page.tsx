"use client";

import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Header from "@/components/static/Header";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";

import {
  SerializedSignature,
  decodeSuiPrivateKey,
} from "@mysten/sui.js/cryptography";
import {
  genAddressSeed,
  generateNonce,
  generateRandomness,
  getExtendedEphemeralPublicKey,
  getZkLoginSignature,
  jwtToAddress,
} from "@mysten/zklogin";
import {
  NetworkName,
  makeExplorerUrl,
  requestSuiFromFaucet,
  shortenSuiAddress,
} from "@polymedia/suits";
import { Modal, isLocalhost } from "@polymedia/webutils";
import { jwtDecode } from "jwt-decode";

import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { useEffect, useRef, useState } from "react";

/* Configuration */

import config from "@/lib/utils/config.json"; // copy and modify config.example.json with your own values

const NETWORK: NetworkName = "devnet";
const MAX_EPOCH = 2; // keep ephemeral keys active for this many Sui epochs from now (1 epoch ~= 24h)

const suiClient = new SuiClient({
  url: getFullnodeUrl(NETWORK),
});

/* Session storage keys */

const setupDataKey = "zklogin-demo.setup";
const accountDataKey = "zklogin-demo.accounts";

/* Types */

export type OpenIdProvider = "Google" | "Twitch" | "Facebook";

type SetupData = {
  provider: OpenIdProvider;
  maxEpoch: number;
  randomness: string;
  ephemeralPrivateKey: string;
};

type AccountData = {
  provider: OpenIdProvider;
  userAddr: string;
  zkProofs: any;
  ephemeralPrivateKey: string;
  userSalt: string;
  sub: string;
  aud: string;
  maxEpoch: number;
};

export default function Auth() {
  const router = useRouter();
  const session = useSession();

  const [current_auth_component_login, switchAuthComponent] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");

  function toggleAuthComponent() {
    switchAuthComponent(!current_auth_component_login);
  }

  useEffect(() => {
    //console.log(session.status)
    console.log(session);

    if (session.status === "authenticated") {
      router.replace("/chat");
    }
  });

  // useEffect(() => {
  //   completeZkLogin();
  //   fetchBalances(accounts.current);
  //   const interval = setInterval(() => fetchBalances(accounts.current), 5_000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  return (
    <div className='min-h-screen flex '>
      <Modal content={modalContent} />
      <Header />
      <div className='bg-secondary flex justify-center items-center flex-col w-full'>
        {current_auth_component_login ? (
          <Login changeAuth={toggleAuthComponent} />
        ) : (
          <Register changeAuth={toggleAuthComponent} />
        )}
      </div>

      <div className=' bg-gradient-to-b to-[#E750FF] from-[#9D1AFE] flex justify-center items-center flex-col w-[30%] text-white px-6'>
        <div className='flex flex-col gap-8'>
          <Image
            className=''
            src={"/images/ailogo.png"}
            alt=''
            width={150}
            height={100}
          />
          <h1 className='text-[48px] '>
            Learn, Discover & Automate in One Place.
          </h1>
          <p>
            SUI GPT using Move programming language to answer all your smart
            contract questions!
          </p>
        </div>
      </div>
    </div>
  );
}
