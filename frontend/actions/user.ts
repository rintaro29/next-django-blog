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
