export type UserRole = "STUDENT" | "TEACHER" | "ADMIN";

export interface UserSession {
    id: number;
    email: string;
    role: UserRole;
    token?: string;
}

export const getSession = (): UserSession | null => {
    if (typeof window === "undefined") return null;
    const sessionString = localStorage.getItem("university_session");
    if (!sessionString) return null;

    try {
        return JSON.parse(sessionString) as UserSession;
    } catch {
        return null;
    }
};

export const setSession = (session: UserSession) => {
    localStorage.setItem("university_session", JSON.stringify(session));
};

export const clearSession = () => {
    localStorage.removeItem("university_session");
};
