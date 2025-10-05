/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSettings } from '../config';

const realIpParam = apiSettings.realIP ? `realIP=${apiSettings.realIP}` : '';

export interface CommentUser {
  locationInfo: null;
  liveInfo: null;
  anonym: number;
  highlight: boolean;
  avatarDetail: null;
  userType: number;
  avatarUrl: string;
  followed: boolean;
  mutual: boolean;
  remarkName: null;
  socialUserId: null;
  vipRights: {
    associator: {
      vipCode: number;
      rights: boolean;
      iconUrl: string;
    } | null;
    musicPackage: {
      vipCode: number;
      rights: boolean;
      iconUrl: string;
    } | null;
    redplus: {
      vipCode: number;
      rights: boolean;
      iconUrl: string;
    } | null;
    redVipAnnualCount: number;
    redVipLevel: number;
    relationType: number;
    memberLogo: null;
    extInfo: null;
  } | null;
  nickname: string;
  authStatus: number;
  expertTags: string[] | null;
  experts: null;
  vipType: number;
  commonIdentity: null;
  userId: number;
  target: null;
}

export interface HotComment {
  user: CommentUser;
  beReplied: [];
  pendantData: {
    id: number;
    imageUrl: string;
  } | null;
  showFloorComment: null;
  status: number;
  commentId: number;
  content: string;
  richContent: null;
  contentResource: null;
  time: number;
  timeStr: string;
  needDisplayTime: boolean;
  likedCount: number;
  expressionUrl: null;
  commentLocationType: number;
  parentCommentId: number;
  decoration: null;
  repliedMark: null;
  grade: null;
  userBizLevels: null;
  ipLocation: {
    ip: null;
    location: string;
    userId: null;
  };
  owner: boolean;
  medal: null;
  likeAnimationMap: null;
  liked: boolean;
}

export interface HotCommentsResponse {
  topComments: [];
  hasMore: boolean;
  hotComments: HotComment[];
  total: number;
  code: number;
}

export interface Root {
  code: number;
  data: Data;
  message: string;
}

export interface Data {
  commentsTitle: string;
  comments: Comment[];
  currentCommentTitle: string;
  currentComment: any;
  totalCount: number;
  hasMore: boolean;
  cursor: string;
  sortType: number;
  sortTypeList: SortTypeList[];
  style: string;
  bottomAction: any;
  likeAnimation: LikeAnimation;
  newReplyExpGroupName: string;
  expandCount: number;
}

export interface Comment {
  user: User;
  beReplied: any;
  commentId: number;
  threadId: string;
  content: string;
  richContent: any;
  status: number;
  time: number;
  timeStr: string;
  needDisplayTime: boolean;
  likedCount: number;
  replyCount: number;
  liked: boolean;
  expressionUrl: any;
  parentCommentId: number;
  repliedMark: boolean;
  pendantData?: PendantData;
  pickInfo: any;
  showFloorComment: ShowFloorComment;
  decoration: Decoration;
  commentLocationType: number;
  musicianSayAirborne: any;
  args: any;
  tag: Tag;
  source: any;
  resourceSpecialType: any;
  extInfo: ExtInfo2;
  commentVideoVO: CommentVideoVo;
  contentResource: any;
  contentPicNosKey: any;
  contentPicExt: any;
  contentPicUrl: any;
  grade: any;
  userBizLevels: any;
  userNameplates: any;
  ipLocation: IpLocation;
  owner: boolean;
  tail: any;
  hideSerialComments: any;
  hideSerialTips: any;
  topicList: any;
  privacy: number;
  medal: any;
  outShowComments: any[];
  likeAnimationMap: LikeAnimationMap;
  bottomTags: any[];
  airborneAction: any;
  reward: any;
  userTop: boolean;
  highlight: boolean;
  wordMatchList: any;
  track: string;
}

export interface User {
  avatarDetail: any;
  commonIdentity: any;
  locationInfo: any;
  liveInfo: any;
  followed: boolean;
  vipRights?: VipRights;
  relationTag: any;
  anonym: number;
  encryptUserId: string;
  userId: number;
  userType: number;
  nickname: string;
  avatarUrl: string;
  authStatus: number;
  expertTags: any;
  experts: any;
  vipType: number;
  remarkName: any;
  isHug: boolean;
  socialUserId: any;
  target: any;
}

