import  { useState } from 'react';
import { ethers } from 'ethers';

const MissionCard = ({ mission }) => {
    // States to give the user feedback
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

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

            // 1. Create a message to sign
            const signingMessage = `I completed mission ${mission.missionId} for HydraCoin rewards.`;

            // 2. Ask user to sign (This is free for the user, no gas)
            const signature = await signer.signMessage(signingMessage);

            setMessage('Verifying with server and sending rewards...');

            // 3. Send to your Node.js backend
            const response = await fetch('http://localhost:4000/api/missions/reward', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    walletAddress,
                    mission,
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
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Mission ID: {mission.missionId}</h3>

            <button
                onClick={handleCompleteMission}
                disabled={status === 'loading' || status === 'success'}
                style={{
                    backgroundColor: status === 'success' ? '#4CAF50' : '#007bff',
                    color: 'white',
                    padding: '10px 20px',
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer'
                }}
            >
                {status === 'loading' ? 'Processing...' : status === 'success' ? 'Mission Completed' : 'Claim Reward'}
            </button>

            {message && (
                <p style={{
                    marginTop: '10px',
                    fontSize: '14px',
                    color: status === 'error' ? 'red' : 'inherit'
                }}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default MissionCard;