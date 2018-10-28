import { Entity, Column, ManyToOne } from "typeorm";
import { HardwareItem } from "./hardwareItem";
import { User } from "./user";

@Entity()
export class ReservedHardwareItem {
  @ManyToOne(() => User, { primary: true })
  user: User;

  @ManyToOne(() => HardwareItem, { primary: true })
  hardwareItem: HardwareItem;

  @Column()
  reservationStatus: boolean;
}