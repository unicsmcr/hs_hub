import { Repository } from "typeorm";
import { Challenge } from "../../db/entity/hub";

export class ChallengeService {
  private challengeRepository: Repository<Challenge>;

  constructor(_challengeRepository: Repository<Challenge>) {
    this.challengeRepository = _challengeRepository;
  }

  getAll = async (): Promise<Challenge[]> => {
    return undefined;
  };

  createChallenge = async (): Promise<void> => {
  };

  updateChallenge = async (): Promise<void> => {
  };

  deleteChallenge = async (): Promise<void> => {
  };
}