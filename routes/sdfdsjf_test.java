package io.kyungjoon.face001;

import android.app.Application;

import com.facebook.react.ReactApplication;
import fr.snapp.imagebase64.RNImgToBase64Package;
import cl.json.RNSharePackage;
import com.cn.weiyisheng.snapshot.SnapShotViewPackage;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.vydia.RNUploader.UploaderReactPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativecomponent.splashscreen.RCTSplashScreenPackage;

import java.util.Arrays;
import java.util.List;

////////////// facebookads sdk ////////////////////
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import io.callstack.react.fbads.FBAdsPackage;

public class MainApplication extends Application implements ReactApplication {


    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new RNImgToBase64Package(),
                    new RNSharePackage(),
                    new SnapShotViewPackage(),
                    new ImagePickerPackage(),
                    new RNAdMobPackage(),
                    new UploaderReactPackage(),
                    new PickerPackage(),
                    new VectorIconsPackage(),
                    new RCTSplashScreenPackage(),
                    new FBAdsPackage(),
                    new FBSDKPackage(mCallbackManager)
            );
        }


        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
