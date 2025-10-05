/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSettings } from '../config';

const realIpParam = apiSettings.realIP ? `realIP=${apiSettings.realIP}` : '';

const realIpParam = realIP ? `realIP=${realIP}` : '';

export interface SongEntry {
  id: number;
  name: string;
  artists: {
    id: number;
    name: string;
  }[];
  album: {
    id: number;
    name: string;
  };
  hasMv: boolean;
  mvId: number;
  requireVip: boolean;
  duration: number;
  picUrl: string;
}

export interface SearchResult {
  count: number;
  songs: SongEntry[];
}

async function searchSongs(key: string, page: number = 1): Promise<SearchResult> {
  const response = await fetch(
    `${apiBase}/cloudsearch?keywords=${encodeURIComponent(key)}&type=1&limit=15&offset=${(page - 1) * 15}&${realIpParam}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  if (data.code !== 200) throw new Error('Network response was not ok');

  return {
    count: data.result.songCount,
    songs:
      data.result.songs?.map((song: any) => ({
        id: song.id,
        name: song.name,
        artists:
          song.ar?.map((artist: any) => ({
            id: artist.id,
            name: artist.name,
          })) || [],
        album: {
          id: song.al?.id,
          name: song.al?.name,
        },
        duration: song.dt,
        picUrl: song.al?.picUrl,
        hasMv: song.mv !== 0,
        mvId: song.mv,
        requireVip: song.fee === 1,
      })) || [],
  };
}

export const functions = {
  searchSongs,
};
