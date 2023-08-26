import { supabase } from '../config/db';
import uniqid from 'uniqid';

const imageUpload = async (files: Express.Multer.File[]) => {
  const imageUrls = [];

  for (const file of files) {
    const { buffer, originalname } = file;

    const uniqueId = uniqid();
    const { data, error } = await supabase.storage
      .from('events')
      .upload(`eventimages-${originalname}-${uniqueId}`, buffer, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error(`Error uploading file '${originalname}':`, error.message);
      throw new Error(`Error uploading file '${originalname}'`);
    }

    const { data: imgData } = supabase.storage
      .from('events')
      .getPublicUrl(data.path);

    imageUrls.push(imgData?.publicUrl || '');
  }

  return imageUrls;
};

export default {
  imageUpload,
};
