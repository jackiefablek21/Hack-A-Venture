import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function QuestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [quest, setQuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");

  // ======================
  // Fetch quest detail
  // ======================
  useEffect(() => {
    async function fetchQuest() {
      try {
        const res = await fetch(
          `http://localhost:4000/api/missions/${id}`
        );
        const data = await res.json();
        setQuest(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuest();
  }, [id]);

  if (loading) return <p>Loading campaign...</p>;
  if (!quest) return <p>Campaign not found.</p>;

  const participantCount = quest.participants?.length || 0;
  const isFull = participantCount >= quest.participantLimit;
  const alreadyJoined = quest.participants?.includes(user?._id);

  // ======================
  // Join campaign
  // ======================
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

      // ✅ Update UI immediately
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

  return (
    <main className="page">
      <button onClick={() => navigate(-1)}>← Back</button>

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

      {/* ======================
          JOIN BUTTON LOGIC
      ====================== */}
      {user?.role === "user" && (
        <>
          {alreadyJoined ? (
            <p style={{ color: "green" }}>
              You have joined this campaign.
            </p>
          ) : (
            <button
              onClick={handleJoin}
              disabled={joining || isFull}
            >
              {isFull
                ? "Campaign Full"
                : joining
                ? "Joining..."
                : "Join Campaign"}
            </button>
          )}
        </>
      )}

      {!user && (
        <p style={{ color: "gray" }}>
          Please log in to join this campaign.
        </p>
      )}
    </main>
  );
}