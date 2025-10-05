import { apiSettings } from '../config';
const realIpParam = apiSettings.realIP ? `realIP=${apiSettings.realIP}` : '';

async function getQrCodeKey(): Promise<string> {
  const response = await fetch(
    `${apiSettings.neteaseApiBase}/login/qr/key?timestamp=${Date.now()}${realIpParam}`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.data.unikey as string;
}

async function createQrCodeImage(key: string): Promise<string> {
  const response = await fetch(
    `${apiSettings.neteaseApiBase}/login/qr/create?key=${key}&qrimg=true&timestamp=${Date.now()}${realIpParam}`,
    { credentials: 'include' }
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.data.qrimg as string;
}

interface CheckQrCodeStatusResponse {
  code: number;
  message: string;
  cookie?: string;
}

async function checkQrCodeStatus(key: string): Promise<CheckQrCodeStatusResponse> {
  const response = await fetch(
    `${apiSettings.neteaseApiBase}/login/qr/check?key=${key}&timestamp=${Date.now()}${realIpParam}`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) {
    // Netease API might return 502, handle it as a specific case if needed
    throw new Error(`Network response was not ok, status: ${response.status}`);
  }
  return (await response.json()) as CheckQrCodeStatusResponse;
}

interface CaptchaResponse {
  code: number;
  data: boolean;
}

async function sendCaptcha(phone: string): Promise<CaptchaResponse> {
  const response = await fetch(
    `${apiSettings.neteaseApiBase}/captcha/sent?phone=${phone}&timestamp=${Date.now()}${realIpParam}`,
    { credentials: 'include' }
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

interface LoginResponse {
  cookie: string;
  // Add other properties from the login response as needed
}

async function loginByCellphone(
  phone: string,
  captcha?: string,
  password?: string
): Promise<LoginResponse> {
  let url = `${apiSettings.neteaseApiBase}/login/cellphone?phone=${phone}&timestamp=${Date.now()}${realIpParam}`;
  if (captcha) {
    url += `&captcha=${captcha}`;
  } else if (password) {
    url += `&password=${password}`;
  }
  const response = await fetch(url, { credentials: 'include' });
  if (!response.ok) {
    throw new Error(`Network response was not ok, status: ${response.status}`);
  }
  return (await response.json()) as LoginResponse;
}

export interface UserAccountResponse {
  code: number;
  account: {
    id: number;
    userName: string;
    type: number;
    status: number;
    whitelistAuthority: number;
    createTime: number;
    tokenVersion: number;
    ban: number;
    baoyueVersion: number;
    donateVersion: number;
    vipType: number;
    anonimousUser: boolean;
    paidFee: boolean;
  };
  profile: {
    userId: number;
    userType: number;
    nickname: string;
    avatarImgId: number;
    avatarUrl: string;
    backgroundImgId: number;
    backgroundUrl: string;
    signature: string | null;
    createTime: number;
    userName: string;
    accountType: number;
    shortUserName: string;
    birthday: number;
    authority: number;
    gender: number;
    accountStatus: number;
    province: number;
    city: number;
    authStatus: number;
    description: string | null;
    detailDescription: string | null;
    defaultAvatar: boolean;
    expertTags: string[] | null;
    experts: string | null;
    djStatus: number;
    locationStatus: number;
    vipType: number;
    followed: boolean;
    mutual: boolean;
    authenticated: boolean;
    lastLoginTime: number;
    lastLoginIP: string;
    remarkName: string | null;
    viptypeVersion: number;
    authenticationTypes: number;
    avatarDetail: string | null;
    anchor: boolean;
  };
}

async function getUserAccount(): Promise<UserAccountResponse> {
  const response = await fetch(
    `${apiSettings.neteaseApiBase}/user/account?timestamp=${Date.now()}${realIpParam}`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) {
    throw new Error(`Network response was not ok, status: ${response.status}`);
  }
  return (await response.json()) as UserAccountResponse;
}

export interface LoginStatusResponse {
  data: {
    code: number;
    account: UserAccountResponse['account'] | null;
    profile: UserAccountResponse['profile'] | null;
  };
}

async function getLoginStatus(): Promise<LoginStatusResponse> {
  const response = await fetch(
    `${apiSettings.neteaseApiBase}/login/status?timestamp=${Date.now()}${realIpParam}`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) {
    throw new Error(`Network response was not ok, status: ${response.status}`);
  }
  return (await response.json()) as LoginStatusResponse;
}

export const functions = {
  getQrCodeKey,
  createQrCodeImage,
  checkQrCodeStatus,
  sendCaptcha,
  loginByCellphone,
  getUserAccount,
  getLoginStatus, // Add new function here
};

export async function logout(): Promise<void> {
  const response = await fetch(
    `${apiSettings.neteaseApiBase}/logout?timestamp=${Date.now()}${realIpParam}`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) {
    throw new Error(`Network response was not ok, status: ${response.status}`);
  }
  // No need to parse JSON for logout, just ensure it's successful
}
