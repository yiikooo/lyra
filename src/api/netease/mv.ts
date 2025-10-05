import { apiSettings } from '../config';

const realIpParam = apiSettings.realIP ? `realIP=${apiSettings.realIP}` : '';

export interface MvDetailResponse {
  code: number;
  data: {
    id: number;
    name: string;
    artistId: number;
    artistName: string;
    briefDesc: string | null;
    desc: string | null;
    cover: string;
    coverId_str: string;
    coverId: number;
    playCount: number;
    subCount: number;
    shareCount: number;
    commentCount: number;
    duration: number;
    nType: number;
    publishTime: string;
    price: null;
    brs: {
      size: number;
      br: number;
      point: number;
    }[];
    artists: {
      id: number;
      name: string;
      img1v1Url: string;
      followed: boolean;
    }[];
    commentThreadId: string;
    videoGroup: {
      id: number;
      name: string;
      type: number;
    }[];
  };
}

export interface MvDetailInfoResponse {
  code: number;
  likedCount: number;
  shareCount: number;
  commentCount: number;
  liked: boolean;
}

export interface MvUrlResponse {
  code: number;
  data: {
    id: number;
    url: string;
    r: number;
    size: number;
    md5: string;
    code: number;
    expi: number;
    fee: number;
    mvFee: number;
    st: number;
    promotionVo: null;
    msg: string;
  };
}

/**
 * 获取 mv 数据
 * @param mvid mv 的 id
 */
export async function getMvDetail(mvid: string): Promise<MvDetailResponse> {
  try {
    const response = await fetch(
      `${apiSettings.neteaseApiBase}/mv/detail?mvid=${mvid}&${realIpParam}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.code !== undefined && data.data !== undefined) {
      return data as MvDetailResponse;
    }
    throw new Error('Invalid response format from mv detail API');
  } catch (error) {
    console.error('Error fetching mv detail:', error);
    throw error;
  }
}

/**
 * 获取 mv 点赞转发评论数数据
 * @param mvid mv 的 id
 */
export async function getMvDetailInfo(mvid: string): Promise<MvDetailInfoResponse> {
  try {
    const response = await fetch(
      `${apiSettings.neteaseApiBase}/mv/detail/info?mvid=${mvid}&${realIpParam}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.code !== undefined && data.likedCount !== undefined) {
      return data as MvDetailInfoResponse;
    }
    throw new Error('Invalid response format from mv detail info API');
  } catch (error) {
    console.error('Error fetching mv detail info:', error);
    throw error;
  }
}

/**
 * 获取 mv 播放地址
 * @param id mv id
 * @param r 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
 */
export async function getMvUrl(id: string, r: number = 1080): Promise<MvUrlResponse> {
  try {
    const response = await fetch(
      `${apiSettings.neteaseApiBase}/mv/url?id=${id}&r=${r}&${realIpParam}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.code !== undefined && data.data !== undefined) {
      return data as MvUrlResponse;
    }
    throw new Error('Invalid response format from mv url API');
  } catch (error) {
    console.error('Error fetching mv url:', error);
    throw error;
  }
}

export const functions = {
  getMvDetail,
  getMvDetailInfo,
  getMvUrl,
};
