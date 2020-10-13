import { Schema, Document } from 'mongoose';

import { Infos } from 'src/shared/base.entity';

export interface Notification extends Document {
  id: string;
  title: string;
  content: string;
  user: string;
  read: boolean;
}

const NotificationSchema = new Schema(
  {
    title: { type: String, required: true, maxlength: 40 },
    content: { type: String, maxlength: 500 },
    user: { type: String, required: true },
    read: { type: String, required: true, default: false },
  },
  { timestamps: true },
);

NotificationSchema.virtual('infos').get(
  (): Infos => ({ type: 'notifications' }),
);

NotificationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id;
  },
});

export default NotificationSchema;
