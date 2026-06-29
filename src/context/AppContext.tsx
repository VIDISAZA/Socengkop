"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

const API_BASE = "http://localhost:5001/api";

export type Tier = {
  level: number;
  name: string;
  multiplier: number;
};

export type User = {
  id: number;
  name: string;
  rt: string;
  points: number;
  tier: Tier;
  tierName: string;
  multiplier: number;
};

export type Transaction = {
  id: number;
  userId: number;
  amount: number;
  pointsEarned: number;
  date: string;
  type?: string;
  note?: string;
};

export type Mission = {
  id: number;
  title: string;
  description: string;
  reward: number;
  isActive: boolean;
  icon?: string;
  category?: string;
};

export type LeaderboardMember = {
  id: number;
  name: string;
  points: number;
};

export type LeaderboardEntry = {
  rt: string;
  totalPoints: number;
  rank: number;
  memberCount?: number;
  members?: LeaderboardMember[];
};

const TIERS = [
  { level: 1, name: "Pandu Srawung", multiplier: 1.0 },
  { level: 2, name: "Agra Satria", multiplier: 1.4 },
  { level: 3, name: "Kamadeva Widya", multiplier: 2.0 },
];

function calculateTier(points: number): Tier {
  if (points >= 5000) return TIERS[2];
  if (points >= 2000) return TIERS[1];
  return TIERS[0];
}

// Map raw API user to our User type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapApiUser(u: any): User {
  const tier = calculateTier(u.points);
  return {
    id: u.id,
    name: u.name,
    rt: u.rt,
    points: u.points,
    tier,
    tierName: tier.name,
    multiplier: tier.multiplier,
  };
}

