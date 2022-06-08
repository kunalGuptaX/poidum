
import FormData from "form-data";

const imageFileToFormData = async (image: File) => {
  const formData = new FormData();
  const imageBuffer = await image?.arrayBuffer()!;
  const imageBlob = new Blob([new Uint8Array(imageBuffer)], {
    type: image?.type,
  });
  formData.append("image", imageBlob);

  return formData;
};

export default imageFileToFormData;
