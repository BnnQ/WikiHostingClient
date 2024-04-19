export interface IMediaRepository {
  uploadImage(image: File): Promise<string>;
}
