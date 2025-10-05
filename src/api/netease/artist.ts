import axios, { type AxiosResponse } from 'axios';
import { apiSettings } from '../config';

/**
 * 获取歌手详情
 * @param id 歌手 id
 */
export const getArtistDetail = (id: number) => {
  return axios.get(`${apiSettings.neteaseApiBase}/artist/detail`, {
    params: { id },
  });
};

/**
 * 获取歌手 MV
 * @param id 歌手 id
 */
export const getArtistMv = (id: number, limit = 30, offset = 0) => {
  return axios.get(`${apiSettings.neteaseApiBase}/artist/mv`, {
    params: { id, limit, offset },
  });
};

/**
 * 获取歌手专辑
 * @param id 歌手 id
 * @param limit 取出数量 , 默认为 30
 * @param offset 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 */
export const getArtistAlbum = (id: number, limit = 30, offset = 0) => {
  return axios.get(`${apiSettings.neteaseApiBase}/artist/album`, {
    params: { id, limit, offset },
  });
};

/**
 * 获取歌手热门 50 首歌曲
 * @param id 歌手 id
 */
export function getArtistTopSongs(id: string): Promise<AxiosResponse> {
  return axios.get(`${apiSettings.neteaseApiBase}/artist/top/song`, {
    params: { id },
  });
}

/**
 * 获取歌手全部歌曲
 * @param id 歌手 id
 * @param order hot ,time 按照热门或者时间排序
 * @param limit 取出歌单数量 , 默认为 50
 * @param offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 */
export function getArtistAllSongs(
  id: string,
  order?: 'hot' | 'time',
  limit = 50,
  offset = 0
): Promise<AxiosResponse> {
  return axios.get(`${apiSettings.neteaseApiBase}/artist/songs`, {
    params: { id, order, limit, offset },
  });
}
