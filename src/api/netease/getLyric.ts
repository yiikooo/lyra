import { apiSettings } from '../config';

const realIpParam = apiSettings.realIP ? `realIP=${apiSettings.realIP}` : '';

export interface LyricResponse {
  lrc: {
    version: number;
    lyric: string;
  };
  tlyric?: {
    version: number;
    lyric: string;
  };
  yrc?: {
    version: number;
    lyric: string;
  };
  code: number;
}

/**
 * Get song lyric
 * @param id - Song ID to get lyric for
 * @returns Promise<LyricResponse> - Lyric data
 */
async function getLyric(id: number): Promise<LyricResponse> {
  try {
    const response = await fetch(`${apiSettings.neteaseApiBase}/lyric/new?id=${id}&${realIpParam}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validate response structure
    if (data.code !== undefined && data.lrc !== undefined) {
      return data as LyricResponse;
    }

    // Fallback for unexpected response format
    throw new Error('Invalid response format from lyric API');
  } catch (error) {
    console.error('Error fetching lyric:', error);
    throw error;
  }
}

export const functions = {
  getLyric,
};
