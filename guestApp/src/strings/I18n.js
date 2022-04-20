import I18n from "i18n-js";
import React, { NativeModules } from "react-native";
//import * as RNLocalize from "react-native-localize";

import da from "./locale_da";
import en from "./locale_en";
import ro from "./locale_ro";
import fr from "./locale_fr";
import de from "./locale_de";
import nb from "./locale_nb";
import sv from "./locale_sv";


const deviceLanguage =
  React.Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;

  I18n.locale = deviceLanguage!=null ? deviceLanguage.substring(0, 2) : "da";

  I18n.fallbacks = true;
  I18n.translations = {
    da,
    ro,
    en,
    fr,
    de, 
    sv,
    nb
  };

export default I18n;
