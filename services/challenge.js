import { theme, mocks } from "../constants";

const challenges = mocks.challenges;

export function GetChallengeById(id) {
  return challenges.find((i) => i.id == id);
}

export function CountChallenges() {
  return challenges.length;
}
