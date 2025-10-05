/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSettings } from '../config';



const realIpParam = apiSettings.realIP ? `realIP=${apiSettings.realIP}` : '';

export interface AlbumArtist {
  img1v1Id: number;
  topicPerson: number;
  picId: number;
  musicSize: number;
  albumSize: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  followed: boolean;
  trans: string;
  alias: string[];
  name: string;
  id: number;
  img1v1Id_str: string;
}

export interface AlbumDetail {
  songs: any[]; // 歌曲列表，具体类型后续再细化
  paid: boolean;
  onSale: boolean;
  mark: number;
  awardTags: any;
  displayTags: any;
  artists: AlbumArtist[];
  copyrightId: number;
  picId: number;
  artist: AlbumArtist;
  publishTime: number;
  company: string;
  briefDesc: string;
  picUrl: string;
  commentThreadId: string;
  blurPicUrl: string;
  companyId: number;
  pic: number;
  status: number;
  subType: string;
  alias: string[];
  description: string;
  tags: string;
  name: string;
  id: number;
  type: string;
  size: number;
  picId_str: string;
  info: {
    commentThread: {
      id: string;
      resourceInfo: {
        id: number;
        userId: number;
        name: string;
        imgUrl: string;
        creator: any;
        encodedId: any;
        subTitle: any;
        webUrl: any;
      };
      resourceType: number;
      commentCount: number;
      likedCount: number;
      shareCount: number;
      hotCount: number;
      latestLikedUsers: any;
      resourceId: number;
      resourceOwnerId: number;
      resourceTitle: string;
    };
    latestLikedUsers: any;
    liked: boolean;
    comments: any;
    resourceType: number;
    resourceId: number;
    commentCount: number;
    likedCount: number;
    shareCount: number;
    threadId: string;
  };
}

export interface AlbumSong {
  rtUrls: any[];
  ar: {
    id: number;
    name: string;
    alia: string[];
  }[];
  al: {
    id: number;
    name: string;
    pic_str: string;
    pic: number;
  };
  st: number;
  noCopyrightRcmd: any;
  songJumpInfo: any;
  no: number;
  fee: number;
  djId: number;
  mv: number;
  cd: string;
  t: number;
  v: number;
  pop: number;
  rt: string;
  mst: number;
  cp: number;
  crbt: any;
  cf: string;
  dt: number;
  h: {
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
  hr: any;
  l: {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
  };
  rtUrl: any;
  ftype: number;
  rtype: number;
  rurl: any;
  pst: number;
  alia: string[];
  a: any;
  m: {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
  };
  name: string;
  id: number;
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
    rscl: any;
    freeTrialPrivilege: {
      resConsumable: boolean;
      userConsumable: boolean;
      listenType: number;
      cannotListenReason: number;
      playReason: any;
      freeLimitTagType: any;
    };
    rightSource: number;
    chargeInfoList: {
      rate: number;
      chargeUrl: any;
      chargeMessage: any;
      chargeType: number;
    }[];
    code: number;
    message: any;
    plLevels: any;
    dlLevels: any;
    ignoreCache: any;
    bd: any;
  };
  tns?: string[];
}

export interface GetAlbumDetailResponse {
  resourceState: boolean;
  songs: AlbumSong[];
  code: number;
  album: AlbumDetail;
}

/**
 * 获取专辑内容
 * @param id 专辑 id
 */
export async function getAlbumDetail(id: string): Promise<GetAlbumDetailResponse> {
  try {
    const response = await fetch(`${apiSettings.neteaseApiBase}/album?id=${id}&${realIpParam}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.code !== undefined && data.album !== undefined && data.songs !== undefined) {
      return data as GetAlbumDetailResponse;
    }
    throw new Error('Invalid response format from album detail API');
  } catch (error) {
    console.error('Error fetching album detail:', error);
    throw error;
  }
}

export const functions = {
  getAlbumDetail,
};
