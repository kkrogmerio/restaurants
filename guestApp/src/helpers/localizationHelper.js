import { CURRENT_APPLICATION } from "../theme"
import I18n from "../strings/I18n";

export const LocalizationHelper = {
    getThemeStringOrDefault: (stringKey, defaultValue = null) => {
        return I18n.t(`ThemeStrings.${CURRENT_APPLICATION}.${stringKey}`,
        {
            defaultValue: defaultValue || I18n.t(stringKey)
        })
    }
}
