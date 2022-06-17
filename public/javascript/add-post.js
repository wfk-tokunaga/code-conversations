// Event listener for when somebody clicks the add post button

async function addPostListener(event) {
    event.preventDefault();
    // const postTitle = document.querySelector('#post-title').value.trim();
    // const postText = document.querySelector('#post-text').value.trim();
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const text = document.querySelector('input[name="post-text"]').value.trim();

    console.log('\n==========\n' + title, text);
    // Make an api call 
    if (!title || !text) {
        // Tell the user they have to have it
        console.log('Must have a title and text');
        return;
    }
    const response = await fetch('/api/posts', {
        method: 'POST',
        // The reason I don't need the user_id is because the POST route gets it from the session in the request, not the body!
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

document.querySelector('.new-post-form').addEventListener('submit', addPostListener);


// async function newFormHandler(event) {
//     event.preventDefault();

//     const title = document.querySelector('input[name="post-title"]').value.trim();
//     const post_url = document.querySelector('input[name="post-url"]').value.trim();

//     console.log(title, post_url);
//     const response = await fetch(`/api/posts`, {
//         method: 'POST',
//         // The reason I don't need the user_id is because the POST route gets it from the session in the request, not the body!
//         body: JSON.stringify({
//             title,
//             post_url
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });

//     if (response.ok) {
//         document.location.replace('/dashboard');
//     } else {
//         alert(response.statusText);
//     }
// }

// document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);