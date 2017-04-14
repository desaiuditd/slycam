/**
 * Created by udit on 3/9/17.
 */

// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'in.incognitech.slycam',
  name: 'SlyCam',
  description: 'Watch out who\'s at the door',
  author: 'Udit Desai',
  email: 'desaiuditd@gmail.com',
  website: 'https://slycam.incognitech.in',
});

// Set up resources such as icons and launch screens.
App.icons({
  // iphone_2x: '', // (120x120)
  // iphone_3x: '', // (180x180)
  // ipad: '', // (76x76)
  // ipad_2x: '', // (152x152)
  // ipad_pro: '', // (167x167)
  // ios_settings: '', // (29x29)
  // ios_settings_2x: '', // (58x58)
  // ios_settings_3x: '', // (87x87)
  // ios_spotlight: '', // (40x40)
  // ios_spotlight_2x: '', // (80x80)
  android_hdpi: 'public/img/ic_launcher/res/mipmap-hdpi/ic_launcher.png', // (48x48)
  android_mdpi: 'public/img/ic_launcher/res/mipmap-mdpi/ic_launcher.png', // (72x72)
  android_xhdpi: 'public/img/ic_launcher/res/mipmap-xhdpi/ic_launcher.png', // (96x96)
  android_xxhdpi: 'public/img/ic_launcher/res/mipmap-xxhdpi/ic_launcher.png', // (144x144)
  android_xxxhdpi: 'public/img/ic_launcher/res/mipmap-xxxhdpi/ic_launcher.png', // (192x192)
});

App.launchScreens({
  // iphone_2x: '', // (640x960)
  // iphone5: '', // (640x1136)
  // iphone6: '', // (750x1334)
  // iphone6p_portrait: '', // (1242x2208)
  // iphone6p_landscape: '', // (2208x1242)
  // ipad_portrait: '', // (768x1024)
  // ipad_portrait_2x: '', // (1536x2048)
  // ipad_landscape: '', // (1024x768)
  // ipad_landscape_2x: '', // (2048x1536)
  android_mdpi_portrait: 'public/img/ic_splash/res/drawable-mdpi/screen.png', // (320x470)
  android_mdpi_landscape: 'public/img/ic_splash/res/drawable-land-mdpi/screen.png', // (470x320)
  android_hdpi_portrait: 'public/img/ic_splash/res/drawable-hdpi/screen.png', // (480x640)
  android_hdpi_landscape: 'public/img/ic_splash/res/drawable-land-hdpi/screen.png', // (640x480)
  android_xhdpi_portrait: 'public/img/ic_splash/res/drawable-xhdpi/screen.png', // (720x960)
  android_xhdpi_landscape: 'public/img/ic_splash/res/drawable-land-xhdpi/screen.png', // (960x720)
  android_xxhdpi_portrait: 'public/img/ic_splash/res/drawable-xxhdpi/screen.png', // (1080x1440)
  android_xxhdpi_landscape: 'public/img/ic_splash/res/drawable-land-xxhdpi/screen.png', // (1440x1080)
});

App.configurePlugin('phonegap-plugin-push', {
  SENDER_ID: 582430128541
});

App.accessRule('https://fonts.googleapis.com/*', { type: 'network' });
App.accessRule('https://www.fonts.googleapis.com/*', { type: 'network' });
App.accessRule('http://fonts.googleapis.com/*', { type: 'network' });
App.accessRule('http://www.fonts.googleapis.com/*', { type: 'network' });