export interface VipRights {
  associator?: Associator;
  musicPackage?: MusicPackage;
  redplus?: Redplus;
  redVipAnnualCount: number;
  redVipLevel: number;
  relationType: number;
  memberLogo: any;
  extInfo: ExtInfo;
}

export interface Associator {
  vipCode: number;
  rights: boolean;
  iconUrl: string;
}

export interface MusicPackage {
  vipCode: number;
  rights: boolean;
  iconUrl: string;
}

export interface Redplus {
  vipCode: number;
  rights: boolean;
  iconUrl: string;
}

export interface ExtInfo {
  logo?: Logo;
}

export interface Logo {
  vipType: number;
  logoDto: LogoDto;
}

export interface LogoDto {
  logoType: number;
  interestId: number;
  url: string;
  width: number;
  height: number;
  actionUrl: string;
}

export interface PendantData {
  id: number;
  imageUrl: string;
}

export interface ShowFloorComment {
  replyCount: number;
  comments: any;
  showReplyCount: boolean;
  topCommentIds: any;
  target: any;
}

export interface Decoration {
  repliedByAuthorCount: number;
}

export interface Tag {
  datas: any[];
  extDatas: any[];
  contentDatas: any[];
  contentPicDatas: any[];
  relatedCommentIds: any;
}

export interface ExtInfo2 {}

export interface CommentVideoVo {
  showCreationEntrance: boolean;
  allowCreation: boolean;
  creationOrpheusUrl: any;
  playOrpheusUrl: any;
  videoCount: number;
  forbidCreationText: string;
}

export interface IpLocation {
  ip: any;
  location: string;
  userId: any;
}

export interface LikeAnimationMap {}

export interface SortTypeList {
  sortType: number;
  sortTypeName: string;
  target: string;
}

export interface LikeAnimation {
  animationConfigMap: AnimationConfigMap;
  version: number;
}

export interface AnimationConfigMap {
  EVENT_FEED: any[];
  MOMENT: any[];
  INPUT: any[];
  COMMENT_AREA: any[];
}

/**
 * 获取热门评论
 * @param id 资源 id
 * @param type 资源类型 (0: 歌曲, 1: mv, 2: 歌单, 3: 专辑, 4: 电台节目, 5: 视频, 6: 动态, 7: 电台)
 * @param limit 取出评论数量, 默认为 20
 * @param offset 偏移数量, 用于分页
 * @param before 分页参数, 取上一页最后一项的 time 获取下一页数据
 */
export async function getHotComments(
  id: string,
  type: number,
  limit: number = 20,
  offset: number = 0,
  before?: number
): Promise<HotCommentsResponse> {
  let url = `${apiBase}/comment/hot?id=${id}&type=${type}&limit=${limit}&offset=${offset}&${realIpParam}`;
  if (before) {
    url += `&before=${before}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.code !== undefined && data.hotComments !== undefined) {
      return data as HotCommentsResponse;
    }
    throw new Error('Invalid response format from hot comments API');
  } catch (error) {
    console.error('Error fetching hot comments:', error);
    throw error;
  }
}

/**
 * 获取最新评论
 * @param id 资源 id
 * @param type 资源类型 (0: 歌曲, 1: mv, 2: 歌单, 3: 专辑, 4: 电台节目, 5: 视频, 6: 动态, 7: 电台)
 * @param sortType 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
 * @param pageNo 分页参数,第 N 页,默认为 1
 * @param pageSize 分页参数,每页多少条数据,默认 20
 * @param cursor 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
 */
export async function getNewComments(
  id: string,
  type: number,
  sortType: number = 1,
  pageNo: number = 1,
  pageSize: number = 20,
  cursor?: number
): Promise<Root> {
  let url = `${apiBase}/comment/new?id=${id}&type=${type}&sortType=${sortType}&pageNo=${pageNo}&pageSize=${pageSize}&${realIpParam}`;
  if (cursor && sortType === 3 && pageNo > 1) {
    url += `&cursor=${cursor}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // console.log(data);

    if (data.code !== undefined && data.data !== undefined && data.data.comments !== undefined) {
      return data as Root;
    }
    throw new Error('Invalid response format from new comments API');
  } catch (error) {
    console.error('Error fetching new comments:', error);
    throw error;
  }
}

export const functions = {
  getHotComments,
  getNewComments,
};
