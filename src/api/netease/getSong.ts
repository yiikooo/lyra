import { apiSettings } from '../config';

const realIpParam = apiSettings.realIP ? `realIP=${apiSettings.realIP}` : '';

export interface SongUrlData {
  id: number;
  url: string | null;
  br: number;
  size: number;
  md5: string;
  code: number;
  expi: number;
  type: string;
  gain: number;
  peak: number;
  fee: number;
  uf: null;
  payed: number;
  flag: number;
  canExtend: boolean;
  freeTrialInfo: null;
  level: string;
  encodeType: string;
  freeTrialPrivilege: {
    resConsumable: boolean;
    userConsumable: boolean;
    listenType: null;
    cannotListenReason: null;
    playReason: null;
  };
  freeTimeTrialPrivilege: {
    resConsumable: boolean;
    userConsumable: boolean;
    type: number;
    remainTime: number;
  };
  urlSource: number;
  rightSource: number;
  podcastCtrp: null;
  effectTypes: null;
  time: number;
}

export interface SongDetail {
  name: string;
  mainTitle: string;
  additionalTitle: string;
  id: number;
  ar: {
    id: number;
    name: string;
    tns: [];
    alias: [];
  }[];
  alia: [];
  pop: number;
  st: number;
  rt: string;
  fee: number;
  v: number;
  crbt: null;
  cf: string;
  al: {
    id: number;
    name: string;
    picUrl: string;
    tns: [];
    pic_str: string;
    pic: number;
  };
  dt: number;
  h: {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
  };
  m: {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
  };
  l: {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
  };
  sq: {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
  };
  hr: null;
  a: null;
  cd: string;
  no: number;
  rtUrl: null;
  ftype: number;
  rtUrls: [];
  djId: number;
  copyright: number;
  s_id: number;
  mark: number;
  originCoverType: number;
  originSongSimpleData: null;
  tagPicList: null;
  resourceState: boolean;
  version: number;
  songJumpInfo: null;
  entertainmentTags: null;
  awardTags: null;
  displayTags: null;
  single: number;
  noCopyrightRcmd: null;
  mv: number;
  cp: number;
  rtype: number;
  rurl: null;
  mst: number;
  publishTime: number;
}

export interface SongDetailResponse {
  songs: SongDetail[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  privileges: any[];
  code: number;
}

export interface GetSongResponse {
  data: SongUrlData[];
  code: number;
}

/**
 * Get song URL for playback
 * @param id - Song ID to get URL for
 * @param br - Bitrate (default: 999000 for max quality)
 * @returns Promise<GetSongResponse> - Song URL data
 */
async function getSongUrl(id: number, br: number = 999000): Promise<GetSongResponse> {
  try {
    const response = await fetch(
      `${apiSettings.neteaseApiBase}/song/url?id=${id}&br=${br}&${realIpParam}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validate response structure
    if (data.code !== undefined && data.data !== undefined) {
      return data as GetSongResponse;
    }

    // Fallback for unexpected response format
    throw new Error('Invalid response format from song URL API');
  } catch (error) {
    console.error('Error fetching song URL:', error);
    throw error;
  }
}

/**
 * Get multiple song URLs for playback
 * @param ids - Array of song IDs to get URLs for
 * @param br - Bitrate (default: 999000 for max quality)
 * @returns Promise<GetSongResponse> - Song URL data for multiple songs
 */
async function getSongUrls(ids: string[], br: number = 999000): Promise<GetSongResponse> {
  try {
    const idsParam = ids.join(',');
    const response = await fetch(
      `${apiSettings.neteaseApiBase}/song/url?id=${idsParam}&br=${br}&${realIpParam}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validate response structure
    if (data.code !== undefined && data.data !== undefined) {
      return data as GetSongResponse;
    }

    // Fallback for unexpected response format
    throw new Error('Invalid response format from song URL API');
  } catch (error) {
    console.error('Error fetching song URLs:', error);
    throw error;
  }
}

async function getSongPics(ids: string[]): Promise<string[]> {
  try {
    const idsParam = ids.join(',');
    const response = await fetch(
      `${apiSettings.neteaseApiBase}/song/detail?ids=${idsParam}&${realIpParam}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validate response structure
    if (data.code !== undefined && data.data !== undefined) {
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.songs.map((song: any) => song.al.picUrl);
  } catch (error) {
    console.error('Error fetching song URLs:', error);
    throw error;
  }
}

export const functions = {
  getSongUrl,
  getSongUrls,
  getSongPics,
  getSongDetail,
};

/**
 * Get song detail
 * @param ids - Song IDs to get detail for (comma separated)
 * @returns Promise<SongDetailResponse> - Song detail data
 */
export async function getSongDetail(ids: string): Promise<SongDetailResponse> {
  try {
    const response = await fetch(
      `${apiSettings.neteaseApiBase}/song/detail?ids=${ids}&${realIpParam}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validate response structure
    if (data.code !== undefined && data.songs !== undefined) {
      return data as SongDetailResponse;
    }

    // Fallback for unexpected response format
    throw new Error('Invalid response format from song detail API');
  } catch (error) {
    console.error('Error fetching song detail:', error);
    throw error;
  }
}
