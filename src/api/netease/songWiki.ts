import { apiSettings } from '../config';

const realIpParam = apiSettings.realIP ? `realIP=${apiSettings.realIP}` : '';

export interface SongWikiSummaryResponseData {
  cursor: string;
  blocks: {
    showType: string;
    alg: string;
    scm: string;
    id: string;
    adInfo: null;
    extInfo: null;
    position: string;
    md5: null;
    channel: string;
    uiElement: {
      mainTitle: {
        title: string;
        titleImgId: null;
        titleImgUrl: null;
        action: null;
      };
      subTitles:
        | {
            title: string;
            titleImgId: null;
            titleImgUrl: null;
            action: {
              clickAction: {
                action: number;
                targetUrl: string;
              };
            };
          }[]
        | null;
      images:
        | {
            tag: null;
            title: null;
            superscript: null;
            imageId: number;
            imageUrl: string;
            imageWithoutTextUrl: null;
            md5: null;
            width: number;
            height: number;
            action: null;
          }[]
        | null;
      labels: null;
      textLinks:
        | {
            tag: null;
            text: string;
            url: string | null;
          }[]
        | null;
      descriptions:
        | {
            tag: null;
            description: string;
          }[]
        | null;
      icons: null;
      buttons:
        | {
            tag: null;
            text: string;
            imageUrl: null;
            action: {
              clickAction: {
                action: number;
                targetUrl: string;
              };
            };
          }[]
        | null;
      videos: null;
      superscript: null;
      type: string | null;
      coverTagVO: null;
      colorList: null;
    };
    code: string;
    creatives:
      | {
          id: null;
          blockId: null;
          creativeId: null;
          creativeType: string;
          position: null;
          action: null;
          uiElement: {
            mainTitle: {
              title: string;
              titleImgId: null;
              titleImgUrl: null;
              action: null;
            };
            subTitles: null;
            images: null;
            labels: null;
            textLinks:
              | {
                  tag: null;
                  text: string;
                  url: string | null;
                }[]
              | null;
            descriptions:
              | {
                  tag: null;
                  description: string;
                }[]
              | null;
            icons: null;
            buttons: null;
            videos: null;
            superscript: null;
            type: null;
            coverTagVO: null;
            colorList: null;
          };
          adInfo: null;
          code: null;
          resources: {
            resourceType: string;
            resourceId: null;
            resourceUrl: null;
            resourceExtInfo: null;
            resourceExt: null;
            resourcePolicyId: null;
            action: {
              clickAction: {
                action: number;
                targetUrl: string;
              };
            } | null;
            uiElement: {
              mainTitle: {
                title: string | null;
                titleImgId: null;
                titleImgUrl: null;
                action: null;
              };
              subTitles: null;
              images:
                | {
                    tag: null;
                    title: string;
                    superscript: null;
                    imageId: number;
                    imageUrl: string;
                    imageWithoutTextUrl: null;
                    md5: null;
                    width: number;
                    height: number;
                    action: null;
                  }[]
                | null;
              labels: null;
              textLinks: null;
              descriptions:
                | {
                    tag: null;
                    description: string;
                  }[]
                | null;
              icons: null;
              buttons: null;
              videos: null;
              superscript: null;
              type: null;
              coverTagVO: null;
              colorList: null;
            };
            valid: boolean;
            alg: null;
            scm: null;
            visibleStatus: null;
          }[];
        }[]
      | [];
    canRefresh: boolean;
    visibleStatus: null;
    blockConfig: null;
    blockCursor: null;
    hasMore: boolean;
    blockParam: null;
    crossPlatformConfig: null;
    hideTitle: boolean;
    opRcmd: number;
  }[];
  hasMore: boolean;
  pageConfig: null;
  pageCodeContext: null;
}

export interface SongWikiSummaryResponse {
  code: number;
  data: SongWikiSummaryResponseData;
  message: string;
}

/**
 * 获取歌曲的音乐百科简要信息
 * @param id 歌曲 ID
 */
export async function getSongWikiSummary(id: string): Promise<SongWikiSummaryResponse> {
  try {
    const response = await fetch(
      `${apiSettings.neteaseApiBase}/song/wiki/summary?id=${id}&${realIpParam}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.code !== undefined && data.data !== undefined) {
      return data as SongWikiSummaryResponse;
    }
    throw new Error('Invalid response format from song wiki summary API');
  } catch (error) {
    console.error('Error fetching song wiki summary:', error);
    throw error;
  }
}

export const functions = {
  getSongWikiSummary,
};
