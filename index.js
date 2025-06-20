// fetching data from plaveholder api
const postContainer=document.getElementById('posts-container')
const prevBtn=document.getElementById("prevBtn")
const nextBtn=document.getElementById("nextBtn")
const pageInfo=document.getElementById("pageInfo");


let posts=[];
let currentPage=1;
let postsPerPage=5;


async function fetchPosts(){
    try{
        const response=await fetch("https://jsonplaceholder.typicode.com/posts");
        posts=await response.json();

        renderPosts();
        // postContainer.innerHTML='';

        // posts.slice(0,10).forEach(post=>{
        //     const postE1=document.createElement('div');
        //     postE1.className='post';
        //     postE1.innerHTML=`
        //     <h2>${post.title}</h2>
        //     <p>${post.body}</p>
        //     `
        //     postContainer.appendChild(postE1)
        // })

    }
    catch(error){
        postContainer.innerHTML='<p>Error fetching posts</p>';
        console.error(error)

    }
}

function renderPosts(){
    postContainer.innerHTML='';

    const start=(currentPage-1)*postsPerPage;
    const end=start+postsPerPage;
    const currentPosts=posts.slice(start,end)


    currentPosts.forEach(post=>{
        const postE1=document.createElement('div')
        postE1.className='post';
        postE1.innerHTML=`
        <h2>${post.title}</h2>

        <p>${post.body}</p>
        `


        postContainer.appendChild(postE1)
    });

    pageInfo.textContent=`Page ${currentPage}`;
    prevBtn.ariaDisabled=currentPage===1;
    nextBtn.ariaDisabled=end>=posts.length;

}

prevBtn.addEventListener('click',()=>{
    if(currentPage>1){
        currentPage--;
        renderPosts();
    }
});


nextBtn.addEventListener('click',()=>{
    if(currentPage*postsPerPage<posts.length){
        currentPage++;
        renderPosts()
    }
})

fetchPosts()