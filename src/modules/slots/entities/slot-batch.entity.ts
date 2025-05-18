import {
  Table,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Slot } from './slot.entity';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

@Table
export class SlotBatch extends Model<
  InferAttributes<SlotBatch>,
  InferCreationAttributes<SlotBatch>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @Column({ type: DataType.DATE, allowNull: false })
  startDateAndTime: Date;

  @HasMany(() => Slot)
  declare slots?: Slot[];

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  declare updatedAt: CreationOptional<Date>;
}
