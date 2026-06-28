export const basePath = "/comfy-madeleine-4193f7";

export function withBasePath(path: string) {
  if (/^(https?:|mailto:|tel:)/.test(path)) return path;

  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === basePath || normalized.startsWith(`${basePath}/`)) {
    return normalized;
  }

  return `${basePath}${normalized}`;
}

export function navigateTo(path: string) {
  window.location.href = withBasePath(path);
}

export function openPath(path: string, target = "_blank") {
  window.open(withBasePath(path), target);
}
