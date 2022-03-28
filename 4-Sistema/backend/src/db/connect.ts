import mongoose from 'mongoose';

export const connectDb = (uri: string) => mongoose.connect(uri);
