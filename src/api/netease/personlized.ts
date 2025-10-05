import type { ArtistEntry } from '@/types/player';
import { apiSettings } from '../config';

const realIpParam = apiSettings.realIP ? `realIP=${apiSettings.realIP}` : '';

interface SongEntry {
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
  reason: string;
}

export interface PersonalizedEntry {
  song30: {
    songs: SongEntry[];
    selectedindex: number;
    loading: boolean;
  };
}

export async function getPersonalizedSongs(): Promise<SongEntry[]> {
  const response = await fetch(`${apiSettings.neteaseApiBase}/recommend/songs?${realIpParam}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  if (!data.data) {
    return [];
  }
  const songs = [];
  for (const song of data.data.dailySongs) {
    const artists = [] as ArtistEntry[];
    for (const artist of song.ar) {
      artists.push({
        id: artist.id,
        name: artist.name,
      });
    }
    songs.push({
      id: song.id,
      name: song.name,
      pic: song.al.picUrl,
      artists: artists,
      reason: song.reason,
      album: {
        id: song.al.id,
        name: song.al.name,
      },
      duration: song.dt,
      picUrl: song.al.picUrl,
      hasMv: song.mv !== 0,
      mvId: song.mv,
      requireVip: song.fee === 1,
    });
  }
  return songs;
}
