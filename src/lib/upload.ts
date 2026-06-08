import { supabase } from './supabase';

const MAX_UPLOAD_IMAGE_EDGE = 1920;
const WEBP_UPLOAD_QUALITY = 0.82;

function webpFileName(fileName: string) {
  return `${fileName.replace(/\.[^/.]+$/, '') || 'image'}.webp`;
}

function shouldBypassClientOptimization(file: File) {
  return (
    typeof window === 'undefined' ||
    !file.type.startsWith('image/') ||
    file.type === 'image/svg+xml' ||
    file.type === 'image/gif'
  );
}

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('이미지 파일을 읽을 수 없습니다.'));
    };

    image.src = objectUrl;
  });
}

async function optimizeImageForUpload(file: File) {
  if (shouldBypassClientOptimization(file)) return file;

  try {
    const image = await loadImage(file);
    const width = image.naturalWidth || image.width;
    const height = image.naturalHeight || image.height;

    if (!width || !height) return file;

    const scale = Math.min(1, MAX_UPLOAD_IMAGE_EDGE / Math.max(width, height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));

    const context = canvas.getContext('2d');
    if (!context) return file;

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/webp', WEBP_UPLOAD_QUALITY);
    });

    if (!blob) return file;

    return new File([blob], webpFileName(file.name), {
      type: 'image/webp',
      lastModified: Date.now(),
    });
  } catch {
    return file;
  }
}

/**
 * Uploads a file to Supabase Storage and returns the public URL.
 * @param file The file to upload
 * @param bucket The bucket name (default: 'images')
 */
export async function uploadImage(file: File, bucket: string = 'images'): Promise<string> {
  const optimizedFile = await optimizeImageForUpload(file);
  const fileExt = optimizedFile.name.split('.').pop() || 'webp';
  const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, optimizedFile, {
      contentType: optimizedFile.type || undefined,
    });

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return data.publicUrl;
}
