// Event listener for when somebody submits the edit post form
async function addCommentHandler(event) {
    event.preventDefault();
    const text = document.querySelector('#new-comment').value.trim();

    console.log('\n==========\n' + text);
    if (!text) {
        // Tell the user they have to have it
        console.log('Must have a title and text');
        return;
    }

    // Get post id
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Make an comment api call 
    const response = await fetch(`/api/comments/`, {
        method: 'POST',
        // user_id coming from session
        // IF ITS BEING WEIRD, IT MIGHT BE BECAUSE OF HOW I'M PASSING THE JSON OVER
        body: JSON.stringify({
            text,
            post_id,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/post/post_id');
    } else {
        console.log('Something went wrong');
        alert(response.statusText);
    }
}

document.querySelector('#comment-input-form').addEventListener('submit', addCommentHandler);