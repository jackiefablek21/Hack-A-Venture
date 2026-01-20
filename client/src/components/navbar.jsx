import { useWallet } from "../contexts/WalletContext.jsx";
import InteractWithContract from "../contracts/SmartContract.jsx";
import MissionCard from "./MissionCard.jsx";
import ChatComponent from "./AIPrompt.jsx";
import { useState, useEffect } from 'react';

const Navbar = () => {
    const { account, connectWallet } = useWallet();
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/missions/getAll", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });

                // 1. Check if the response is actually JSON
                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const errorHtml = await res.text();
                    console.error("The server sent back HTML instead of JSON. Here is the HTML:", errorHtml);
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
            <h1>U2U Project</h1>
            {account ? (
                <span>Connected: {account.substring(0, 6)}...{account.slice(-4)}</span>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
            {/*<InteractWithContract></InteractWithContract>*/}


            <div className="mission-list">
                {missions.map((mission) => (
                    <MissionCard
                        key={mission._id}
                        mission={mission}
                    />
                ))}
            </div>

            <ChatComponent></ChatComponent>
        </nav>
    );
}

export default Navbar;