import { BaseApiService } from "@/core/infrastructure/services/api-service";
import type { IBanner, IFolder } from "../../(core)/domain/Banner";

class BannerService extends BaseApiService {
  async getFolders(): Promise<IFolder[] | null> {
    return await this.get<IFolder[]>("/folders");
  }

  async createFolder(folder: Omit<IFolder, "id">): Promise<IFolder | null> {
    return await this.post<IFolder>("/folders", folder);
  }

  async createBanner(folderId: string, baner: Omit<IBanner, "id">) {
    return await this.post<IBanner>(`/folders/${folderId}/bannerItems`, baner);
  }

  async updateBanner(
    folderId: string,
    bannerId: string,
    content: Omit<IBanner, "id">
  ): Promise<IBanner | null> {
    return await this.put<IBanner>(
      `/folders/${folderId}/bannerItems/${bannerId}`,
      { content: content.content }
    );
  }

  async deleteBanner(
    folderId: string,
    bannerId: string
  ): Promise<IFolder | null> {
    return await this.delete<IFolder>(
      `/folders/${folderId}/bannerItems/${bannerId}`
    );
  }

  async renameFolder(
    folderId: string,
    folderName: string
  ): Promise<IFolder | null> {
    return await this.put<IFolder>(`/folders/${folderId}`, {
      name: folderName,
    });
  }

  async deleteFolder(folderId: string): Promise<IFolder | null> {
    return await this.delete<IFolder>(`/folders/${folderId}`);
  }
}

export const bannerServices = new BannerService();
