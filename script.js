const notesListEl = document.querySelector(".notes-list");

function displayNotesList() {
  const notes = MOCK_NOTES;

  const sortedNotes = [...notes].sort(
    (noteA, noteB) => noteB.lastUpdated - noteA.lastUpdated,
  );
  let html = "";

  sortedNotes.forEach((note) => {
    html += `
            <div class="note-entry" data-id="${note.id}">
              <div class="note-title">${note.title}</div>
              <div class="note-content-teaser">${note.content}</div>
              <div class="note-date">${new Date(note.lastUpdated).toLocaleString("de-DE")}</div>
            </div>
            `;
  });

  notesListEl.innerHTML = html;
}

function saveNote() {
  createNote();
}

function createNote() {
  const newNote = {
    id: "",
    title: "",
    content: "",
    lastUpdated: new Date(),
  };
  const titleInput = document.getElementById("title-input");

  const contentInput = document.getElementById("content-input");
  if (titleInput.value.trim() !== "" && contentInput.value.trim() !== "") {
    newNote.title = titleInput.value;
    newNote.content = contentInput.value;
    MOCK_NOTES.push(newNote);
    displayNotesList();
  } else {
    alert("Bitte Titel und Inhalt eingeben");
  }
}
