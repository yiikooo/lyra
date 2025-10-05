import { apiSettings } from '../config';

const realIpParam = apiSettings.realIP ? `realIP=${apiSettings.realIP}` : '';

export interface CheckSongResponse {
  success: boolean;
  message: string;
}

/**
 * Check if a song is available for playback
 * @param id - Song ID to check
 * @returns Promise<CheckSongResponse> - Availability status
 */
async function checkSong(id: string): Promise<CheckSongResponse> {
  try {
    const response = await fetch(
      `${apiSettings.neteaseApiBase}/check/music?id=${id}&${realIpParam}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Handle the expected response format
    if (data.success !== undefined) {
      return {
        success: data.success,
        message: data.message || (data.success ? 'ok' : '亲爱的,暂无版权'),
      };
    }

    // Fallback for unexpected response format
    return {
      success: false,
      message: '检查音乐可用性时出现未知错误',
    };
  } catch (error) {
    console.error('Error checking song availability:', error);
    return {
      success: false,
      message: '网络错误，无法检查音乐可用性',
    };
  }
}

export const functions = {
  checkSong,
};