type AppState = {
  currentUser: User | null;
  users: User[];
  transactions: Transaction[];
  missions: Mission[];
  leaderboard: LeaderboardEntry[];
  isLoadingUsers: boolean;
  login: (userId: number) => void;
  logout: () => void;
  addTransaction: (amount: number) => Promise<void>;
  completeMission: (missionId: number) => Promise<void>;
};

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  const recalculateLeaderboard = (currentUsers: User[]) => {
    const rtMap = new Map<string, { totalPoints: number; memberCount: number; members: LeaderboardMember[] }>();
    currentUsers.forEach((u) => {
      if (!rtMap.has(u.rt)) {
        rtMap.set(u.rt, { totalPoints: 0, memberCount: 0, members: [] });
      }
      const item = rtMap.get(u.rt)!;
      item.totalPoints += u.points;
      item.memberCount += 1;
      item.members.push({ id: u.id, name: u.name, points: u.points });
    });
    return Array.from(rtMap.entries())
      .sort((a, b) => b[1].totalPoints - a[1].totalPoints)
      .map(([rt, data], index) => ({
        rt,
        totalPoints: data.totalPoints,
        memberCount: data.memberCount,
        members: data.members.sort((a, b) => b.points - a.points),
        rank: index + 1
      }));
  };

  // Fetch initial data from backend
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [usersRes, missionsRes, leaderboardRes] = await Promise.all([
          fetch(`${API_BASE}/users`),
          fetch(`${API_BASE}/missions`),
          fetch(`${API_BASE}/leaderboard`),
        ]);

        const usersData = await usersRes.json();
        const missionsData = await missionsRes.json();
        const leaderboardData = await leaderboardRes.json();

        if (usersData.success) setUsers(usersData.data.map(mapApiUser));
        if (missionsData.success) setMissions(missionsData.data);
        if (leaderboardData.success) {
          const sorted = [...leaderboardData.data].sort((a, b) => b.totalPoints - a.totalPoints);
          setLeaderboard(sorted.map((entry, i) => ({
            rt: entry.rt,
            totalPoints: entry.totalPoints,
            memberCount: entry.memberCount,
            members: entry.members,
            rank: i + 1
          })));
        }
      } catch {
        // Fallback ke mock data jika backend tidak tersambung
        console.warn("Backend tidak tersambung, menggunakan mock data lokal.");
        const fallbackUsers = [
          { id: 1, name: "Siti Rahayu", rt: "RT 01", points: 1250, tier: TIERS[0], tierName: TIERS[0].name, multiplier: TIERS[0].multiplier },
          { id: 2, name: "Ahmad Junaedi", rt: "RT 02", points: 2800, tier: TIERS[1], tierName: TIERS[1].name, multiplier: TIERS[1].multiplier },
          { id: 3, name: "Budi Santoso", rt: "RT 01", points: 890, tier: TIERS[0], tierName: TIERS[0].name, multiplier: TIERS[0].multiplier },
          { id: 4, name: "Dewi Lestari", rt: "RT 03", points: 4200, tier: TIERS[2], tierName: TIERS[2].name, multiplier: TIERS[2].multiplier },
          { id: 5, name: "Rina Marlina", rt: "RT 03", points: 3250, tier: TIERS[1], tierName: TIERS[1].name, multiplier: TIERS[1].multiplier },
        ];
        setUsers(fallbackUsers);
        setMissions([
          { id: 1, title: "🛒 Belanja Sembako", description: "Belanja kebutuhan pokok minimal Rp50.000", reward: 50, isActive: true },
          { id: 2, title: "📢 Ajak Tetangga", description: "Undang tetangga bergabung", reward: 100, isActive: true },
          { id: 3, title: "🔗 Share ke WA", description: "Bagikan produk unggulan desa", reward: 30, isActive: true },
        ]);
        setLeaderboard(recalculateLeaderboard(fallbackUsers));
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch transactions when user changes
  useEffect(() => {
    if (!currentUser) {
      setTransactions([]);
      return;
    }
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${API_BASE}/transactions?userId=${currentUser.id}`);
        const data = await res.json();
        if (data.success) setTransactions(data.data);
      } catch {
        setTransactions([]);
      }
    };
    fetchTransactions();
  }, [currentUser?.id]);

  const login = async (userId: number) => {
    if (userId === 999) {
      setCurrentUser({
        id: 999,
        name: "Admin Koperasi",
        rt: "Pusat Desa",
        points: 0,
        tier: { level: 3, name: "Kamadeva Widya", multiplier: 2.0 },
        tierName: "Pengurus",
        multiplier: 2.0
      });
      return;
    }

    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      try {
        // Trigger backend check for points expiry
        const res = await fetch(`${API_BASE}/admin/check-expiry`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId })
        });
        const data = await res.json();
        if (data.success && data.expired) {
          alert(`⚠️ Perhatian! Poin Anda sebesar ${data.expiredPoints.toLocaleString("id-ID")} pts telah HANGUS karena tidak ada transaksi dalam 30 hari terakhir.`);
          // Reload users list to show updated points
          const usersRes = await fetch(`${API_BASE}/users`);
          const usersData = await usersRes.json();
          if (usersData.success) {
            const mapped = usersData.data.map(mapApiUser);
            setUsers(mapped);
            const updatedCur = mapped.find((u: User) => u.id === userId);
            if (updatedCur) setCurrentUser(updatedCur);
            setLeaderboard(recalculateLeaderboard(mapped));
          }
        }
      } catch (err) {
        console.warn("Inactivity expiration check failed", err);
      }
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setTransactions([]);
  };

  const updateLocalUserPoints = (userId: number, pointsEarned: number) => {
    setUsers((prevUsers) => {
      const newUsers = prevUsers.map((u) => {
        if (u.id === userId) {
          const newPoints = u.points + pointsEarned;
          const newTier = calculateTier(newPoints);
          const updatedUser = { ...u, points: newPoints, tier: newTier, tierName: newTier.name, multiplier: newTier.multiplier };
          if (currentUser?.id === userId) setCurrentUser(updatedUser);
          return updatedUser;
        }
        return u;
      });
      setLeaderboard(recalculateLeaderboard(newUsers));
      return newUsers;
    });
  };

  const addTransaction = async (amount: number) => {
    if (!currentUser) return;
    try {
      const res = await fetch(`${API_BASE}/transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id, amount }),
      });
      const data = await res.json();
      if (data.success) {
        const newTx: Transaction = data.data.transaction;
        setTransactions((prev) => [newTx, ...prev]);
        updateLocalUserPoints(currentUser.id, newTx.pointsEarned);
      }
    } catch {
      // Fallback offline: hitung sendiri
      const pointsEarned = Math.floor((amount / 1000) * currentUser.tier.multiplier);
      const newTx: Transaction = { id: Date.now(), userId: currentUser.id, amount, pointsEarned, date: new Date().toISOString() };
      setTransactions((prev) => [newTx, ...prev]);
      updateLocalUserPoints(currentUser.id, pointsEarned);
    }
  };

  const completeMission = async (missionId: number) => {
    if (!currentUser) return;
    const mission = missions.find((m) => m.id === missionId);
    if (!mission || !mission.isActive) return;
    try {
      await fetch(`${API_BASE}/mission/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id, missionId }),
      });
    } catch {
      // ignore error, proceed offline
    }
    updateLocalUserPoints(currentUser.id, mission.reward);
    setMissions((prev) => prev.map((m) => (m.id === missionId ? { ...m, isActive: false } : m)));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        transactions,
        missions,
        leaderboard,
        isLoadingUsers,
        login,
        logout,
        addTransaction,
        completeMission,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
