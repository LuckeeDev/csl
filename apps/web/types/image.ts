import { Image } from '@prisma/client';

export type ImageData = Omit<Image, 'updated_at' | 'created_at'>;
