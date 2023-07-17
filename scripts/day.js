let noteCount = 1;
let activeNote = null;

function setDateHeading(month, day, weekday) {
    const today = new Date();
    const headingItems = Array.from(document.querySelectorAll('.prevPage'));

    headingItems[0].textContent = today.getFullYear();
    headingItems[1].textContent = weekday;
    document.querySelector('.title').textContent = `${month} ${day}`;
    document.title = `Calendar Notes - ${month} ${day}`;
}

function openNote(note) {
    note.classList.add('active');
    activeNote = note;

    const title = note.children.item(0);
    const trashBin = note.children.item(1);
    const text = note.children.item(2);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    note.insertBefore(closeBtn, trashBin);
    title.contentEditable = text.contentEditable = true;
    closeBtn.addEventListener('click', () => closeNote(note));
}

function closeNote(note) {
    const title = note.children.item(0);
    const closeBtn = note.children.item(1);
    const text = note.children.item(3);

    note.removeChild(closeBtn);
    note.classList.remove('active');
    title.contentEditable = text.contentEditable = false;
    activeNote = null;
}

function addNote() {
    const notesContainer = document.querySelector('.notes');
    const newNote = document.createElement('div');
    newNote.classList.add('note');

    const title = document.createElement('h3');
    title.textContent = 'Title';
    const trashBin = document.createElement('img');
    trashBin.src = '../icons/trash.png';
    trashBin.alt = 'delete note';
    const text = document.createElement('p');
    text.textContent = 'Enter notes...';

    newNote.appendChild(title);
    newNote.appendChild(trashBin);
    newNote.appendChild(text);
    notesContainer.appendChild(newNote);
    openNote(newNote);
}

const month = localStorage.getItem('month');
const day = localStorage.getItem('day');
const weekday = localStorage.getItem('weekday');
const year = localStorage.getItem('year');

setDateHeading(month, day, weekday);

document.querySelector('.addNote')
        .addEventListener('click', () => {
            if(activeNote)
                alert('Please close the current note before adding a new one.');
            else
                addNote();
        });

const notesContainer = document.querySelector('.notes')
notesContainer.addEventListener('click', e => {
            // Empty space around notes could be selected
            if(e.target === notesContainer)
                return;
            // Don't open any notes if a 'Close' button is selected
            if(e.target.textContent === 'Close')
                return;
            // Don't open note if it is already active
            if(e.target === activeNote || e.target.parentNode === activeNote)
                return;
            // Close any other active notes before opening selected note
            if(activeNote)
                closeNote(activeNote);

            // A child element of the 'note' tile could be selected
            if(e.target.classList[0] !== 'note') 
                openNote(e.target.parentNode);
            else
                openNote(e.target);
        });
