const Text = {
  LoaderText: 'Loading...',
};

const LoaderId = 'main-loader';

export function renderLoader({
  isVisible = false,
  loaderContent = null,
  appendInElement = null,
}) {
  if (!isVisible) {
    const existedLoader = document.getElementById(LoaderId);
    if (existedLoader) {
      existedLoader.remove();
    }

    return null;
  }

  const loaderOverlay = document.createElement('div');
  loaderOverlay.id = LoaderId;
  loaderOverlay.className = 'loader-overlay';
  const loaderContainer = document.createElement('div');
  loaderContainer.className = 'loader-container';

  if (loaderContent) {
    loaderContainer.append(loaderContent);
  } else {
    const loaderTextContainer = document.createElement('div');
    loaderTextContainer.className = 'loader-item';
    loaderTextContainer.textContent = Text.LoaderText;
    loaderContainer.append(loaderTextContainer);
  }

  loaderOverlay.append(loaderContainer);

  if (appendInElement) {
    appendInElement.append(loaderOverlay);
  }

  return null;
}
