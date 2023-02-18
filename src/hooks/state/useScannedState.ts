import { create } from "zustand";

interface ScannedState {
  scanned?: boolean;

  updateScanned: (size: ScannedState["scanned"]) => void;
}

export const useScannedState = create<ScannedState>((set) => ({
  scanned: false,
  updateScanned: (scanned) => set({ scanned }),
}));

export default useScannedState;
