export function modalOpen(id: string) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "block";
  } else {
    throw new Error(`Modal window ${id} not found in DOM`);
  }
}

export function modalClose(id: string) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "none";
  } else {
    throw new Error(`Modal window ${id} not found in DOM`);
  }
}

export function compareObjects(a: Record<string, any>, b: Record<string, any>) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (let i = 0; i < aKeys.length; i++) {
    const key = aKeys[i];
    if (!(key in b) || a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
