package com.w30s;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      // 这里定义了在加载js的时候，同时弹起启动屏
      // 第二个参数true，是启动页全屏显示，隐藏了状态栏。
      SplashScreen.show(this, true);
      super.onCreate(savedInstanceState);
  }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "w30s";
  }
}
