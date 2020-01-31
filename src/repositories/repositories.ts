import { User, HardwareItem, ReservedHardwareItem, Event as HubEvent, Challenge, Announcement, AchievementProgress } from "../db/entity";
import { BaseRepository } from "./baseRepository";
import { injectable } from "inversify";
import { Repository, EntityRepository, getConnectionManager, ConnectionManager } from "typeorm";
import { SubscriberStore } from "../util/sse/SubscriberStore";

@injectable()
export class UserRepository extends BaseRepository<User> {
  public getRepository(): Repository<User> {
    return super.connect(User);
  }
}

@EntityRepository(HardwareItem)
export class HardwareRepository extends Repository<HardwareItem> {
  public subscribers: SubscriberStore;

  setSubscriberStore(store: SubscriberStore) {
    this.subscribers = store;
  }

  public getRepository(): HardwareRepository {
    const connectionManager: ConnectionManager = getConnectionManager();
    if (connectionManager.connections.length > 0) {
      return connectionManager.get("hub").getCustomRepository(HardwareRepository);
    } else {
      throw "Connection to the database is not setup!";
    }
  }
}

@injectable()
export class ReservedHardwareRepository extends BaseRepository<ReservedHardwareItem> {
  public getRepository(): Repository<ReservedHardwareItem> {
    return super.connect(ReservedHardwareItem);
  }
}

@injectable()
export class EventRepository extends BaseRepository<HubEvent> {
  public getRepository(): Repository<HubEvent> {
    return super.connect(HubEvent);
  }
}

@injectable()
export class ChallengeRepository extends BaseRepository<Challenge> {
  public getRepository(): Repository<Challenge> {
    return super.connect(Challenge);
  }
}

@injectable()
export class AnnouncementRepository extends BaseRepository<Announcement> {
  public getRepository(): Repository<Announcement> {
    return super.connect(Announcement);
  }
}

@injectable()
export class AchievementProgressRepository extends BaseRepository<AchievementProgress> {
  public getRepository(): Repository<AchievementProgress> {
    return super.connect(AchievementProgress);
  }
}
