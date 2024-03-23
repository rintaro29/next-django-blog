"use server";

interface TemporarrySignupProps {
  name: string;
  email: string;
  password: string;
  rePassword: string;
}

export const temporarrySignup = async ({ name, email, password, rePassword }: TemporarrySignupProps) => {
  try {
    const body = JSON.stringify({
      name,
      email,
      password,
      re_password: rePassword,
    });

    //アカウント仮登録
    const apiRes = await fetch(`${process.env.API_URL}/api/auth/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!apiRes.ok) {
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
};

interface CompleteSignupProps {
  uid: string;
  token: string;
}

export const completeSignup = async ({ uid, token }: CompleteSignupProps) => {
  try {
    const body = JSON.stringify({
      uid,
      token,
    });

    //アカウント本登録
    const apiRes = await fetch(`${process.env.API_URL}/api/auth/users/activation/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    //apiRes.okがfalseの場合、本登録失敗として処理
    if (!apiRes.ok) {
      return {
        success: false,
      };
    }
    //成功を返す
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    //エラーが発生した場合、本登録失敗として処理
    return {
      success: false,
    };
  }
};

interface ForgotPasswordProps {
  email: string;
}

export const forgotPassword = async ({ email }: ForgotPasswordProps) => {
  try {
    const body = JSON.stringify({
      email,
    });
    //パスワード再設定
    const apiRes = await fetch(`${process.env.API_URL}/api/auth/users/reset_password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!apiRes.ok) {
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
};

interface ResetPasswordProps {
  uid: string;
  token: string;
  newPassword: string;
  reNewPassword: string;
}

export const resetPassword = async ({ uid, token, newPassword, reNewPassword }: ResetPasswordProps) => {
  try {
    const body = JSON.stringify({
      uid,
      token,
      new_password: newPassword,
      re_new_password: reNewPassword,
    });

    //パスワード再設定
    const apiRes = await fetch(`${process.env.API_URL}/api/auth/users/reset_password_confirm/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!apiRes.ok) {
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
};

export interface UserDetailType {
  uid: string;
  name: string;
  email: string;
  avatar: string | undefined;
  introduction: string;
  created_at: string;
}

interface GetUserDetailProps {
  userId: string;
}

export const getUserDetail = async ({ userId }: GetUserDetailProps) => {
  try {
    //ユーザー詳細取得
    const apiRes = await fetch(`${process.env.API_URL}/api/users/${userId}/`, {
      method: "GET",
      cache: "no-store",
    });

    if (!apiRes.ok) {
      return {
        success: false,
        user: null,
      };
    }

    const user: UserDetailType = await apiRes.json();
    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      user: null,
    };
  }
};

interface UpdateUserProps {
  accessToken: string;
  name: string;
  introduction: string | undefined;
  avatar: string | undefined;
}

export const updateUser = async ({ accessToken, name, introduction, avatar }: UpdateUserProps) => {
  try {
    const body = JSON.stringify({
      name,
      introduction,
      avatar,
    });

    //ユーザー情報更新
    const apiRes = await fetch(`${process.env.API_URL}/api/auth/users/me/`, {
      method: "PATCH",
      headers: {
        Authorization: `JWT ${accessToken}`,
        "Content-Type": "application/json",
      },
      body,
    });
    //レスポンスが正常でない場合、失敗とnullを返す
    if (!apiRes.ok) {
      return {
        success: false,
        user: null,
      };
    }
    //レスポンスをjsonとして解析し、ユーザー情報を取得する
    const user: UserDetailType = await apiRes.json();

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      user: null,
    };
  }
};

interface UpdatePasswordProps {
  accessToken: string;
  currentPassword: string;
  newPassword: string;
  reNewPassword: string;
}

export const updatePassword = async ({
  accessToken,
  currentPassword,
  newPassword,
  reNewPassword,
}: UpdatePasswordProps) => {
  try {
    const body = JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword,
      re_new_password: reNewPassword,
    });

    //パスワード変更
    const apiRes = await fetch(`${process.env.API_URL}/api/auth/users/set_password/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${accessToken}`,
        "Content-Type": "application/json",
      },
      body,
    });

    if (!apiRes.ok) {
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
};
