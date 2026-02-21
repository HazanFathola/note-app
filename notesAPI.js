const LOCAL_STORAGE_KEY = "noteapp-notice";

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

function saveNote(newTitle, newContent) {
  const notes = getNotes();
  notes.push({
    id: "",
    title: newTitle,
    content: newContent,
    lastUpdated: new Date().getTime(),
  });

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}
