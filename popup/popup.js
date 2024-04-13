
//theme.getCurrent()
//--toolbar-text-color:
//document.documentElement.style.setProperty('--your-variable', '#YOURCOLOR');
// get this toolbar_field_text
//fucntion defined to set a theme object color to a root color
//const myElement = document.getElementById("addressBarIconColor");
// const popUpBodyElement = document.getElementById("popup-body")

function setThemeColors(theme) {
  // WORKS --toolbar-icons-color 
  if (theme.colors && theme.colors.icons) {
    document.documentElement.style.setProperty("--toolbar-icons-color", theme.colors.icons);
  } else {
    document.documentElement.style.setProperty("--toolbar-icons-color", "black")
  }
  // WORKS --toolbar-bg-color =  The background color for the navigation bar, the bookmarks bar, and the selected tab.This also sets the background color of the "Find" bar.
  if (theme.colors && theme.colors.toolbar) {
    document.documentElement.style.setProperty("--toolbar-bg-color", theme.colors.toolbar);
  } else {
    document.documentElement.style.setProperty("--toolbar-bg-color", "white")
  }
  // W --toolbar-field-color
  if (theme.colors && theme.colors.toolbar_field) {
    document.documentElement.style.setProperty("--toolbar-field-color", theme.colors.toolbar_field);
  } else {
    document.documentElement.style.setProperty("--toolbar-field-color", "grey")
  }
  // W --toolbar-field-border-color = also in find in page field
  if (theme.colors && theme.colors.toolbar_field_border) {
    document.documentElement.style.setProperty("--toolbar-field-border-color", theme.colors.toolbar_field_border);
  } else {
    document.documentElement.style.setProperty("--toolbar-field-border-color", "black")
  }
  //"--addressbar-text-color" = the icon/url color inside the address bar, (non-focused), 
  if (theme.colors && theme.colors.toolbar_field_text) {
    document.documentElement.style.setProperty("--addressbar-text-color", theme.colors.toolbar_field_text);
  } else {
    document.documentElement.style.setProperty("--addressbar-text-color", "white")
  }

  //W--button-bg-color" = The color of the background of the pressed toolbar buttons.
  if (theme.colors && theme.colors.button_background_active) {
    document.documentElement.style.setProperty("--button-bg-color", theme.colors.button_background_active);
  } else {
    document.documentElement.style.setProperty("--button-bg-color", "black")
  }
 //  --button-bg-hover-color
 if (theme.colors && theme.colors.button_background_hover) {
  document.documentElement.style.setProperty("--button-bg-hover-color", theme.colors.button_background_hover);
} else {
  document.documentElement.style.setProperty("--button-bg-hover-color", "grey")
}
 //  --bkmrk-text-color
 if (theme.colors && theme.colors.bookmark_text) {
  document.documentElement.style.setProperty("--bkmrk-text-color", theme.colors.bookmark_text);
} else {
  document.documentElement.style.setProperty("--bkmrk-text-color", "white")
}




}
  









// Fetch the current theme and set the element style
async function setInitialStyle() {
  try {
    const theme = await browser.theme.getCurrent();
    setThemeColors(theme);
  } catch (error) {
    console.error("Error fetching theme:", error);
  }
}

setInitialStyle();
