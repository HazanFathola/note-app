const notesListEl = document.querySelector(".notes-list");
const saveBtnEl = document.querySelector(".save-note");
const createNewNoteBtnEl = document.querySelector(".create-new");
const titleInputEl = document.getElementById("title-input");
const contentInputEl = document.getElementById("content-input");
const deleteNoteBtnEl = document.querySelector(".delete-note");

saveBtnEl.addEventListener("click", clickSaveButton);
createNewNoteBtnEl.addEventListener("click", newNote);
deleteNoteBtnEl.addEventListener("click", deleteNoteBtn);

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
              <div class="note-title">${escapeHTML(note.title)}</div>
              <div class="note-content-teaser">${escapeHTML(note.content)}</div>
              <div class="note-date">${new Date(note.lastUpdated).toLocaleString("de-DE")}</div>
            </div>
            `;
  });
  console.log(typeof html);
  notesListEl.innerHTML = html;
}
function escapeHTML(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
function getCurrentId() {
  const selectedNoteEl = document.querySelector(".selected-note");
  if (!selectedNoteEl) return null;

  return Number(selectedNoteEl.getAttribute("data-id"));
}
function clickSaveButton() {
  const title = titleInputEl.value.trim();
  const content = contentInputEl.value.trim();
  if (!title || !content) {
    alert("Bitte Titel und Inhalt eingeben");
    return;
  }
  console.log(typeof titleInputEl.value);
  const currentId = getCurrentId();

  saveNote(title, content, currentId);

  titleInputEl.value = "";
  contentInputEl.value = "";

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

function deleteNoteBtn() {
  const currentId = getCurrentId();
  deleteNote(currentId);
  titleInputEl.value = "";
  contentInputEl.value = "";
  displayNotesList();
  applyListeners();
}
