const notesListEl = document.querySelector(".notes-list");
const saveBtnEl = document.querySelector(".save-note");
const createNewNoteBtnEl = document.querySelector(".create-new");
const titleInputEl = document.getElementById("title-input");
const contentInputEl = document.getElementById("content-input");

saveBtnEl.addEventListener("click", clickSaveButton);
createNewNoteBtnEl.addEventListener("click", newNote);

displayNotesList();
applyListeners();

function applyListeners() {
  const noteEntriesEls = document.querySelectorAll(".note-entry");
  noteEntriesEls.forEach((noteEntry) => {
    noteEntry.addEventListener("click", () =>
      selectNote(noteEntry.getAttribute("data-id")),
    );
  });
}

function displayNotesList() {
  const notes = getNotes();

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
function clickSaveButton() {
  const titleInput = document.getElementById("title-input");
  const contentInput = document.getElementById("content-input");

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if (!title || !content) {
    alert("Bitte Titel und Inhalt eingeben");
  }
  let currrentId = undefined;

  const currentlySelectedNoteEl = document.querySelector(".selected-note");

  if (currentlySelectedNoteEl) {
    currrentId = currentlySelectedNoteEl.getAttribute("data-id");
  }

  saveNote(title, content, Number(currrentId));

  titleInput.value = "";
  contentInput.value = "";

  displayNotesList();
  applyListeners();
}

function selectNote(id) {
  const selectedNoteEl = document.querySelector(`.note-entry[data-id="${id}"]`);

  if (selectedNoteEl.classList.contains("selected-note")) return;

  removeSelectedClassFromNote();

  selectedNoteEl.classList.add("selected-note");

  const notes = getNotes();

  const selectedNote = notes.find((note) => note.id === Number(id));

  if (!selectedNote) return;

  titleInputEl.value = selectedNote.title;
  contentInputEl.value = selectedNote.content;
}

function newNote() {
  titleInputEl.value = "";
  contentInputEl.value = "";

  removeSelectedClassFromNote();
}

function removeSelectedClassFromNote() {
  const noteEntriesEls = document.querySelectorAll(".note-entry");
  noteEntriesEls.forEach((noteEntry) => {
    noteEntry.classList.remove("selected-note");
  });
}
