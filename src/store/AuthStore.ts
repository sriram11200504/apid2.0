import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";

type AuthState = {
  as: "student" | "admin" | "counsellor";
  user: any | null;
  isLogin: boolean;
  
  setAs : (userType: "student" | "admin" | "counsellor") => void;
  setUser: (user: any | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  as: "student",
  user: null,
  isLogin: false,

  setAs: (userType: "student" | "admin" | "counsellor") =>
    set({ as: userType }),
  setUser: (user) =>
    set({
      user,
      isLogin: !!user,
    }),

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, isLogin: false });
  },
}));

type AuthStore = {
  as: "student" | "admin" | "counsellor";
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  toggleLogin: () => void;
};

type QuestionnaireState = {
  questionnaireDone: boolean;
  setQuestionnaireDone: (value: boolean) => void;
};

export const useQuestionnaireStore = create<QuestionnaireState>((set) => ({
  questionnaireDone: false,
  setQuestionnaireDone: (value) => set({ questionnaireDone: value }),
}));
