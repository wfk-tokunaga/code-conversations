// Event listener for when somebody clicks the delete post button
async function deletePostListener(event) {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Make an api call 
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE',
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

document.querySelector('.delete-post-btn').addEventListener('click', deletePostListener);