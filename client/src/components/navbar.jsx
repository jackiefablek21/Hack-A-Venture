import { useWallet } from "../contexts/WalletContext.jsx";
import InteractWithContract from "../contracts/SmartContract.jsx";
import MissionCard from "./MissionCard.jsx";
import ChatComponent from "./AIPrompt.jsx";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { account, connectWallet } = useWallet();
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/missions/getAll", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        // 1. Check if the response is actually JSON
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const errorHtml = await res.text();
          console.error(
            "The server sent back HTML instead of JSON. Here is the HTML:",
            errorHtml,
          );
          return;
        }

        const data = await res.json();

        setMissions(data);
        await console.log("Datas" + missions.toString());
      } catch (err) {
        console.error("Failed to load missions:", err);
      }
    };

    fetchMissions();
  }, []);

  return (
    <nav>
      <div style={{display:"flex", gap:"2rem"}}>
        <h1 style={{color:"var(--white)"}}>U2U Project</h1>

        {account ? (
          <span  style={{fontSize:'1.5rem', padding:"0.5rem", color:"var(--white)"}}>
            Connected: {account.substring(0, 6)}...{account.slice(-4)}
          </span>
        ) : (
          <button style={{fontSize:'1.5rem', padding:"0.5rem" , cursor:"pointer"}} className="wallet-button hover-lift" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>

      <div className="mission-list-wrapper">
        <div className="mission-list">
          {missions.map((mission) => (
            <MissionCard key={mission._id} mission={mission} />
          ))}
        </div>
      </div>

      <ChatComponent />
    </nav>
  );
};

export default Navbar;
