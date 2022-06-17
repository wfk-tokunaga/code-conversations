// Event listener for when somebody submits the edit post form
async function editFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector('#new-title').value.trim();
    const text = document.querySelector('#new-text').value.trim();

    console.log('\n==========\n' + title, text);
    if (!title || !text) {
        // Tell the user they have to have it
        console.log('Must have a title and text');
        return;
    }

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Make an api call 
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        console.log('Something went wrong');
        alert(response.statusText);
    }
}

document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);