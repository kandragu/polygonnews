package com.polygonnews;


import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.uimanager.PixelUtil;

import androidx.annotation.NonNull;

public class ContentModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    public ContentModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "ContentProvider";
    }


    @ReactMethod
    public void measureLayout(
            int tag,
            int ancestorTag,
            Callback errorCallback,
            Callback successCallback) {
        try {
           // measureLayout(tag, ancestorTag, mMeasureBuffer);
            float relativeX = PixelUtil.toDIPFromPixel(10);
            float relativeY = PixelUtil.toDIPFromPixel(10);
            float width = PixelUtil.toDIPFromPixel(20);
            float height = PixelUtil.toDIPFromPixel(30);
            successCallback.invoke(relativeX, relativeY, width, height);
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void query(String url,
                      Callback errorCallback,
                      Callback successCallback) {
            try {
                Uri uri = Uri.parse(url);
                //String [] col = {"_ID","title","published","updated","content"};
                Cursor cursor = reactContext.getContentResolver().query(uri, null, null, null, null);
                String title = null;
                if (cursor.moveToLast()) {
                    title = cursor.getString(cursor.getColumnIndex("title"));
                    String published = cursor.getString(cursor.getColumnIndex("published"));
                    String updated = cursor.getString(cursor.getColumnIndex("updated"));
                    String content = cursor.getString(cursor.getColumnIndex("content"));
                    successCallback.invoke(title,published,updated,content);
                }
                else
                    title = "Access denied";

                cursor.close();
            }
            catch (IllegalArgumentException ignored) {
                errorCallback.invoke(ignored.getMessage());
            }catch (Exception e ){
                errorCallback.invoke("query failed");
            }
        }


}
