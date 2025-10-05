import { apiSettings } from '../config';

const realIpParam = apiSettings.realIP ? `realIP=${apiSettings.realIP}` : '';

interface PlaylistDetailResponse {
  code: number;
  playlist: {
    id: number;
    name: string;
    coverImgUrl: string;
    creator: {
      userId: number;
      nickname: string;
    };
    playCount: number;
    trackCount: number;
    description: string;
    tags: string[];
    updateTime: number;
    createTime: number;
  };
}

interface Artist {
  id: number;
  name: string;
}

interface Album {
  id: number;
  name: string;
  picUrl: string;
}

interface Song {
  id: number;
  name: string;
  ar: Artist[];
  al: Album;
  dt: number;
  mv: number;
  fee: number;
}

interface PlaylistTrackAllResponse {
  code: number;
  songs: Song[];
  privileges: unknown[]; // 可以根据需要细化
  total: number; // 添加 total 字段
}

export async function playlistDetail(id: number, s = 8): Promise<PlaylistDetailResponse> {
  try {
    const response = await fetch(
      `${apiSettings.neteaseApiBase}/playlist/detail?id=${id}&s=${s}&${realIpParam}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.code !== undefined && data.playlist !== undefined) {
      return data as PlaylistDetailResponse;
    }
    throw new Error('Invalid response format from playlist detail API');
  } catch (error) {
    console.error('Error fetching playlist detail:', error);
    throw error;
  }
}

export async function playlistTrackAll(
  id: number,
  limit: number,
  offset: number
): Promise<PlaylistTrackAllResponse> {
  try {
    const response = await fetch(
      `${apiBase}/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}&${realIpParam}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.code !== undefined && data.songs !== undefined) {
      return data as PlaylistTrackAllResponse;
    }
    throw new Error('Invalid response format from playlist track all API');
  } catch (error) {
    console.error('Error fetching playlist track all:', error);
    throw error;
  }
}
