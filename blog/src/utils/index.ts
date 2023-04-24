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
