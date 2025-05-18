import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { SlotBatch } from './slot-batch.entity';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

@Table
export class Slot extends Model<
  InferAttributes<Slot>,
  InferCreationAttributes<Slot>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @Column({ type: DataType.DATE })
  date: Date;

  @Column({ type: DataType.INTEGER })
  capacity: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  bookedCount: number;

  @ForeignKey(() => SlotBatch)
  @Column({ type: DataType.INTEGER })
  slotBatchId: number;

  @BelongsTo(() => SlotBatch)
  declare slotBatch?: SlotBatch;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  declare updatedAt: CreationOptional<Date>;
}
