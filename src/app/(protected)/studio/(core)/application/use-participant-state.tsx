import type { Participant } from "@/core/domain/Participant";
import { create } from "zustand";

interface ParticipantAction {
  addToActiveParticipant: (id: string) => void;
}

interface ParticipantState {
  participants: Participant[];
  activeParticipants: Participant[];
}
const dummyParticipitant = [1, 2, 3, 4, 5, 6].map((ele) => {
  return {
    id: ele.toString(),
    muted: true,
    name: "sameer",
    isOnLiveCanvas: Math.round(Math.random()) >= 1 ? true : false,
  };
});
const initialState: ParticipantState = {
  participants: dummyParticipitant,
  activeParticipants: dummyParticipitant.map(
    (item) => item.isOnLiveCanvas === true
  ) as [],
};

export const useParticipantStore = create<ParticipantState & ParticipantAction>(
  (set) => ({
    ...initialState,
    addToActiveParticipant: (id) => {
      set((state) => {
        const foundParticipant = state.participants.find(
          (item) => item.id === id
        );

        if (
          foundParticipant &&
          !state.activeParticipants.some((item) => item.id === id)
        ) {
          return {
            activeParticipants: [...state.activeParticipants, foundParticipant],
          };
        }

        return state;
      });
    },
  })
);
