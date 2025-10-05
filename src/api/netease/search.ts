import { apiSettings } from '../config';
import { h } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { DefaultSearchTip, SearchTipGroup } from '../../types/uiProperties.d';

interface hotResponse {
  searchWord: string;
  iconType: number;
}

interface Artist {
  id: number;
  name: string;
  picUrl: string | null;
  alias: string[];
  albumSize: number;
  picId: number;
  fansGroup: null;
  img1v1Url: string;
  img1v1: number;
  trans: null;
  accountId?: number;
}

interface Album {
  id: number;
  name: string;
  artist: Artist;
  publishTime: number;
  size: number;
  copyrightId: number;
  status: number;
  picId: number;
  mark: number;
}

interface Song {
  id: number;
  name: string;
  artists: Artist[];
  album: Album;
  duration: number;
  copyrightId: number;
  status: number;
  alias: string[];
  rtype: number;
  ftype: number;
  mvid: number;
  fee: number;
  rUrl: null;
  mark: number;
}

interface Playlist {
  id: number;
  name: string;
  coverImgUrl: string;
  creator: null;
  subscribed: boolean;
  trackCount: number;
  userId: number;
  playCount: number;
  bookCount: number;
  specialType: number;
  officialTags: null;
  action: null;
  actionType: null;
  recommendText: null;
  score: null;
  officialPlaylistTitle: null;
  playlistType: string;
  description: string;
  highQuality: boolean;
}

interface SuggestResponse {
  result: {
    albums?: Album[];
    artists?: Artist[];
    songs?: Song[];
    playlists?: Playlist[];
    order: string[];
    allMatch?: { keyword: string; type: number }[]; // 新增的搜索关键词建议
  };
}

const realIpParam = apiSettings.realIP ? `realIP=${apiSettings.realIP}` : '';

async function getHotKeyword(): Promise<SearchTipGroup[]> {
  const response = await fetch(`${apiSettings.neteaseApiBase}/search/hot/detail?${realIpParam}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return [
    {
      name: '热搜榜',
      items: data.data.map((item: hotResponse, index: number) => ({
        key: item.searchWord,
        iconType: item.iconType,
        rank: index + 1,
      })),
      icon: h(FontAwesomeIcon, { icon: ['fas', 'fire'], size: 'lg' }),
    },
  ];
}

async function getDefaultKey(): Promise<DefaultSearchTip> {
  const response = await fetch(`${apiSettings.neteaseApiBase}/search/default?${realIpParam}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return {
    key: data.data.realkeyword,
    show: data.data.showKeyword,
  };
}

async function getSuggestKeyword(
  keywords: string,
  signal?: AbortSignal
): Promise<SearchTipGroup[]> {
  const [suggestResponse, mobileSuggestResponse] = await Promise.all([
    fetch(`${apiSettings.neteaseApiBase}/search/suggest?keywords=${keywords}&${realIpParam}`, {
      signal,
    }),
    fetch(
      `${apiSettings.neteaseApiBase}/search/suggest?keywords=${keywords}&type=mobile&${realIpParam}`,
      { signal }
    ),
  ]);

  if (!suggestResponse.ok) {
    throw new Error('Network response for general suggest was not ok');
  }
  if (!mobileSuggestResponse.ok) {
    throw new Error('Network response for mobile suggest was not ok');
  }

  const suggestData = (await suggestResponse.json()) as SuggestResponse;
  const mobileSuggestData = (await mobileSuggestResponse.json()) as SuggestResponse;

  const result: SearchTipGroup[] = [];

  // 处理搜索关键词建议 (type=mobile)
  if (mobileSuggestData.result.allMatch && mobileSuggestData.result.allMatch.length > 0) {
    result.push({
      name: '搜索建议',
      items: mobileSuggestData.result.allMatch.map((match) => ({
        key: match.keyword,
        iconType: 0,
        type: 'keyword',
        obj: null,
      })),
      icon: h(FontAwesomeIcon, { icon: ['fas', 'magnifying-glass'], size: 'lg' }),
    });
  }

  // 处理单曲、歌手、专辑、歌单建议
  if (suggestData.result.order) {
    for (const type of suggestData.result.order) {
      switch (type) {
        case 'songs':
          if (suggestData.result.songs && suggestData.result.songs.length > 0) {
            result.push({
              name: '单曲',
              items: suggestData.result.songs.map((song) => ({
                key: song.name + ' - ' + song.artists.map((artist) => artist.name).join(', '),
                iconType: 0,
                type: 'song',
                obj: song,
              })),
              icon: h(FontAwesomeIcon, { icon: ['fas', 'music'], size: 'lg' }),
            });
          }
          break;

        case 'artists':
          if (suggestData.result.artists && suggestData.result.artists.length > 0) {
            result.push({
              name: '歌手',
              items: suggestData.result.artists.map((artist) => ({
                key: artist.name,
                iconType: 0,
                type: 'artist',
                obj: artist,
              })),
              icon: h(FontAwesomeIcon, { icon: ['fas', 'user'], size: 'lg' }),
            });
          }
          break;

        case 'albums':
          if (suggestData.result.albums && suggestData.result.albums.length > 0) {
            result.push({
              name: '专辑',
              items: suggestData.result.albums.map((album) => ({
                key: album.name + ' - ' + album.artist.name,
                iconType: 0,
                type: 'album',
                obj: album,
              })),
              icon: h(FontAwesomeIcon, { icon: ['fas', 'compact-disc'], size: 'lg' }),
            });
          }
          break;

        case 'playlists':
          if (suggestData.result.playlists && suggestData.result.playlists.length > 0) {
            result.push({
              name: '歌单',
              items: suggestData.result.playlists.map((playlist) => ({
                key: playlist.name,
                iconType: 0,
                type: 'playlist',
                obj: playlist,
              })),
              icon: h(FontAwesomeIcon, { icon: ['fas', 'list-ul'], size: 'lg' }),
            });
          }
          break;
      }
    }
  }

  return result;
}

export const functions = {
  getHotKeyword,
  getDefaultKey,
  getSuggestKeyword,
};
