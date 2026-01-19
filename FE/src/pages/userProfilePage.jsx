import { useState } from "react";
import "../styles/user.css"
export default function UserProfilePage() {
  // MOCK USER DATA
  const [user] = useState({
    name: "Nguyen Van A",
    email: "user@hydralink.org",
    role: "user",
    walletBalance: 120,
    createdAt: "2026-01-10T09:15:00Z",
    transactions: [
      {
        id: 1,
        type: "reward",
        amount: 50,
        description: "Completed cleanup mission at District 1 canal",
        createdAt: "2026-01-12T10:30:00Z",
      },
      {
        id: 2,
        type: "reward",
        amount: 70,
        description: "Participated in NGO water awareness campaign",
        createdAt: "2026-01-14T14:00:00Z",
      },
    ],
  });

  return (
    <main className="user-wrapper">
      <div className="user-top">
        {/* BASIC INFO */}
        <div className="user-info">
          <h2>Basic Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p>
            <strong>Date Joined:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* WALLET */}
        <div className="user-wallet">
          <h2>Wallet</h2>
          <p>
            <strong>Balance:</strong> {user.walletBalance} HL Tokens
          </p>
        </div>
        
      </div>
      

      {/* TRANSACTION HISTORY */}
      <div className="user-transaction">
        <h2>Transaction History</h2>

        {user.transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <table border="1" cellPadding="8" cellSpacing="0">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {user.transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{new Date(tx.createdAt).toLocaleDateString()}</td>
                  <td>{tx.description}</td>
                  <td>
                    {tx.amount > 0 ? "+" : ""}
                    {tx.amount} HL
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}