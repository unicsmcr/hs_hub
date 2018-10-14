import { CacheCollection } from "../../abstract-classes";
import { getConnection } from "typeorm";
import { User } from "../../../../db/entity";
import { UserCached } from "../objects/userCached";

/**
 * A cached users collection
 */
export class UsersCacheCollection extends CacheCollection<UserCached> {

  /**
   * The amount of time the users collection stays synced (miliseconds).
   * Set to never expire
   */
  protected expiresIn: number = -1;

  /**
   * Syncs this cached users collection with the database
   */
  public async sync(): Promise<void> {
    // Fetchig the user object from the database
    const users: User[] = await getConnection()
    .getRepository(User)
    .createQueryBuilder("user")
    .getMany();
    // Updating the instance variables
    this.syncedAt = new Date();
    this.elements = new Map<string, UserCached>();
    users.forEach(user => {
      this.elements[user.id] = new UserCached(user);
    });
  }
}