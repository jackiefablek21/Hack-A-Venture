import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import "../styles/questDetail.css"
import { ethers } from "ethers";

export default function QuestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [quest, setQuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");

    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchQuest() {
      try {
        const res = await fetch(
          `http://localhost:4000/api/missions/${id}`
        );
        const data = await res.json();
        setQuest(data);

          if (data.status === 'completed') setStatus('success');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuest();
  }, [id]);

    if (loading) return <p className="loading-text">Loading campaign...</p>;
    if (!quest) return <p className="error-text">Campaign not found.</p>;

  const participantCount = quest.participants?.length || 0;
  const isFull = participantCount >= quest.participantLimit;
  const alreadyJoined = quest.participants?.includes(user?._id);

  const handleJoin = async () => {
    try {
      setJoining(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:4000/api/missions/${quest._id}/join`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to join campaign");
        return;
      }

      setQuest(prev => ({
        ...prev,
        participants: [...(prev.participants || []), user._id],
      }));
    } catch (err) {
      setError("Unexpected error");
    } finally {
      setJoining(false);
    }
  };


    const handleCompleteMission = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask!");
            return;
        }

        try {
            setStatus('loading');
            setMessage('Please sign the message in MetaMask...');

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const walletAddress = await signer.getAddress();

            const signingMessage = `I completed mission ${quest.title} for HydraCoin rewards.`;
            const signature = await signer.signMessage(signingMessage);

            setMessage('Verifying with server and sending rewards...');

            // 3. Send to your Node.js backend
            const response = await fetch('http://localhost:4000/api/missions/reward', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    walletAddress,
                    mission: quest,
                    signature,
                    message: signingMessage
                })
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(`Success! Tx Hash: ${data.txHash.substring(0, 10)}...`);
            } else {
                throw new Error(data.error || "Server failed to reward");
            }

        } catch (error) {
            console.error("Mission error:", error);
            setStatus('error');
            // Check if user cancelled
            setMessage(error.code === 'ACTION_REJECTED' ? "User cancelled signature" : error.message);
        }
    };


  return (
    <main className="quest-detail-wrapper">
      <div className="quest-detail-container">
        <button onClick={() => navigate(-1)} className="back-button">← Back</button>

        <h1>{quest.title}</h1>
        <p>{quest.description}</p>

        <hr />

        <h3>Campaign Info</h3>
        <ul>
          <li><strong>Reward:</strong> 💰 {quest.amount}</li>
          <li><strong>Severity:</strong> {quest.severity}</li>
          <li><strong>Status:</strong> {quest.status}</li>
          <li>
            <strong>Expires:</strong>{" "}
            {quest.expiresAt
              ? new Date(quest.expiresAt).toLocaleString()
              : "No expiry"}
          </li>
        </ul>

        <h3>Participation</h3>
        <p>
          Participants: {participantCount} / {quest.participantLimit}
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}



          {user?.role === "user" && (
              <div className="user-only-buttons">
                  {!alreadyJoined ? (
                      <button
                          onClick={handleJoin}
                          disabled={joining || isFull}
                          className="join-button"
                      >
                          {isFull ? "Campaign Full" : joining ? "Joining..." : "Join Campaign"}
                      </button>
                  ) : (
                      <button
                          className="claim-button"
                          onClick={handleCompleteMission}
                          disabled={status === 'loading' || status === 'success'}
                      >
                          {status === 'loading' ? 'Processing...' :
                              status === 'success' ? 'Reward Claimed ✓' : 'Claim Reward'}
                      </button>
                  )}
              </div>
          )}
        </div>
        
    </main>
  );
}