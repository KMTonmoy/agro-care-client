import axios from 'axios';

interface ImgBBResponse {
  data: {
    display_url: string;
    id: string;
    title: string;
    url: string;
    delete_url: string;
  };
  success: boolean;
  status: number;
}

export const imageUpload = async (image: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const { data } = await axios.post<ImgBBResponse>(
      'https://api.imgbb.com/1/upload?key=19c9072b07556f7849d6dea75b7e834d',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (data.success) {
      return data.data.display_url;
    } else {
      throw new Error('Image upload failed');
    }
  } catch (error) {
    console.error('Image upload error:', error);
    throw new Error('Failed to upload image');
  }
};