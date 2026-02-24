const LOCAL_STORAGE_KEY = "noteapp-notice";

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

function saveNote(newTitle, newContent) {
  const notes = getNotes();
  notes.push({
    id: genNextId(),
    title: newTitle,
    content: newContent,
    lastUpdated: new Date().getTime(),
  });

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  console.log(notes);
}

function genNextId() {
  const notes = getNotes();

  const sortedNotes = [...notes].sort((noteA, noteB) => noteA.id - noteB.id);

  let nextId = 1;

  for (let note of sortedNotes) {
    if (nextId < note.id) break;

    nextId = note.id + 1;
  }

  return nextId;
}
