import { apiSettings } from '../config';

const realIpParam = apiSettings.realIP ? `realIP=${apiSettings.realIP}` : '';

export interface SimiSongArtist {
  img1v1Id: number;
  topicPerson: number;
  picId: number;
  briefDesc: string;
  musicSize: number;
  albumSize: number;
  picUrl: string;
  img1v1Url: string;
  followed: boolean;
  trans: string;
  alias: string[];
  name: string;
  id: number;
  img1v1Id_str: string;
}

export interface SimiSongAlbum {
  songs: [];
  paid: boolean;
  onSale: boolean;
  mark: number;
  awardTags: null;
  displayTags: null;
  artists: SimiSongArtist[];
  copyrightId: number;
  picId: number;
  artist: SimiSongArtist;
  publishTime: number;
  company: null;
  briefDesc: string;
  picUrl: string;
  commentThreadId: string;
  blurPicUrl: string;
  companyId: number;
  pic: number;
  status: number;
  subType: string;
  description: string;
  tags: string;
  alias: string[];
  name: string;
  id: number;
  type: string;
  size: number;
  picId_str: string;
}

export interface SimiSong {
  starred: boolean;
  popularity: number;
  starredNum: number;
  playedNum: number;
  dayPlays: number;
  hearTime: number;
  mp3Url: string;
  rtUrls: null;
  mark: number;
  noCopyrightRcmd: null;
  originCoverType: number;
  originSongSimpleData: null;
  songJumpInfo: null;
  artists: SimiSongArtist[];
  copyrightId: number;
  album: SimiSongAlbum;
  score: number;
  hMusic: {
    playTime: number;
    bitrate: number;
    dfsId: number;
    sr: number;
    volumeDelta: number;
    name: string;
    id: number;
    size: number;
    extension: string;
  };
  mMusic: {
    playTime: number;
    bitrate: number;
    dfsId: number;
    sr: number;
    volumeDelta: number;
    name: string;
    id: number;
    size: number;
    extension: string;
  };
  lMusic: {
    playTime: number;
    bitrate: number;
    dfsId: number;
    sr: number;
    volumeDelta: number;
    name: string;
    id: number;
    size: number;
    extension: string;
  };
  audition: null;
  copyFrom: string;
  ringtone: string | null;
  disc: string;
  no: number;
  fee: number;
  commentThreadId: string;
  mvid: number;
  rtype: number;
  rurl: null;
  crbt: null;
  rtUrl: null;
  ftype: number;
  bMusic: {
    playTime: number;
    bitrate: number;
    dfsId: number;
    sr: number;
    volumeDelta: number;
    name: string;
    id: number;
    size: number;
    extension: string;
  };
  sqMusic: {
    playTime: number;
    bitrate: number;
    dfsId: number;
    sr: number;
    volumeDelta: number;
    name: string;
    id: number;
    size: number;
    extension: string;
  } | null;
  hrMusic: null;
  position: number;
  duration: number;
  status: number;
  alias: string[];
  name: string;
  id: number;
  recommendReason: string;
  privilege: {
    id: number;
    fee: number;
    payed: number;
    st: number;
    pl: number;
    dl: number;
    sp: number;
    cp: number;
    subp: number;
    cs: boolean;
    maxbr: number;
    fl: number;
    toast: boolean;
    flag: number;
    preSell: boolean;
    playMaxbr: number;
    downloadMaxbr: number;
    maxBrLevel: string;
    playMaxBrLevel: string;
    downloadMaxBrLevel: string;
    plLevel: string;
    dlLevel: string;
    flLevel: string;
    rscl: null;
    freeTrialPrivilege: {
      resConsumable: boolean;
      userConsumable: boolean;
      listenType: null;
      cannotListenReason: null;
      playReason: null;
      freeLimitTagType: null;
    };
    rightSource: number;
    chargeInfoList: {
      rate: number;
      chargeUrl: null;
      chargeMessage: null;
      chargeType: number;
    }[];
    code: number;
    message: null;
    plLevels: null;
    dlLevels: null;
    ignoreCache: null;
    bd: null;
  };
  alg: string;
}

export interface SimiSongResponse {
  songs: SimiSong[];
  code: number;
}

/**
 * 获取相似歌曲
 * @param id 歌曲 id
 */
export async function getSimiSongs(id: string): Promise<SimiSongResponse> {
  try {
    const response = await fetch(`${apiSettings.neteaseApiBase}/simi/song?id=${id}&${realIpParam}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.code !== undefined && data.songs !== undefined) {
      return data as SimiSongResponse;
    }
    throw new Error('Invalid response format from similar songs API');
  } catch (error) {
    console.error('Error fetching similar songs:', error);
    throw error;
  }
}

export const functions = {
  getSimiSongs,
};
