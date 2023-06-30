const icons = ["🍕","🍟","🍔","🍳","🧇","🍞","🍠","🥩","🍙","🍜","🍣"];

// INPUTS
const iconDisplay = [];
const indexAddInput = document.getElementById('index-add');
const indexDeleteInput = document.getElementById('index-delete');
const contentDisplay = document.getElementById("icon-displayer");

// BUTTONS 
const pushBtn = document.getElementById('push');
const unshiftBtn = document.getElementById('unshift');
const insertAtBtn = document.getElementById('insert-at');

const popAtBtn = document.getElementById('pop');
const shiftAtBtn = document.getElementById('shift');
const deleteAtBtn = document.getElementById('remove-at');

function generateIcon() {
    console.log(`Before adding: ${iconDisplay}`);
    let index = Math.floor(Math.random() * icons.length);
    return icons[index];
}

function checkIndex(index, eventType) {
    let contentToDisplay = `Icons: [ ${iconDisplay} ]`;
    if (index < 0) return `Index has to be at least 0 or more [ ${iconDisplay} ]`;
    if (eventType == 'add') {
        iconDisplay.splice(index, 0, generateIcon());
        console.log(`splice element ${iconDisplay}`);
    }
    if (eventType == 'delete') {
      if (iconDisplay.length > 0) {
        iconDisplay.splice(index, 1)  
        return contentToDisplay;
      }
      return contentToDisplay = `No content to remove`;
    }
    console.log("Hola" + contentToDisplay);
    return contentToDisplay;
}

// ADD SECTION
pushBtn.addEventListener('click', (event) => {
    iconDisplay.push(generateIcon());
    contentDisplay.innerHTML = `After adding: [ ${iconDisplay} ]`;
});

unshiftBtn.addEventListener('click', (event) => {
    iconDisplay.unshift(generateIcon());
    contentDisplay.innerHTML = `After adding: [ ${iconDisplay} ]`;
});

insertAtBtn.addEventListener('click', (event) => {
    let index = indexAddInput.value;
    contentDisplay.innerHTML = checkIndex(index, 'add');
});

// REMOVE SECTION
popAtBtn.addEventListener('click', (event) => {
    iconDisplay.pop();
    contentDisplay.innerHTML = `After removing: [ ${iconDisplay} ]`;
});

shiftAtBtn.addEventListener('click', (event) => {
    iconDisplay.shift();
    contentDisplay.innerHTML = `AFter removing: [ ${iconDisplay} ]`;
});

deleteAtBtn.addEventListener('click', (event) => {
    let index = indexDeleteInput.value;
    contentDisplay.innerHTML = checkIndex(index, 'delete');
});


