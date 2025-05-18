import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Slot } from '../../slots/entities/slot.entity';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

@Table
export class Reservation extends Model<
  InferAttributes<Reservation>,
  InferCreationAttributes<Reservation, { omit: 'user' | 'slot' }>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @ForeignKey(() => Slot)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare slotId: number;

  @BelongsTo(() => User)
  declare user?: User;

  @BelongsTo(() => Slot)
  declare slot?: Slot;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  declare updatedAt: CreationOptional<Date>;
}
