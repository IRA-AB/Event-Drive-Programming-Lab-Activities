var posts = [];


// Get posts from the API
function getPosts() {

    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(function(response) {

            return response.json();

        })
        .then(function(data) {

            posts = data;

            showPosts();

        });

}
// Show the posts in the table
function showPosts() {

    var table = document.getElementById("table-content");

    table.innerHTML = "";

    for (var i = 0; i < posts.length; i++) {

        var post = posts[i];

        var row = `
            <tr>
                <td>${post.title}</td>
                <td>${post.userId}</td>
                <td>${post.body}</td>

                <td>
                    <button onclick="deletePost(${i})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

        table.innerHTML = table.innerHTML + row;
    }

}
// Add a new post
function addPost() {

    var newPost = {
        title: "Post",
        body: "Teststs",
        userId: 1
    };


    fetch("https://jsonplaceholder.typicode.com/posts", {

        method: "POST",

        body: JSON.stringify(newPost),

        headers: {
            "Content-type": "application/json"
        }

    })
    .then(function(response) {

        return response.json();

    })
    .then(function(data) {

        posts.unshift(data);

        showPosts();


    });
}
// Delete a post
function deletePost(index) {

    posts.splice(index, 1);

    showPosts();

}